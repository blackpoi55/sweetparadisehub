export default function manifest() {
  return {
    name: "Sweet Paradise Hub",
    short_name: "Sweet Paradise",
    description:
      "รวมข้อมูลทุกระบบของแมพ Sweet Paradise บน Roblox — ตกปลา คราฟ กาชา สัตว์เลี้ยง ครอบครัว และอีกมากมาย",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0d0711",
    theme_color: "#0d0711",
    lang: "th",
    dir: "ltr",
    categories: ["games", "entertainment"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "สั่งซื้อเกมพาส", url: "/buypass", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "ตารางกิจกรรม", url: "/schedule" },
      { name: "ตกปลา", url: "/fishing" },
    ],
  };
}
