import { SITE_DESCRIPTION_VI, SITE_NAME } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Nền tảng quản lý nhân sự`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION_VI,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "vi-VN",
    icons: [
      {
        src: "/logo/logo1.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo/logo3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
