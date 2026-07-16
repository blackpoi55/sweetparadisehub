import Link from "next/link";

const GAME_URL = "https://www.roblox.com/th/games/115633751220614/Sweet-paradise";
const DISCORD_URL = "https://discord.gg/tCX6vwwZxq";

const cols = [
  {
    title: "ระบบเกม",
    links: [
      { href: "/fishing", label: "ตกปลา" },
      { href: "/rodskin", label: "สกินเบ็ด" },
      { href: "/fishclash", label: "ศึกปลา" },
      { href: "/boss", label: "บอสโลก" },
      { href: "/monsterfarm", label: "มอนสเตอร์ฟาร์ม" },
      { href: "/farm", label: "ฟาร์ม" },
      { href: "/pets", label: "สัตว์เลี้ยง" },
    ],
  },
  {
    title: "คราฟ & กิจกรรม",
    links: [
      { href: "/craft", label: "สูตรคราฟ" },
      { href: "/gacha", label: "กาชา" },
      { href: "/wheel", label: "วงล้อรายวัน" },
      { href: "/schedule", label: "ตารางกิจกรรม" },
    ],
  },
  {
    title: "ตลาด & ชุมชน",
    links: [
      { href: "/shop", label: "ร้านค้า NPC" },
      { href: "/marketplace", label: "ตลาดฝากขาย" },
      { href: "/family", label: "ครอบครัว & คู่รัก" },
      { href: "/rule", label: "กฏการเล่น" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-pink-500/20 bg-black/60">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-5">
        {/* brand */}
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 overflow-hidden rounded-2xl border border-pink-400/40 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-lg shadow-pink-500/40">
              <img src="/images/smalllogo.png" alt="Sweet Paradise" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="bg-gradient-to-r from-pink-300 via-fuchsia-200 to-rose-300 bg-clip-text text-base font-bold text-transparent">
                Sweet Paradise
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-pink-500/70">Roblox Hangout Hub</p>
            </div>
          </div>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-pink-200/70">
            เว็บรวมข้อมูลทุกระบบของแมพ Sweet Paradise — ตกปลา คราฟ กาชา สัตว์เลี้ยง ครอบครัว และอีกมากมาย
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-pink-500/30 transition hover:-translate-y-0.5"
            >
              ▶ เข้าเกม
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-pink-400/50 bg-black/50 px-4 py-2 text-xs font-medium text-pink-100 transition hover:bg-pink-500/10"
            >
              🍭 Discord
            </a>
          </div>
        </div>

        {/* link columns */}
        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-pink-400/80">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-pink-200/70 transition hover:text-pink-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pb-safe border-t border-pink-500/10 px-6 pt-4 text-center text-[11px] text-pink-300/50">
        © {2025} Sweet Paradise Hub · แฟนไซต์ข้อมูลเกม · ไม่ได้สังกัด Roblox Corporation
      </div>
    </footer>
  );
}
