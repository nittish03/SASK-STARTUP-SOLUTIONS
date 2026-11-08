#!/usr/bin/env node
/**
 * Pre-build script: fetches the dynamic sitemap from the API and writes it
 * to public/sitemap.xml so the static file server serves valid XML at /sitemap.xml.
 * Falls back to the existing file if the API is unreachable (e.g., during CI build).
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
const OUTPUT = path.join(__dirname, "..", "public", "sitemap.xml");

function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) resolve(data);
          else reject(new Error(`HTTP ${res.statusCode}`));
        });
      })
      .on("error", reject);
  });
}

async function main() {
  const apiUrl = `${API_BASE}/api/sitemap.xml`;
  try {
    console.log(`Fetching sitemap from ${apiUrl}...`);
    const xml = await fetchSitemap(apiUrl);
    fs.writeFileSync(OUTPUT, xml, "utf8");
    console.log(`Wrote ${OUTPUT} (${xml.length} bytes)`);
  } catch (err) {
    console.warn(`Could not fetch sitemap: ${err.message}`);
    if (fs.existsSync(OUTPUT)) {
      console.warn("Keeping existing sitemap.xml (may be stale)");
    } else {
      console.error("No fallback sitemap.xml exists — build may serve SPA shell at /sitemap.xml");
      process.exit(1);
    }
  }
}

main();
