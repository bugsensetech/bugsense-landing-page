import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bugsensedx.com/en",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://bugsensedx.com/en",
          de: "https://bugsensedx.com/de",
        },
      },
    },
    {
      url: "https://bugsensedx.com/de",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://bugsensedx.com/en",
          de: "https://bugsensedx.com/de",
        },
      },
    },
  ];
}
