/* Mocean site config. Loaded by index.html and app/index.html.
   Leave a value empty to load nothing for that service. Bump VERSION in sw.js after editing. */

// Cloudflare Web Analytics token (Cloudflare dashboard: Analytics & Logs, Web Analytics, your site, the "token" in the JS snippet).
const CF_ANALYTICS_TOKEN = '';

// Sentry loader key (sentry.io: your project, Settings, Client Keys, Loader Script; the part before .min.js).
// If you fill this in, mention crash reporting in your privacy policy.
const SENTRY_LOADER_KEY = '';

// Links shown in the editor. Leave either empty to hide that button.
window.MOCEAN_CONFIG = {
  feedbackUrl: '', // e.g. a form for feedback; shows the Feedback button
  supportUrl: ''   // e.g. a donation page; shows the Support button and a line in the Export dialog
};

(() => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  const add = (src, attrs) => {
    try {
      const s = document.createElement('script');
      s.src = src; s.defer = true; s.crossOrigin = 'anonymous';
      Object.assign(s.dataset, attrs || {});
      s.onerror = () => {}; // a blocked or offline script must never matter
      document.head.appendChild(s);
    } catch (e) {}
  };
  if (CF_ANALYTICS_TOKEN) add('https://static.cloudflareinsights.com/beacon.min.js', { cfBeacon: JSON.stringify({ token: CF_ANALYTICS_TOKEN }) });
  if (SENTRY_LOADER_KEY) add(`https://js.sentry-cdn.com/${SENTRY_LOADER_KEY}.min.js`);
})();
