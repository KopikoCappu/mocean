/* Mocean site config. Loaded by index.html and app/index.html.
   Leave a value empty to load nothing for that service. Bump VERSION in sw.js after editing. */

// Cloudflare Web Analytics token (Cloudflare dashboard: Analytics & Logs, Web Analytics, your site, the "token" in the JS snippet).
const CF_ANALYTICS_TOKEN = '';

// Sentry loader key (sentry.io: your project, Settings, Client Keys, Loader Script; the part before .min.js).
// If you fill this in, mention crash reporting in your privacy policy.
const SENTRY_LOADER_KEY = '';

// Umami website ID (cloud.umami.is: Settings, Websites, your site, the Website ID). Counts visits,
// time spent, and a few editor events (first stroke, new frame, export) with no cookies.
const UMAMI_WEBSITE_ID = '';

// Links shown in the editor. Leave either empty to hide that button.
window.MOCEAN_CONFIG = {
  feedbackUrl: '', // e.g. a form for feedback; shows the Feedback button
  supportUrl: ''   // e.g. a donation page; shows the Support button and a line in the Export dialog
};

// The editor calls moceanTrack('event', { ...details }). Calls made before the script loads wait
// in a queue. With no Umami ID, or on localhost, they're dropped.
(() => {
  const queue = [];
  let ready = false;
  window.moceanTrack = (name, data) => {
    try {
      if (!UMAMI_WEBSITE_ID) return;
      if (ready && window.umami) window.umami.track(name, data);
      else if (queue.length < 50) queue.push([name, data]);
    } catch (e) {}
  };
  window.moceanTrackReady = () => {
    ready = true;
    try { while (queue.length) { const [n, d] = queue.shift(); window.umami.track(n, d); } } catch (e) {}
  };
})();

(() => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  const add = (src, attrs, onload) => {
    try {
      const s = document.createElement('script');
      s.src = src; s.defer = true; s.crossOrigin = 'anonymous';
      Object.assign(s.dataset, attrs || {});
      if (onload) s.onload = onload;
      s.onerror = () => {}; // a blocked or offline script must never matter
      document.head.appendChild(s);
    } catch (e) {}
  };
  if (CF_ANALYTICS_TOKEN) add('https://static.cloudflareinsights.com/beacon.min.js', { cfBeacon: JSON.stringify({ token: CF_ANALYTICS_TOKEN }) });
  if (UMAMI_WEBSITE_ID) add('https://cloud.umami.is/script.js', { websiteId: UMAMI_WEBSITE_ID }, window.moceanTrackReady);
  if (SENTRY_LOADER_KEY) add(`https://js.sentry-cdn.com/${SENTRY_LOADER_KEY}.min.js`);
})();
