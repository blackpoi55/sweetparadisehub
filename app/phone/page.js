export const metadata = { title: "โทรศัพท์ — Sweet Paradise Hub" };

const features = [
  { icon: "📞", name: "โทร / วิดีโอคอล", desc: "โทรหาผู้เล่นอื่น หรือวิดีโอคอลเห็นหน้ากันแบบเรียลไทม์", gated: "วิดีโอคอลต้องมี Gamepass" },
  { icon: "💸", name: "โอนเงิน", desc: "โอนเงินในเกมให้เพื่อนได้จากทุกที่" },
  { icon: "🌀", name: "วาร์ปหาเพื่อน", desc: "เทเลพอร์ตไปหาผู้เล่นอื่น", gated: "ต้องมี Gamepass" },
  { icon: "💬", name: "แชท", desc: "ส่งข้อความส่วนตัวหากัน" },
  { icon: "📡", name: "เรดาร์", desc: "ดูตำแหน่ง/ระยะของผู้เล่นในแมพ" },
  { icon: "🚫", name: "บล็อค", desc: "บล็อคผู้เล่นที่ไม่อยากให้ติดต่อ" },
  { icon: "🤳", name: "เซลฟี่", desc: "ถ่ายเซลฟี่ในเกม" },
  { icon: "🟢", name: "ตั้งสถานะ", desc: "ตั้งสถานะ + โหมดความเป็นส่วนตัว (ซ่อนตัวจากเรดาร์/สายโทร)" },
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
            ไอเทมมือถือครบเครื่อง — ติดต่อ/โอนเงิน/วาร์ป/แชท และเข้าแอปต่าง ๆ (ตลาดฝากขาย ฯลฯ) ได้จากที่เดียว
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.name} className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-xl">
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-pink-50">{f.name}</p>
                <p className="mt-0.5 text-xs text-pink-100/80">{f.desc}</p>
                {f.gated && (
                  <span className="mt-1 inline-flex rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                    🔒 {f.gated}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
