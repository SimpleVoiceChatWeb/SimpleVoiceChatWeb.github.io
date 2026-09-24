# SimpleVoiceChatWeb Website

This repository contains the published static website for
[simplevoicechatweb.github.io](https://simplevoicechatweb.github.io/).

The application source is maintained in the private `webend` repository. On
each push to its `main` branch, GitHub Actions builds the app and publishes the
contents of `dist/` to the root of this repository's `main` branch using a
repository-specific SSH deploy key.

The generated website files are deployment output. Make application changes in
`webend`; do not edit generated assets here. The deployment preserves this
README, the optional `CNAME` file, and the `/docs` directory.
