# SimpleVoiceChatWeb.github.io

Source of the project landing page.

- Live: <https://SimpleVCWeb.github.io/> (short domain) and
  <https://SimpleVoiceChatWeb.github.io/>
- Web client: <https://SimpleVCWeb.github.io/app/> — source:
  [SimpleVoiceChatWeb/app](https://github.com/SimpleVoiceChatWeb/app),
  built and published by the `webend` deploy workflow
- Documentation: <https://SimpleVCWeb.github.io/docs/>

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page, Open Graph tags, legacy redirect for `?code=…` and `#/…` |
| `styles.css` | Styling, tokens copied from the web client |
| `favicon.svg` | Icon |
| `.nojekyll` | Disables Jekyll processing |

## Legacy redirect

Old links pointed at the app root:

```text
/?code=12345678   -> /app/?code=12345678
/#/login          -> /app/#/login
/#/voice          -> /app/#/call
```

`index.html` forwards those with `location.replace` before the page renders.
The hash rewrite for `/voice` → `/call` happens in the app router.

## What not to do here

This repository is **not** a deploy target. Do not commit built app files —
the app lives in `SimpleVoiceChatWeb/app` and the docs in
`SimpleVoiceChatWeb/docs`. Only the landing is maintained by hand.
