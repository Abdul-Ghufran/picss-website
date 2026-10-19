import type { MetadataRoute } from "next";
import { organisation } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? organisation.website;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
