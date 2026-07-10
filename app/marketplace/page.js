import { getMarketListings } from "@/lib/robloxCloud";
import MarketListingsClient from "./MarketListingsClient";

export const metadata = { title: "ตลาดฝากขาย — Sweet Paradise Hub" };
export const dynamic = "force-dynamic";

const steps = [
  { icon: "📦", title: "ฝากขาย (Consignment)", desc: "เอาผลผลิตฟาร์ม/กล่องกาชาที่มี มาตั้งราคาขายเอง ของจะถูกฝากไว้ (escrow) จนกว่าจะมีคนซื้อหรือหมดอายุ" },
  { icon: "🌐", title: "ตลาดกลางร่วมเซิร์ฟ", desc: "ประกาศขายเห็นกันทุกเซิร์ฟ ใครก็ซื้อได้ ค้นหาด้วยชื่อไทยของไอเทมได้เลย" },
  { icon: "📬", title: "กล่องจดหมาย (Mailbox)", desc: "ขายได้/ซื้อของ ระบบส่งเงินหรือของเข้ากล่องจดหมายให้ กันของหายแม้ออฟไลน์" },
  { icon: "📊", title: "ราคาแนะนำ + ขายดี", desc: "ดูราคาขายล่าสุด 20 ครั้งของแต่ละไอเทม + กระดานพ่อค้ายอดขายสูงสุด และไอเทมขายดี" },
];

const rules = [
  { icon: "✂️", label: "หัก 15% ทุกการขาย", value: "ค่าธรรมเนียมถูกลบทิ้ง (sink) เพื่อลดเงินเฟ้อในเกม" },
  { icon: "⏳", label: "ประกาศอยู่ได้ 3 วัน", value: "หมดอายุแล้วของเด้งกลับเข้ากล่องจดหมาย" },
  { icon: "🚀", label: "ดันโพสต์ใช้ “ตั๋วดันตลาด” 1 ใบ", value: "คราฟตั๋วที่โต๊ะคราฟ → ดันประกาศขึ้นเด่น (Featured) 6 ชั่วโมง" },
  { icon: "🏪", label: "ขายได้ไม่จำกัดต่อคน", value: "เพดานรวมทั้งตลาด 2,000 ประกาศ (เพื่อความเสถียร)" },
];

function Card({ children, className = "" }) {
  return <div className={"rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5 " + className}>{children}</div>;
}

export default async function MarketplacePage() {
  const { listings, ok } = await getMarketListings();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🏬 Marketplace
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ตลาดฝากขาย</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ตลาดผู้เล่นต่อผู้เล่น (ที่ NPC No.6 หรือในแอปมือถือ) — ตั้งราคาขายของฟาร์มเอง ซื้อขายกันข้ามเซิร์ฟ
          </p>
        </header>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <Card key={s.title}>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-xl">
                  {s.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-pink-50">{s.title}</p>
                  <p className="mt-0.5 text-xs text-pink-100/80">{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="mb-3 text-base font-semibold text-white">📋 กติกา &amp; ค่าธรรมเนียม</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {rules.map((r) => (
              <div key={r.label} className="flex items-start gap-2 rounded-xl bg-pink-500/10 px-3 py-2">
                <span className="text-lg leading-none">{r.icon}</span>
                <div>
                  <p className="text-xs font-medium text-pink-50 md:text-sm">{r.label}</p>
                  <p className="text-[11px] text-pink-100/75">{r.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* สินค้าสดในตลาด */}
        <MarketListingsClient listings={listings} live={ok} />
      </div>
    </div>
  );
}
