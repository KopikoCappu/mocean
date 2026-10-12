/* Mocean service worker: makes the app installable and usable offline.
   Bump VERSION whenever you deploy changes so everyone gets the update. */
const VERSION = 'mocean-v18';
// The editor needs these to work offline. OPTIONAL pages are cached too when they exist,
// so a copy of Mocean without the landing or privacy page still installs.
const SHELL = ['/app/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png'];
const OPTIONAL = ['/', '/privacy/', '/config.js'];

// A new version installs in the background and then waits. The page shows a
// "New version available" toast, and only activates it when the person taps Reload.
self.addEventListener('install', e => {
  const req = u => new Request(u, { cache: 'reload' });
  e.waitUntil(caches.open(VERSION).then(c => Promise.all([
    c.addAll(SHELL.map(req)),
    ...OPTIONAL.map(u => c.add(req(u)).catch(() => {}))
  ])));
});

self.addEventListener('message', e => {
  if (e.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  if (url.pathname.startsWith('/_vercel/') || url.pathname.startsWith('/cdn-cgi/')) return;
  // Leave video and other range requests to the browser. Safari needs real 206 responses
  // to play video, and partial responses can't be cached anyway.
  if (req.headers.has('range') || /\.(mp4|webm|mov|m4v)$/i.test(url.pathname)) return;

  // Pages: try the network first so updates show up, fall back to the cached copy offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('/app/')))
    );
    return;
  }
  // Everything else: serve from cache right away, refresh it in the background.
  e.respondWith(
    caches.match(req).then(cached => {
      const fresh = fetch(req).then(res => {
        if (res && (res.status === 200 || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});
