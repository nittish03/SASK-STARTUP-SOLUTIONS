/** Homepage tags that must match frontend/public/index.html (no-JS crawlers). */

export const HOME_TITLE =
  "Saskatoon Bookkeeping & Tax Setup | Vici";

export const HOME_DESCRIPTION =
  "Bookkeeping, T2 filing, and ISC registry for Saskatoon businesses. Book a free introduction.";

export const HOME_URL = "https://saskstartupsolutions.ca/";

export const HOME_OG_IMAGE = "https://saskstartupsolutions.ca/og-image.jpg";

const SHELL = "home";

function shellSpecs() {
  return [
    ["meta", { name: "description", content: HOME_DESCRIPTION }],
    ["link", { rel: "canonical", href: HOME_URL }],
    ["meta", { property: "og:title", content: HOME_TITLE }],
    ["meta", { property: "og:description", content: HOME_DESCRIPTION }],
    ["meta", { property: "og:url", content: HOME_URL }],
    ["meta", { property: "og:image", content: HOME_OG_IMAGE }],
    ["meta", { name: "twitter:title", content: HOME_TITLE }],
    ["meta", { name: "twitter:description", content: HOME_DESCRIPTION }],
    ["meta", { name: "twitter:image", content: HOME_OG_IMAGE }],
  ];
}

export function removeHomeSeoShell() {
  if (typeof document === "undefined") return;
  document.head.querySelectorAll(`[data-seo-shell="${SHELL}"]`).forEach((el) => el.remove());
}

export function ensureHomeSeoShell() {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`[data-seo-shell="${SHELL}"]`)) return;
  const frag = document.createDocumentFragment();
  for (const [tag, attrs] of shellSpecs()) {
    const el = document.createElement(tag);
    el.setAttribute("data-seo-shell", SHELL);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    frag.appendChild(el);
  }
  document.head.appendChild(frag);
}
