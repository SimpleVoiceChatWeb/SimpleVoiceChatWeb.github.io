# SimpleVoiceChatWeb.github.io

Deploy target for the project landing page.

- **Live:** <https://SimpleVCWeb.github.io/> and
  <https://SimpleVoiceChatWeb.github.io/>
- **Source:** [`SimpleVoiceChatWeb/webend`](https://github.com/SimpleVoiceChatWeb/webend),
  folder `landing/`
- **Web client:** <https://SimpleVCWeb.github.io/app/> — source in
  [`SimpleVoiceChatWeb/app`](https://github.com/SimpleVoiceChatWeb/app)
- **Documentation:** <https://SimpleVCWeb.github.io/docs/>

## Do not edit by hand

Every file here is copied from `webend/landing/` by the
`Deploy Landing to GitHub Pages` workflow (`rsync --delete`). Changes made
here are overwritten on the next deploy. `README.md` is excluded from the
sync and is the only maintained file.

## Contents

| File | Purpose |
|---|---|
| `index.html` | Landing page, Open Graph tags, legacy redirect |
| `styles.css` | Styling, tokens taken from the web client |
| `favicon.svg` | Icon |
| `.nojekyll` | Disables Jekyll processing |

## Legacy redirect

Old links pointed at the app root. `index.html` forwards them before the page
renders, keeping query and hash:

```text
/?code=12345678   -> /app/?code=12345678
/#/login          -> /app/#/login
/#/voice          -> /app/#/call
```

The hash rewrite for `/voice` → `/call` happens in the app router.

## GitHub Pages

- Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
- Auth: deploy key with write access, private half stored as
  `PAGES_DEPLOY_KEY` in the `webend` repository
