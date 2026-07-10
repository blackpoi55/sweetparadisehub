export const metadata = { title: "โทรศัพท์ — Sweet Paradise Hub" };

const groups = [
  {
    title: "สื่อสาร",
    apps: [
      { icon: "📞", name: "โทร", desc: "โทรหาผู้เล่นอื่น" },
      { icon: "📹", name: "วิดีโอคอล", desc: "เห็นหน้ากันแบบเรียลไทม์ (ViewportFrame)", gated: true },
      { icon: "💬", name: "แชท", desc: "ส่งข้อความส่วนตัวหากัน" },
      { icon: "📍", name: "เรดาร์", desc: "ดูตำแหน่ง/ระยะของผู้เล่นในแมพ" },
      { icon: "🚫", name: "บล็อค", desc: "บล็อคผู้เล่นที่ไม่อยากให้ติดต่อ" },
      { icon: "📇", name: "ประวัติ", desc: "ประวัติการโทร/ข้อความ" },
    ],
  },
  {
    title: "เงิน & เดินทาง",
    apps: [
      { icon: "💸", name: "โอนเงิน", desc: "โอนเงินในเกมให้เพื่อนจากทุกที่" },
      { icon: "🌀", name: "วาร์ป", desc: "เทเลพอร์ตไปหาผู้เล่นอื่น", gated: true },
    ],
  },
  {
    title: "เปิดระบบอื่นจากมือถือ",
    apps: [
      { icon: "📅", name: "อีเวนต์", desc: "ดูตารางกิจกรรม" },
      { icon: "🏪", name: "ตลาด", desc: "เปิดตลาดฝากขาย" },
      { icon: "🎡", name: "วงล้อ", desc: "หมุนวงล้อรายวัน" },
      { icon: "🍀", name: "ลอตเตอรี่", desc: "ซื้อหวย/ดูผล" },
      { icon: "👨‍👩‍👧", name: "ครอบครัว/คู่รัก", desc: "จัดการครอบครัว & คู่รัก" },
      { icon: "🐟", name: "ศึกปลา", desc: "เปิด Fish Clash" },
    ],
  },
  {
    title: "อื่น ๆ",
    apps: [
      { icon: "📸", name: "เซลฟี่", desc: "ถ่ายเซลฟี่ในเกม" },
      { icon: "⚙️", name: "ตั้งค่า", desc: "โหมดความเป็นส่วนตัว (ซ่อนจากเรดาร์/สายโทร) + สถานะ" },
    ],
  },
];

export default function PhonePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            📱 Phone
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">โทรศัพท์</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ศูนย์รวม 16 แอปในเครื่องเดียว — ติดต่อ/โอนเงิน/วาร์ป และเปิดระบบต่าง ๆ (ตลาด/วงล้อ/หวย/ครอบครัว/ศึกปลา) ได้จากมือถือ
            ทำงานแม้ไม่ได้ถือโทรศัพท์อยู่
          </p>
        </header>

        <div className="space-y-6">
          {groups.map((g) => (
            <section key={g.title}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-pink-400/80">{g.title}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {g.apps.map((a) => (
                  <div key={a.name} className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-lg">
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-sm font-semibold text-pink-50">
                        {a.name}
                        {a.gated && <span title="ต้องมี Gamepass">🔒</span>}
                      </p>
                      <p className="text-[11px] text-pink-100/75">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-pink-300/60">
          🔒 = ต้องมี Gamepass (วิดีโอคอล / วาร์ป)
        </p>
      </div>
    </div>
  );
}
