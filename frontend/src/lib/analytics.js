// GA4 helper — G-03VN7HB92G is loaded once in public/index.html with
// send_page_view: false; SPA page views are fired from App.js on route change.
export function trackPageView(path) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Never send PII — event names + coarse labels only.
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
