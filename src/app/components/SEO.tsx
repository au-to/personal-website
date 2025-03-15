"use client";

import Head from "next/head";
import { siteConfig } from "../config/siteConfig";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
}

export default function SEO({
  title,
  description = siteConfig.siteDescription,
  keywords = [],
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${siteConfig.siteName}` : siteConfig.siteName;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
} 