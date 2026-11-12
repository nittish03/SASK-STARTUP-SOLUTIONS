// Canonical sitemap generator for Vici SaskStartupSolutions
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://saskstartupsolutions.ca";
const PUBLIC_SITEMAP = path.join(__dirname, "..", "public", "sitemap.xml");
const BLOG_POSTS_PATH = path.join(__dirname, "..", "src", "data", "blogPosts.js");

const CORE_ROUTES = [
  "",
  "/services",
  "/incorporate-saskatoon",
  "/business-registration-saskatchewan",
  "/bookkeeping-saskatoon",
  "/bookkeeping-cleanup-saskatoon",
  "/isc-annual-returns-saskatoon",
  "/multilingual-newcomer-business-saskatoon",
  "/booking",
  "/staff",
  "/contact",
  "/faq",
  "/blogs",
  "/sitemap",
];

async function run() {
  const { STATIC_BLOG_POSTS } = await import(BLOG_POSTS_PATH);
  const urls = [];
  const seen = new Set();

  for (const route of CORE_ROUTES) {
    const loc = `${SITE_URL}${route}`;
    if (!seen.has(loc)) {
      seen.add(loc);
      urls.push(`<url><loc>${loc}</loc></url>`);
    }
  }

  for (const post of STATIC_BLOG_POSTS) {
    if (!post?.slug) continue;
    const loc = `${SITE_URL}/blogs/${post.slug}`;
    if (seen.has(loc)) continue;
    seen.add(loc);
    const lastmod = (post.updated_at || post.published_at || "").slice(0, 10);
    urls.push(
      lastmod
        ? `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
        : `<url><loc>${loc}</loc></url>`
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(PUBLIC_SITEMAP, xml, "utf8");
  console.log(`Generated canonical sitemap.xml with ${urls.length} URLs (0 /blog duplicate URLs).`);
}

run().catch((err) => {
  console.error("Failed to generate sitemap:", err);
  process.exit(1);
});
