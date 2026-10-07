import type { MetadataRoute } from "next";

// Site de soutenance en ligne (Vercel) : accessible par son lien, mais masqué des moteurs de recherche.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
