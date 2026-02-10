import type { MetadataRoute } from "next";
import { MAIN_DESCRIPTION, MAIN_TITLE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: MAIN_TITLE,
    short_name: MAIN_TITLE,
    description: MAIN_DESCRIPTION,
    theme_color: "#fff",
    background_color: "#fff",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "../public/assets/Wide310x150Logo.scale-200.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "../public/assets/Wide310x150Logo.scale-400.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
