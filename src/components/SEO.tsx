import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaults = {
  title: "City Global Real Estate | Premium Dubai Properties & Investment",
  description: "Dubai's trusted real estate agency offering luxury apartments, villas, and off-plan properties. AI-powered investment analysis, golden visa support, and 18% ROI.",
  keywords: "Dubai real estate, luxury apartments Dubai, villas for sale Dubai, off-plan projects, Palm Jumeirah, Downtown Dubai, real estate investment, golden visa Dubai",
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  url: "https://city-global-real-estate.vercel.app",
  type: "website",
};

export default function SEO({
  title = defaults.title,
  description = defaults.description,
  keywords = defaults.keywords,
  image = defaults.image,
  url = defaults.url,
  type = defaults.type,
}: SEOProps) {
  const fullTitle = title === defaults.title ? title : `${title} | City Global Real Estate`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="City Global Real Estate" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
