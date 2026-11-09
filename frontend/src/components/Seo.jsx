import { Helmet } from "react-helmet-async";

// Preferred production host (confirmed: matches the GA4 stream URL).
export const SITE_URL = "https://saskstartupsolutions.ca";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Seo({ title, description, path = "/", noindex = false, type = "website", staticShell = false, schema, image, children }) {
  if (staticShell) {
    return (
      <Helmet>
        <title>{title}</title>
        {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
        {children}
      </Helmet>
    );
  }

  const canonical = `${SITE_URL}${path}`;
  const cardImage = image || OG_IMAGE;

  const defaultEntitySchema = {
    "@context": "https://schema.org",
    "@type": ["AccountingService", "FinancialService"],
    "@id": `${SITE_URL}/#organization`,
    "name": "Vici SaskStartupSolutions",
    "legalName": "Vici SaskStartupSolutions",
    "url": `${SITE_URL}/`,
    "logo": `${SITE_URL}/media/logo-full.png`,
    "image": OG_IMAGE,
    "description": "Professional small business bookkeeping, T2 corporate tax filing administration, and Saskatchewan ISC Corporate Registry annual return administration in Saskatoon, SK.",
    "telephone": "+1-306-960-0091",
    "email": "Saskstartupsolutions@viciconsulting.ca",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "539 Avenue I N",
      "addressLocality": "Saskatoon",
      "addressRegion": "SK",
      "postalCode": "S7L 2G9",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.1388,
      "longitude": -106.6853
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "founder": {
      "@type": "Person",
      "name": "Patrick Vachon",
      "jobTitle": "Founder & Lead Administrator"
    },
    "areaServed": [
      { "@type": "City", "name": "Saskatoon" },
      { "@type": "AdministrativeArea", "name": "Saskatchewan" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Saskatchewan Small Business Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Small Business Bookkeeping & Payroll in Saskatoon",
            "description": "Monthly bank reconciliations, expense tracking, Saskatchewan PST (6%) and federal GST compliance."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Saskatchewan T2 Corporate Tax Filing Administration",
            "description": "Corporate income tax return preparation, compilation reports, and CRA filing administration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Saskatchewan ISC Corporate Registry Administration",
            "description": "Business corporation incorporation, name reservations, and mandatory annual returns."
          }
        }
      ]
    },
    "sameAs": [
      "https://maps.app.goo.gl/131Hpy68DZoQbHv18",
      "https://taplink.cc/saskstartupsolutions"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      
      {/* Local Saskatoon & Saskatchewan GEO Meta Tags */}
      <meta name="geo.region" content="CA-SK" />
      <meta name="geo.placename" content="Saskatoon" />
      <meta name="geo.position" content="52.1388;-106.6853" />
      <meta name="ICBM" content="52.1388, -106.6853" />
      
      {/* Open Graph & Social Cards */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Vici SaskStartupSolutions" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={cardImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cardImage} />

      {/* Global Entity Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultEntitySchema)}
      </script>

      {children}
    </Helmet>
  );
}
