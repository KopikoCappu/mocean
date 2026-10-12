# Mocean

Free frame-by-frame animation in your browser. Draw with onion skinning, make your lines boil, and trace over GIFs or video. Works with Apple Pencil, saves on your device, and runs offline.

**Try it:** https://mocean-frames.pages.dev

## Features
- **Onion skinning:** up to three frames before and after, tinted so you can tell them apart.
- **Rotoscoping:** put an image, GIF, or video behind your frames. Each frame shows the video at its point on the timeline.
- **Line boil:** copy a layer to the next frame and retrace it. Set an intro that plays once and a loop that repeats.
- **Pencil friendly:** pressure, palm rejection, smoothing, pinch to zoom, two-finger tap to undo.
- **Layers and selection:** lasso, move, scale, flip, snap to center.
- **Exports:** a self-contained web player (.html), PNG sequence (.zip), sprite sheet, or video. Projects save as .json.
- **Private by design:** everything is stored in the browser (IndexedDB). Nothing is uploaded.
- **Offline and installable:** a service worker and web manifest make it work like an app.

## Run it locally
It's plain HTML, CSS, and JavaScript. There's no build step and there are no dependencies.

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. The service worker only registers on `localhost` or HTTPS.

## Deploy
Upload the folder to any static host.
- `_headers` sets the service worker and manifest headers on Cloudflare Pages and Netlify.
- On other hosts, serve `sw.js` with `Cache-Control: no-cache` and the manifest as `application/manifest+json`.
- Bump `VERSION` in `sw.js` whenever you deploy changes, so installed copies update.
- `config.js` holds optional analytics and error-reporting keys. Leave them empty to load nothing.

## Files
- `app/index.html`: the whole editor (HTML, CSS, and JS in one file)
- `sw.js`: offline support and updates
- `manifest.webmanifest`, `icons/`: install to the home screen
- `index.html`: sends visitors to the editor

## Browser support
Current Chrome, Edge, Firefox, and Safari on desktop, and Safari on iPadOS 15.4 or newer.

## Contributing
Bug reports and ideas are welcome: please open an issue. For anything bigger than a small fix, open an issue first so we can agree on the approach before you write code. By sending a pull request you agree to license your contribution under the same license as the project.

## License
Copyright (C) 2026 Minh Tran

Mocean is free software under the [GNU Affero General Public License v3.0 or later](LICENSE). You can use, study, change, and share it. If you run a modified version that other people use, for example on a website, you must make your complete source code available to them under the same license.

The name "Mocean" and the wave logo aren't covered by the license. If you publish a modified version, please use a different name and logo.
