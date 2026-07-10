export const metadata = { title: "จุดน่าสนใจ — Sweet Paradise Hub" };

const spots = [
  {
    icon: "🧘",
    name: "บวชพระ (วัด)",
    where: "คุยกับพระประธานในวัด (monkintemple)",
    how: "คุยเพื่อ “บวช” → หัวโล้น + สวมจีวร + ถือบาตร (ถอดเสื้อผ้า/ผมชั่วคราว) • คุยอีกครั้ง = “สึก” กลับร่างเดิม",
    accent: "from-amber-500/15 to-yellow-500/10",
  },
  {
    icon: "🏧",
    name: "ตู้กดเงิน (ATM)",
    where: "ตู้ ATM ในแมพ (เฉพาะสมาชิกกลุ่ม)",
    how: "กดค้าง E รับเงินสุ่ม (สูงสุด ~5,000) • คูลดาวน์รายคน: VIP 30 นาที / ทั่วไป 60 นาที • มี CraftFX ช่วยเพิ่มเพดานเงินได้",
    accent: "from-emerald-500/15 to-green-500/10",
  },
  {
    icon: "🔮",
    name: "ดูดวง (ลูกแก้ว)",
    where: "ลูกแก้ววิเศษ (Magic Ball)",
    how: "แตะเพื่อสุ่มคำทำนายดวงชะตา (ไทย/อังกฤษ) มีคำทำนายหลายร้อยแบบ เล่นแก้เบื่อ/เสี่ยงทายได้",
    accent: "from-fuchsia-500/15 to-purple-500/10",
  },
  {
    icon: "🤝",
    name: "เทรด (แลกเปลี่ยน)",
    where: "จิ้มผู้เล่นอื่น → เมนู → เทรด",
    how: "แลกเงิน + ไอเทมฟาร์ม/กล่องกาชากันได้ • ระบบยืนยันสองฝ่าย + ล็อกกันโกงแบบ atomic (ของไม่หาย)",
    accent: "from-sky-500/15 to-cyan-500/10",
  },
];

export default function PoiPage() {
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
            📍 Points of Interest
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">จุดน่าสนใจ</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            กิจกรรม NPC และมุมสนุก ๆ รอบแมพที่ไม่ควรพลาด — แวะเล่นแก้เบื่อ หาเงิน หรือเสี่ยงทาย
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {spots.map((s) => (
            <article
              key={s.name}
              className={`rounded-2xl border border-pink-500/30 bg-gradient-to-br ${s.accent} p-4 transition hover:-translate-y-0.5 hover:border-pink-400/70 md:p-5`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-black/40 text-2xl">
                  {s.icon}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">{s.name}</h2>
                  <p className="text-[11px] text-pink-200/75">📍 {s.where}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-pink-100/85 md:text-sm">{s.how}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
