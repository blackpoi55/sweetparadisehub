import "./globals.css";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sweet Paradise Hub — รวมข้อมูลเกม",
  description:
    "เว็บรวมข้อมูลทุกระบบของแมพ Sweet Paradise บน Roblox — ตกปลา ศึกปลา ฟาร์ม คราฟ กาชา สัตว์เลี้ยง ครอบครัว วงล้อ ลอตเตอรี่ และอีกมากมาย",
  keywords: ["Sweet Paradise", "Roblox", "ตกปลา", "กาชา", "คราฟ", "สัตว์เลี้ยง"],
  openGraph: {
    title: "Sweet Paradise Hub",
    description: "รวมข้อมูลทุกระบบของแมพ Sweet Paradise",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-[#05030a] text-gray-100">
        <Nav />
        <main className="relative min-h-screen bg-gradient-to-b from-[#05030a] via-slate-950 to-[#05030a]">
          {/* แสงฉากหลังฟุ้ง ๆ ทั้งเว็บ (เบา ๆ เพื่อความลื่น) */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-600/10 blur-3xl" />
            <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl" />
          </div>
          <div className="px-3 py-5 md:px-4 md:py-6">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
