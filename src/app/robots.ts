import type { MetadataRoute } from "next";
import { organisation } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? organisation.website;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
