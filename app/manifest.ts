import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beefeaters Performance Hub",
    short_name: "Beefeaters Hub",
    description: "Resources for sleep, nutrition, recovery, concussion, injury prevention, and supports.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0B1F4B",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
