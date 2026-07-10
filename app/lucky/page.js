import { luckyMeta, luckySteps } from "@/json/lucky";
import { getLuckyRound } from "@/lib/robloxCloud";

export const metadata = { title: "ลอตเตอรี่ — Sweet Paradise Hub" };
export const dynamic = "force-dynamic";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US");
}
function thaiDate(ms) {
  if (!ms) return null;
  try {
    return new Date(ms).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
}

export default async function LuckyPage() {
  const round = await getLuckyRound();
  const live = round.ok && !round.empty;
  const drawLabel = thaiDate(round.drawAtMs);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🍀 Lucky Number
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ลอตเตอรี่ (หวยในเกม)</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ซื้อตั๋วทายเลข ทายตรงเป๊ะรับกองรางวัลรวมทั้งหมด — ออกผลทุกอาทิตย์
          </p>
        </header>

        {/* LIVE งวดปัจจุบัน */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-pink-500/10 to-fuchsia-500/10 p-6 text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber-200/80">
            {live && <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />}
            {live ? "งวดปัจจุบัน (สด)" : "กองรางวัล"}
          </p>
          <p className="mt-2 text-4xl font-black text-white md:text-5xl">
            💰 {fmt(live ? round.pot : luckyMeta.seed)}
          </p>
          <p className="mt-1 text-xs text-pink-200/70">กองรางวัลตอนนี้</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-base font-bold text-pink-100 md:text-lg">{live ? fmt(round.totalTickets) : "—"}</p>
              <p className="text-[11px] text-pink-300/70">ตั๋วที่ขายไปแล้ว</p>
            </div>
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-base font-bold text-pink-100 md:text-lg">{live ? fmt(round.buyerCount) : "—"}</p>
              <p className="text-[11px] text-pink-300/70">คนที่ซื้อ</p>
            </div>
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-sm font-bold text-emerald-200 md:text-base">
                {drawLabel || `${luckyMeta.drawWdayLabel} ${luckyMeta.drawHour}:${String(luckyMeta.drawMin).padStart(2, "0")}`}
              </p>
              <p className="text-[11px] text-pink-300/70">ออกผลงวดถัดไป</p>
            </div>
          </div>
          {!live && (
            <p className="mt-3 text-[11px] text-amber-200/80">
              * ยังดึงข้อมูลสดไม่ได้ (ต้องเปิดสิทธิ์อ่าน DataStore LuckyRound_v1 ให้ API key) — แสดงค่าตั้งต้นไว้ก่อน
            </p>
          )}
        </div>

        {/* buyers list */}
        {live && round.buyers.length > 0 && (
          <section className="mb-8 rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
            <h2 className="mb-3 text-base font-semibold text-white">👥 คนที่ซื้องวดนี้ (เรียงตามจำนวนตั๋ว)</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {round.buyers.slice(0, 20).map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-pink-500/10 px-3 py-2 text-sm">
                  <span className="truncate text-pink-50">
                    <span className="mr-1 text-pink-300/60">{i + 1}.</span>
                    {b.name}
                  </span>
                  <span className="flex-shrink-0 font-semibold text-pink-200">{fmt(b.count)} ใบ</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* steps */}
        <section className="mb-8">
          <h2 className="mb-3 text-base font-semibold text-white">วิธีเล่น</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {luckySteps.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-amber-500/20 text-xl">
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-pink-50">
                    <span className="mr-1 text-pink-300/70">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-xs text-pink-100/80">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* rules */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-3 text-base font-semibold text-white">📋 กติกา &amp; ลิมิต</h2>
          <ul className="grid grid-cols-1 gap-2 text-xs text-pink-100/90 sm:grid-cols-2 md:text-sm">
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🎯 ทายตรงเป๊ะ = รับกองรางวัลรวมทั้งหมด</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">💵 ใบละ {fmt(luckyMeta.ticketPrice)} • ทายเลข 1–{luckyMeta.maxNum}</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🔥 {Math.round(luckyMeta.burnRate * 100)}% ของค่าตั๋วถูกเผาทิ้ง (คุมเงินเฟ้อ)</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🔢 ซื้อเลขต่างกันได้สูงสุด {luckyMeta.maxDistinct} เลข/งวด</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🧾 ซื้อเลขเดิมซ้ำได้สูงสุด {luckyMeta.maxQtyPerBuy} ใบ/ครั้ง</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">💸 ถูกรางวัลตอนออฟไลน์ก็ได้เงิน (จ่ายเมื่อกลับเข้าเกม)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
