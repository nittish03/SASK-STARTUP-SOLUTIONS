import { Helmet } from "react-helmet-async";

// Preferred production host (confirmed: matches the GA4 stream URL).
export const SITE_URL = "https://saskstartupsolutions.ca";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Seo({ title, description, path = "/", noindex = false, type = "website", children }) {
  const canonical = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {children}
    </Helmet>
  );
}
