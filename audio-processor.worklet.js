// RNNoise AudioWorklet Processor
class RnnoiseProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.rnnoiseModule = null;
    this.rnnoisePtr = null;
    this.buffer = new Float32Array(480); // 10ms @ 48kHz
    this.bufferIndex = 0;
    this.inputHeapPtr = 0;
    this.outputHeapPtr = 0;
    // 0 = raw microphone, 1 = fully denoised, matching the mod's strength.
    this.strength = 1.0;
    this.enabled = true;
    
    this.port.onmessage = (event) => {
      if (event.data.type === 'settings') {
        if (typeof event.data.strength === 'number') {
          this.strength = Math.max(0, Math.min(1, event.data.strength));
        }
        if (typeof event.data.enabled === 'boolean') {
          this.enabled = event.data.enabled;
        }
      }
      if (event.data.type === 'rnnoise-module') {
        this.rnnoiseModule = event.data.module;
        // Allocate heap buffers for input/output
        if (this.rnnoiseModule) {
          this.inputHeapPtr = this.rnnoiseModule._malloc(480 * 4);
          this.outputHeapPtr = this.rnnoiseModule._malloc(480 * 4);
          this.rnnoisePtr = this.rnnoiseModule._rnnoise_create();
        }
      }
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];

    if (!input || !input[0] || !this.enabled || !this.rnnoiseModule || this.rnnoisePtr === null) {
      // Pass through if no processor
      if (input && input[0] && output[0]) {
        output[0].set(input[0]);
      }
      return true;
    }

    const inputChannel = input[0];
    const outputChannel = output[0];

    for (let i = 0; i < inputChannel.length; i++) {
      this.buffer[this.bufferIndex++] = inputChannel[i];

      if (this.bufferIndex === 480) {
        // Copy to WASM heap
        this.rnnoiseModule.HEAPF32.set(this.buffer, this.inputHeapPtr / 4);
        
        // Process with RNNoise
        this.rnnoiseModule._rnnoise_process_frame(this.rnnoisePtr, this.inputHeapPtr, this.outputHeapPtr);
        
        // Copy result back and blend with the dry signal by the strength, so
        // a low setting keeps some of the room and avoids the metallic voice.
        const processed = new Float32Array(this.rnnoiseModule.HEAPF32.buffer, this.outputHeapPtr, 480);
        const mix = this.strength;
        const start = i - 479;
        for (let n = 0; n < 480; n++) {
          const dry = this.buffer[start + n] ?? 0;
          outputChannel[start + n] = dry + (processed[n] - dry) * mix;
        }
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor('rnnoise-processor', RnnoiseProcessor);
