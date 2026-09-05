import {
  card, meta, buffs, rewardWays, crowd, giftPool, giftTotalWeight, giftPct,
  finale, tips,
} from "@/json/birthday";
import { resolveAsset, rarityStyle, fmtNum } from "@/lib/gameAssets";

export const revalidate = 3600;

export const metadata = {
  title: "งานวันเกิด — Sweet Paradise Hub",
  description:
    "คู่มือ 🎂 งานวันเกิดในเกม — บัฟโชคปลารุ้ง ×512 เงินขายปลา +100% · 4 ทางรับของ (รอบแจก เป่าเทียน กล่องของขวัญ อวยพร) พร้อมตารางของขวัญเต็มและโบนัสตามจำนวนคน",
};

const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200", ring: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200", ring: "border-sky-400/40 bg-sky-500/15 text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200", ring: "border-amber-400/40 bg-amber-500/15 text-amber-200" },
  rose: { box: "border-rose-400/40 bg-rose-500/[0.09]", text: "text-rose-200", ring: "border-rose-400/40 bg-rose-500/15 text-rose-200" },
  violet: { box: "border-violet-400/35 bg-violet-500/[0.08]", text: "text-violet-200", ring: "border-violet-400/40 bg-violet-500/15 text-violet-200" },
  pink: { box: "border-pink-400/40 bg-pink-500/[0.08]", text: "text-pink-200", ring: "border-pink-400/40 bg-pink-500/15 text-pink-200" },
};

function Section({ icon, title, sub, children }) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs text-pink-200/75 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Stat({ v, k, tone = "text-pink-200" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 text-center">
      <div className={"text-base font-bold md:text-lg " + tone}>{v}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-pink-200/60">{k}</div>
    </div>
  );
}

export default function BirthdayPage() {
  const sorted = [...giftPool].sort((a, b) => b.weight - a.weight);
  // แยกกลุ่ม "ของตำนาน" ออก เพื่อคิดช่วง % ของกลุ่มบนแบบไม่ต้องฮาร์ดโค้ด
  const legendCount = giftPool.filter((g) => g.rarity === "Legendary").length;
  const commonCount = sorted.length - legendCount;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== Header ===== */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🎂 Birthday Party
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-4xl">
            งาน<span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">วันเกิด</span>ในเกม
          </h1>
          <p className="mx-auto mt-2.5 max-w-3xl text-xs leading-relaxed text-pink-100/85 md:text-sm">
            ใช้บัตร 1 ใบเปิดงาน <span className="font-semibold text-white">{meta.durationMin} นาที</span> ตรงจุดที่ยืน —
            ทุกคนที่มาในรัศมี <span className="font-semibold text-white">{meta.radius} ช่อง</span> ได้{" "}
            <span className="text-sky-200">โชคปลารุ้ง ×512</span> · <span className="text-amber-200">เงินขายปลา +100%</span> ·
            เดินเร็วขึ้น และรับเงินกับของ <span className="text-pink-200">4 ทาง</span>
          </p>
        </header>

        {/* ===== ตัวเลขหลัก ===== */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Stat v={`${meta.durationMin} นาที`} k="งานยาว" tone="text-pink-200" />
          <Stat v={`${meta.radius} ช่อง`} k="รัศมีงาน" tone="text-sky-200" />
          <Stat v={`${meta.roundsActual} รอบ`} k="รอบแจกของ" tone="text-emerald-200" />
          <Stat v="×512" k="โชคปลารุ้ง" tone="text-violet-200" />
          <Stat v="+100%" k="เงินขายปลา" tone="text-amber-200" />
          <Stat v={`${fmtNum(meta.partyCap / 1000000)}M`} k="เพดานเงินทั้งงาน" tone="text-rose-200" />
        </div>

        {/* ===== การ์ดบัตร ===== */}
        <div className="mt-6 grid gap-3 sm:grid-cols-[auto,1fr]">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-pink-400/40 bg-black/60 p-2 sm:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.icon} alt={card.name} className="h-full w-full object-contain" />
          </div>
          <div className="rounded-2xl border border-pink-400/30 bg-pink-500/[0.07] p-4">
            <div className="text-base font-bold text-white">{card.name}</div>
            <div className="mt-0.5 font-mono text-[11px] text-pink-200/60">{card.code}</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 font-semibold text-sky-200">
                🎒 {card.useFrom}
              </span>
            </div>
            <p className="mt-3 rounded-xl bg-black/35 px-3 py-2 text-[11px] leading-relaxed text-pink-100/85">
              💬 ข้อความยืนยันก่อนใช้: “{card.confirmText}”
            </p>
          </div>
        </div>

        {/* ===== บัฟในเขตงาน ===== */}
        <Section icon="✨" title="อยู่ในเขตงานได้อะไรทันที" sub="ไม่ต้องกดอะไรเลย แค่เดินเข้าไปในวง">
          <div className="grid gap-3 md:grid-cols-3">
            {buffs.map((b) => {
              const t = TONES[b.tone];
              return (
                <div key={b.name} className={`rounded-2xl border p-4 ${t.box}`}>
                  <div className="text-3xl">{b.icon}</div>
                  <div className={`mt-2 text-sm font-bold ${t.text}`}>{b.name}</div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-pink-100/85">{b.desc}</p>
                  <p className="mt-2 rounded-lg bg-black/35 px-2.5 py-1.5 text-[10px] leading-relaxed text-pink-200/70">
                    {b.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ===== 4 ทางรับของ ===== */}
        <Section
          icon="🎁"
          title="4 ทางที่ได้เงินและของ"
          sub="แต่ละทางเงื่อนไขต่างกัน — ทำครบทุกทางในงานเดียวได้"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {rewardWays.map((w) => {
              const t = TONES[w.tone];
              return (
                <div key={w.key} className={`flex flex-col rounded-2xl border p-4 ${t.box}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl">{w.icon}</span>
                    <span className={`text-base font-bold ${t.text}`}>{w.title}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${t.ring}`}>
                      {w.headline}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                    <div className="rounded-xl bg-black/40 px-2 py-1.5">
                      <div className="text-[11px] font-bold text-amber-200">{w.money}</div>
                      <div className="text-[9px] text-pink-200/55">เงินต่อครั้ง</div>
                    </div>
                    <div className="rounded-xl bg-black/40 px-2 py-1.5">
                      <div className="text-[11px] font-bold text-emerald-200">{w.moneyMult}</div>
                      <div className="text-[9px] text-pink-200/55">ตัวคูณเงิน</div>
                    </div>
                    <div className="rounded-xl bg-black/40 px-2 py-1.5">
                      <div className="text-[11px] font-bold text-sky-200">{w.item}</div>
                      <div className="text-[9px] text-pink-200/55">ของที่ได้</div>
                    </div>
                  </div>

                  <ol className="mt-3 flex-1 space-y-1.5">
                    {w.steps.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/50 text-[9px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-[11px] leading-relaxed text-pink-100/85">{s}</span>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-3 rounded-lg bg-black/35 px-2.5 py-2 text-[10px] leading-relaxed text-pink-200/70">
                    💡 {w.note}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ===== โบนัสฝูงชน ===== */}
        <Section icon="🎉" title="ยิ่งคนเยอะ ยิ่งได้เงินเยอะ" sub={crowd.note}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {crowd.table.map((r) => (
                <div
                  key={r.people}
                  className={
                    "rounded-xl border px-2 py-2.5 text-center " +
                    (r.capped
                      ? "border-amber-400/45 bg-amber-500/[0.12]"
                      : "border-white/10 bg-black/40")
                  }
                >
                  <div className="text-[10px] text-pink-200/60">{r.people} คน</div>
                  <div className={"mt-0.5 text-sm font-bold " + (r.capped ? "text-amber-200" : "text-emerald-200")}>
                    ×{r.mult.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-pink-200/75">
              เพิ่มคนละ <span className="font-semibold text-white">+{Math.round(crowd.step * 100)}%</span> เริ่มนับจากคนที่ 2 ·
              ตันที่ <span className="font-semibold text-amber-200">×{crowd.cap}</span> ตั้งแต่{" "}
              <span className="font-semibold text-white">11 คน</span> ขึ้นไป
            </p>
          </div>
        </Section>

        {/* ===== ตารางของขวัญ ===== */}
        <Section
          icon="📦"
          title="กองของขวัญ — ได้อะไรบ้าง"
          sub="กองเดียวกันทั้งรอบแจก เป่าเทียน และกล่องของขวัญ · สุ่มทีละ 1 ชิ้น"
        >
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-pink-200/70">
                  <th className="px-3 py-2.5 font-semibold">ของที่ได้</th>
                  <th className="px-3 py-2.5 font-semibold">ความหายาก</th>
                  <th className="px-3 py-2.5 text-center font-semibold">จำนวน</th>
                  <th className="px-3 py-2.5 text-right font-semibold">โอกาสออก</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {sorted.map((g) => {
                  const a = resolveAsset(g.item);
                  const r = rarityStyle(g.rarity);
                  const p = giftPct(g.weight);
                  return (
                    <tr key={g.item} className="bg-black/40">
                      <td className="px-3 py-2.5">
                        <span className="flex items-center gap-2">
                          {a.img ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={a.img} alt="" className="h-7 w-7 shrink-0 rounded-md object-contain" />
                          ) : (
                            <span className="w-7 shrink-0 text-center text-lg">{a.emoji}</span>
                          )}
                          <span className="font-medium text-white">{a.label}</span>
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] ${r.className}`}>
                          {r.label}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center font-mono text-pink-100/85">
                        {g.min === g.max ? g.min : `${g.min}–${g.max}`}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="font-mono font-semibold text-amber-200">{p.toFixed(1)}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-pink-200/70">
            ⚖️ ของกลุ่มบนจงใจตั้งให้ห่างกันไม่มาก ({giftPct(sorted[0].weight).toFixed(1)}% ลงมา{" "}
            {giftPct(sorted[commonCount - 1].weight).toFixed(1)}%) — เปิดแล้วได้ลุ้นทุกช่อง ไม่ใช่ได้ข้าวตลอด ·
            ของตำนาน {legendCount} ตัวกดไว้ต่ำมาก เพราะเอาไปเปิดประมูลจริง แจกเยอะราคาตก
          </p>
        </Section>

        {/* ===== ปิดงาน ===== */}
        <Section icon="🌟" title="ของขวัญปิดงาน">
          <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/[0.12] to-pink-500/[0.08] p-5 text-center">
            <div className="text-4xl">⭐</div>
            <div className="mt-2 text-2xl font-bold text-amber-200 md:text-3xl">
              +{fmtNum(finale.starGift)}
            </div>
            <div className="text-xs font-semibold text-white">เติมเข้ากองสอยดาว</div>
            <p className="mx-auto mt-2.5 max-w-2xl text-[11px] leading-relaxed text-pink-100/85">{finale.desc}</p>
            <p className="mt-2 text-[10px] text-amber-200/85">💡 {finale.note}</p>
          </div>
        </Section>

        {/* ===== ข้อควรรู้ ===== */}
        <Section icon="📌" title="ข้อควรรู้">
          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((t) => {
              const tone = TONES[t.tone] || TONES.sky;
              return (
                <div key={t.title} className={`rounded-2xl border p-4 ${tone.box}`}>
                  <div className={`flex items-center gap-2 text-sm font-bold ${tone.text}`}>
                    <span>{t.icon}</span>
                    {t.title}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-pink-100/85 md:text-xs">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <p className="mt-10 text-center text-[10px] text-pink-200/45">
          ข้อมูลอ้างอิงจากระบบในเกมจริง · อัปเดต 5 ก.ย. 2569
        </p>
      </div>
    </div>
  );
}
