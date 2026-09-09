import {
  meta, crops, plantChoices, mystery, care, variants, variantOdds,
  giant, sizeTiers, sizeNote, spread, runt, megaRolls, megaNote,
  displayRange, megaWeight, cropByKey, fertilizers, fertNote, night, bee, rain,
  seasons, seasonNote, plots, plotTotal, order, contest, steps, tips,
} from "@/json/garden";
import { fmtNum } from "@/lib/gameAssets";

export const revalidate = 3600;

export const metadata = {
  title: "สวนปลูกผลไม้ — Sweet Paradise Hub",
  description:
    "คู่มือ 🌱 สวนปลูกผลไม้ — พืช 6 ชนิด สายพันธุ์ 6 แบบ ตารางเวลาโต/น้ำหนัก/ราคา โบนัสรดน้ำ ปุ๋ย ฤดูกาล ออเดอร์ประจำวัน และการแข่งผลใหญ่รายสัปดาห์",
};

const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200", chip: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200", chip: "border-sky-400/40 bg-sky-500/15 text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200", chip: "border-amber-400/40 bg-amber-500/15 text-amber-200" },
  violet: { box: "border-violet-400/35 bg-violet-500/[0.08]", text: "text-violet-200", chip: "border-violet-400/40 bg-violet-500/15 text-violet-200" },
  pink: { box: "border-pink-400/40 bg-pink-500/[0.08]", text: "text-pink-200", chip: "border-pink-400/40 bg-pink-500/15 text-pink-200" },
  slate: { box: "border-slate-400/30 bg-slate-500/[0.08]", text: "text-slate-200", chip: "border-slate-400/40 bg-slate-500/15 text-slate-200" },
};

const RARITY = {
  ธรรมดา: "border-slate-400/70 bg-[#B0BEC5] text-slate-900",
  ไม่ธรรมดา: "border-emerald-400/70 bg-[#66BB6A] text-slate-900",
  หายาก: "border-sky-400/70 bg-[#42A5F5] text-slate-900",
  ตำนาน: "border-amber-300/80 bg-[#FFC107] font-semibold text-slate-900",
};

function dur(sec) {
  if (sec < 3600) return `${Math.round(sec / 60)} นาที`;
  const h = sec / 3600;
  return Number.isInteger(h) ? `${h} ชั่วโมง` : `${h.toFixed(1)} ชั่วโมง`;
}

function Section({ icon, title, sub, children }) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold leading-[1.5] text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs leading-relaxed text-emerald-100/70 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Stat({ v, k, tone = "text-emerald-200" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 text-center">
      <div className={"text-base font-bold leading-[1.4] md:text-lg " + tone}>{v}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-emerald-100/55">{k}</div>
    </div>
  );
}

export default function GardenPage() {
  const dayOdds = variantOdds({ night: false });
  const nightOdds = variantOdds({ night: true });
  const goldOdds = variantOdds({ night: true, goldFert: true });
  const oddsByKey = (list) => Object.fromEntries(list.map((v) => [v.key, v.pct]));
  const D = oddsByKey(dayOdds), N = oddsByKey(nightOdds), G = oddsByKey(goldOdds);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-emerald-500/25 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== Header ===== */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            🌱 Grow Garden
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-[1.45] tracking-tight text-white md:text-4xl md:leading-[1.45]">
            สวน<span className="inline-block bg-gradient-to-r from-emerald-300 via-lime-200 to-amber-200 bg-clip-text leading-[1.45] text-transparent md:leading-[1.45]">ปลูกผลไม้</span>
          </h1>
          <p className="mx-auto mt-2.5 max-w-3xl text-xs leading-relaxed text-emerald-50/85 md:text-sm">
            ปลูก รดน้ำ ลุ้นสายพันธุ์ แล้วเก็บมาอวด — พืช{" "}
            <span className="font-semibold text-white">{crops.length} ชนิด</span> × สายพันธุ์{" "}
            <span className="font-semibold text-white">{variants.length} แบบ</span> ={" "}
            <span className="text-lime-200">{crops.length * variants.length} แบบให้สะสม</span> ·
            มีฤดูกาล ออเดอร์ประจำวัน และแข่งผลใหญ่รายสัปดาห์
          </p>
        </header>

        {/* ===== ตัวเลขหลัก ===== */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Stat v={`${crops.length} ชนิด`} k="พืชที่ปลูกได้" tone="text-emerald-200" />
          <Stat v={`${variants.length} แบบ`} k="สายพันธุ์" tone="text-violet-200" />
          <Stat v={`${plots.free} → ${plots.max}`} k="ช่องปลูก" tone="text-sky-200" />
          <Stat v="×2.7" k="รดครบ vs ไม่รด" tone="text-lime-200" />
          <Stat v="2%" k="โอกาสผลยักษ์" tone="text-amber-200" />
          <Stat v={`${meta.nearDist} ช่อง`} k="ระยะทำสวน" tone="text-pink-200" />
        </div>

        {/* ===== หลักของระบบ ===== */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/35 bg-emerald-500/[0.08] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-100">
              🛡️ ไม่มีบทลงโทษเลยสักอย่าง
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">
              ต้นไม่ตาย ของไม่หาย ลืมรดน้ำก็แค่ได้เบากว่า —
              ทุกอย่างในระบบนี้เป็นโบนัสที่พลาดได้ ไม่ใช่โทษที่ต้องคอยกลัว
            </p>
          </div>
          <div className="rounded-2xl border border-amber-400/35 bg-amber-500/[0.08] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-100">
              🎯 เป็นของอวด ไม่ใช่ทางหาเงินหลัก
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">
              {meta.intent} — เล่นเพื่อสะสม อวดผลใหญ่ และแข่งกับคนอื่น
            </p>
          </div>
        </div>

        {/* ===== เล่นยังไง ===== */}
        <Section icon="🚶" title="เล่นยังไง" sub={`${steps.length} ขั้นตอน · ${meta.appFrom}`}>
          <ol className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <li key={s.step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15 text-sm font-bold text-emerald-200">
                  {s.step}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-[1.5] text-white">
                    <span className="mr-1.5">{s.icon}</span>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-emerald-100/75">{s.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </Section>

        {/* ===== ปลูกได้ 2 อย่าง ===== */}
        <Section
          icon="🌱"
          title="ตอนปลูกเลือกได้แค่ 2 อย่าง"
          sub="เลือกผลเองไม่ได้ — อยากได้ชนิดอื่นต้องลุ้นจากเมล็ดปริศนา"
        >
          <div className="grid gap-3 md:grid-cols-2">
            {plantChoices.map((c) => {
              const t = TONES[c.tone];
              return (
                <div key={c.key} className={`rounded-2xl border p-4 ${t.box}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-3xl">{c.icon}</span>
                    <span className={`text-base font-bold ${t.text}`}>{c.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${t.chip}`}>
                      {c.tag}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-black/40 px-2 py-2 text-center">
                      <div className="text-sm font-bold text-white">{dur(c.growSec)}</div>
                      <div className="text-[10px] text-emerald-100/55">เวลาโต</div>
                    </div>
                    <div className="rounded-xl bg-black/40 px-2 py-2 text-center">
                      <div className="text-sm font-bold text-white">
                        {c.waters === 0 ? "ไม่ต้องรด" : `${c.waters} ครั้ง`}
                      </div>
                      <div className="text-[10px] text-emerald-100/55">รดน้ำ</div>
                    </div>
                  </div>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">{c.desc}</p>
                  <p className="mt-2 rounded-lg bg-black/35 px-2.5 py-2 text-[10px] leading-relaxed text-emerald-100/70">
                    👍 {c.good}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-3 space-y-2">
            <p className="rounded-2xl border border-violet-400/40 bg-violet-500/[0.1] px-3.5 py-3 text-[11px] leading-relaxed text-violet-50">
              ⏱️ <span className="font-semibold text-white">เวลาโตไม่ขึ้นกับผลที่ออก</span> — {mystery.fixedTime}
            </p>
            <p className="rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-emerald-100/80">
              💡 <span className="font-semibold text-white">สุ่มตอนกดเก็บ ไม่ใช่ตอนปลูก</span> — {mystery.why}
            </p>
          </div>
        </Section>

        {/* ===== ตารางพืช ===== */}
        <Section
          icon="🌾"
          title={`พืชทั้ง ${crops.length} ชนิด`}
          sub="ผลที่เมล็ดปริศนาออกได้ · ทุกชนิดใช้เวลาโตเท่ากันหมด (45 นาที) ต่างกันแค่น้ำหนักกับราคา · ตัวเลขคิดโบนัสดูแลเต็มกับตัวกระจายขนาดแล้ว (ตรงกับป้ายในเกม)"
        >
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-emerald-100/60">
                  <th className="px-3 py-2.5 font-semibold">พืช</th>
                  <th className="px-3 py-2.5 text-center font-semibold">น้ำหนักปกติ</th>
                  <th className="px-3 py-2.5 text-center font-semibold">เพดานยักษ์</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ราคา/กก.</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ผลยักษ์ขายได้</th>
                  <th className="px-3 py-2.5 text-right font-semibold">โอกาสจาก 🌟</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {crops.map((c) => (
                  <tr key={c.key} className="bg-black/40">
                    <td className="px-3 py-2.5">
                      <span className="flex items-center gap-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.img} alt="" className="h-9 w-9 shrink-0 rounded-lg object-contain" />
                        <span className="min-w-0">
                          <span className="block whitespace-nowrap font-semibold text-white">
                            {c.icon} {c.name}
                          </span>
                          <span className={`mt-0.5 inline-block rounded-full border px-1.5 py-0.5 text-[9px] ${RARITY[c.rarity]}`}>
                            {c.rarity}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-center font-mono text-emerald-100/90">
                      {displayRange(c).lo.toFixed(2)}–{displayRange(c).hi.toFixed(2)} กก.
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-center font-mono font-semibold text-amber-200">
                      {displayRange(c).giantMax.toFixed(1)} กก.
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-mono text-lime-200">
                      {fmtNum(c.baht)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-mono font-semibold text-amber-200">
                      {fmtNum(Math.round(displayRange(c).giantMax * c.baht))}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {c.rate === 0 ? (
                        <span className="text-[10px] text-emerald-100/40">ปลูกเองเท่านั้น</span>
                      ) : (
                        <span className="font-mono font-semibold text-violet-200">{c.rate}%</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2.5 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-[11px] leading-relaxed text-emerald-100/75">
            💰 “ผลยักษ์ขายได้” คิดที่สายพันธุ์ปกติ — ถ้าเป็น 🌈 รุ้งคูณอีก ×8 · และถ้าติดชั้นโบนัสหางยาวจะหนักกว่านี้อีกหลายสิบเท่า
          </p>
          <div className="mt-2.5 grid gap-2 md:grid-cols-2">
            {crops.map((c) => (
              <p key={c.key} className="rounded-xl bg-black/35 px-3 py-2 text-[11px] leading-relaxed text-emerald-100/75">
                <span className="font-semibold text-white">{c.icon} {c.name}</span> — {c.note}
              </p>
            ))}
          </div>
        </Section>

        {/* ===== รดน้ำ ===== */}
        <Section icon="💧" title="รดน้ำ — ตัวที่ทำให้ผลใหญ่ขึ้น" sub={care.rule}>
          <div className="grid gap-3 md:grid-cols-[1fr,1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-end justify-between gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-300">×{care.min}</div>
                  <div className="mt-0.5 text-[10px] text-emerald-100/60">ไม่รดเลย</div>
                </div>
                <div className="mb-2 h-2 flex-1 rounded-full bg-gradient-to-r from-rose-500/50 via-amber-400/50 to-emerald-400/70" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">×{care.max}</div>
                  <div className="mt-0.5 text-[10px] text-emerald-100/60">รดครบทุกรอบ</div>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-semibold text-lime-200">
                ต่างกัน {care.ratio.toFixed(1)} เท่า
              </p>
              <p className="mt-2 rounded-lg bg-black/35 px-2.5 py-2 text-[10px] leading-relaxed text-emerald-100/70">
                🛡️ {care.noPenalty}
              </p>
            </div>

            <div className="grid gap-3">
              {/* 🐝 ผึ้ง — ให้ผลต่างกันตามชนิดต้น */}
              <div className="rounded-2xl border border-amber-400/35 bg-amber-500/[0.07] p-3.5">
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-amber-200">
                  <span className="text-lg">{bee.icon}</span>
                  ผึ้ง
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                    ให้ผลต่างกันตามต้น
                  </span>
                </div>
                <div className="mt-2.5 space-y-2">
                  {bee.cases.map((c) => (
                    <div key={c.on} className="rounded-xl bg-black/40 px-3 py-2">
                      <div className="text-[11px] font-semibold text-white">
                        {c.on} → <span className="text-amber-200">{c.effect}</span>
                      </div>
                      <div className="mt-0.5 text-[10px] leading-relaxed text-emerald-100/65">{c.detail}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-emerald-100/60">{bee.note}</p>
              </div>

              {/* 🌧️ ฝน */}
              <div className="rounded-2xl border border-sky-400/35 bg-sky-500/[0.07] p-3.5">
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-sky-200">
                  <span className="text-lg">{rain.icon}</span>
                  ฝน
                  <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-200">
                    เฉลี่ยทุก {rain.avgMin} นาที
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85">{rain.effect}</p>
                <p className="mt-1.5 rounded-lg bg-black/35 px-2.5 py-1.5 text-[10px] leading-relaxed text-emerald-100/70">
                  ⚠️ {rain.onlyOneWindow}
                </p>
                <p className="mt-1.5 text-[10px] leading-relaxed text-emerald-100/60">{rain.note}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== สายพันธุ์ ===== */}
        <Section
          icon="✨"
          title={`สายพันธุ์ ${variants.length} แบบ`}
          sub="สุ่มตอนเก็บทุกครั้ง — ตัวคูณราคาต่างกันมาก"
        >
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[600px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-emerald-100/60">
                  <th className="px-3 py-2.5 font-semibold">สายพันธุ์</th>
                  <th className="px-3 py-2.5 text-center font-semibold">คูณราคา</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ปลูกกลางวัน</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ปลูกกลางคืน</th>
                  <th className="px-3 py-2.5 text-right font-semibold">กลางคืน + 🌟 ปุ๋ยทอง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {variants.map((v) => {
                  const t = TONES[v.tone] || TONES.slate;
                  return (
                    <tr key={v.key} className="bg-black/40">
                      <td className="px-3 py-2.5">
                        <span className="flex flex-wrap items-center gap-1.5">
                          <span className="text-base">{v.icon}</span>
                          <span className={`font-semibold ${t.text}`}>{v.name}</span>
                          {v.count && (
                            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-1.5 py-0.5 text-[9px] text-emerald-200">
                              ได้ {v.count} ผล
                            </span>
                          )}
                          {v.announce && (
                            <span className="rounded-full border border-pink-400/40 bg-pink-500/15 px-1.5 py-0.5 text-[9px] text-pink-200">
                              ประกาศทั้งเซิร์ฟ
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={"font-mono font-bold " + (v.mult > 1 ? "text-amber-200" : "text-emerald-100/60")}>
                          ×{v.mult}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-emerald-100/85">
                        {v.nightOnly ? <span className="text-[10px] text-emerald-100/35">ออกไม่ได้</span> : `${D[v.key].toFixed(1)}%`}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-sky-200">{N[v.key].toFixed(1)}%</td>
                      <td className="px-3 py-2.5 text-right font-mono font-semibold text-amber-200">
                        {G[v.key].toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-2.5 grid gap-2 md:grid-cols-3">
            {variants.filter((v) => v.desc).map((v) => (
              <p key={v.key} className="rounded-xl bg-black/35 px-3 py-2 text-[11px] leading-relaxed text-emerald-100/75">
                <span className="font-semibold text-white">{v.icon} {v.name}</span> — {v.desc}
              </p>
            ))}
          </div>
        </Section>

        {/* ===== ขนาด + ผลยักษ์ ===== */}
        <Section icon="📏" title="ระดับขนาด" sub={sizeNote}>
          <div className="grid gap-3 lg:grid-cols-[1fr,auto]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-bold text-white">ชั้นปกติ 6 ระดับ</div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {sizeTiers
                  .filter((t) => !t.mega)
                  .map((t, i, arr) => (
                    <span
                      key={t.key}
                      className={
                        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold " +
                        (t.key === "giant"
                          ? "border-amber-300/60 bg-amber-500/20 text-amber-100"
                          : "border-white/10 bg-black/40 text-emerald-100/85")
                      }
                    >
                      <span>{t.icon}</span>
                      {t.name}
                      <span className="font-mono text-[9px] text-emerald-100/45">
                        {i === arr.length - 1 ? "เกินช่วง" : Math.round(t.at * 100) + "%+"}
                      </span>
                    </span>
                  ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-emerald-100/70">
                เปอร์เซ็นต์คือตำแหน่งในช่วงน้ำหนักของพืชชนิดนั้น — รดน้ำครบจึงได้ระดับดีกว่าโดยอัตโนมัติ
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/[0.14] to-orange-500/[0.06] p-5 text-center">
              <div className="text-4xl">🏆</div>
              <div className="mt-1.5 text-3xl font-bold text-amber-200">{giant.chance * 100}%</div>
              <div className="text-xs font-semibold text-white">โอกาสออกผลยักษ์</div>
              <p className="mx-auto mt-2 max-w-xs text-[11px] leading-relaxed text-emerald-50/80">{giant.desc}</p>
              <p className="mt-2 text-[10px] text-amber-200/85">📢 {giant.announce}</p>
            </div>
          </div>
        </Section>

        {/* ===== 🎲 ระบบกระจายขนาด (ใหม่) ===== */}
        <section className="mt-10">
          <div className="rounded-3xl border-2 border-amber-400/40 bg-amber-500/[0.06] p-4 md:p-5">
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold leading-[1.5] text-white md:text-xl">
              <span>🎲</span>
              ขนาดผลหลากหลายขึ้น
              <span className="rounded-full border border-amber-400/50 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                อัปเดตใหม่
              </span>
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-emerald-50/85 md:text-sm">
              {spread.why} — เพิ่มมา 2 ชั้นที่ซ้อนทับของเดิม: ชั้น{" "}
              <span className="font-semibold text-emerald-200">ลูกแคระ</span> ฝั่งเล็ก (เจอบ่อย) กับชั้น{" "}
              <span className="font-semibold text-amber-200">โบนัสหางยาว</span> ฝั่งใหญ่ (หายากมาก)
            </p>

            <div className="mt-4 grid gap-3 lg:grid-cols-[auto,1fr]">
              <div className="rounded-2xl border border-emerald-400/35 bg-emerald-500/[0.08] p-4 text-center lg:w-56">
                <div className="text-3xl">{runt.icon}</div>
                <div className="mt-1 text-sm font-bold text-emerald-200">ลูกแคระ</div>
                <div className="mt-1.5 text-2xl font-bold text-emerald-100">
                  {Math.round(runt.chance * 100)}%
                </div>
                <div className="text-[10px] text-emerald-100/55">โอกาสต่อการเก็บ 1 ครั้ง</div>
                <div className="mt-2 rounded-lg bg-black/40 px-2.5 py-2 font-mono text-xs font-semibold text-emerald-200">
                  ×{runt.lo} – ×{runt.hi}
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-emerald-100/65">{runt.note}</p>
              </div>

              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-sm font-bold text-white">🎰 โบนัสขนาดหางยาว — 4 ชั้น</div>
                <div className="mt-2.5 overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[460px] border-collapse text-xs">
                    <thead>
                      <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-emerald-100/60">
                        <th className="px-3 py-2 font-semibold">ชั้น</th>
                        <th className="px-3 py-2 text-right font-semibold">โอกาส</th>
                        <th className="px-3 py-2 text-right font-semibold">ถั่ววิเศษจะหนักราว</th>
                        <th className="px-3 py-2 text-center font-semibold">ประกาศ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {megaRolls.map((m) => {
                        const tier = sizeTiers.find((t) => t.key === m.key);
                        const w = megaWeight(cropByKey.Beanstalk, m);
                        return (
                          <tr key={m.key} className="bg-black/30">
                            <td className="whitespace-nowrap px-3 py-2">
                              <span className="flex items-center gap-1.5 font-semibold text-amber-100">
                                <span className="text-base">{tier.icon}</span>
                                {tier.name}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-right font-mono font-semibold text-amber-200">
                              1 / {fmtNum(m.oneIn)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-lime-200">
                              {fmtNum(Math.round(w.lo))}–{fmtNum(Math.round(w.hi))} กก.
                            </td>
                            <td className="px-3 py-2 text-center">
                              {tier.shout ? (
                                <span className="rounded-full border border-pink-400/40 bg-pink-500/15 px-2 py-0.5 text-[10px] font-semibold text-pink-200">
                                  ทั้งเซิร์ฟ
                                </span>
                              ) : (
                                <span className="text-[10px] text-emerald-100/35">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2.5 text-[11px] leading-relaxed text-emerald-100/70">🎯 {megaNote}</p>
              </div>
            </div>

            <p className="mt-4 rounded-2xl border border-white/10 bg-black/45 px-3.5 py-3 text-[11px] leading-relaxed text-emerald-100/80">
              🛡️ <span className="font-semibold text-white">ผลยักษ์ยังหายากเท่าเดิม</span> — {spread.keepsGiantRare}
            </p>
          </div>
        </section>

        {/* ===== ปุ๋ย ===== */}
        <Section icon="🧪" title="ปุ๋ย 3 ชนิด" sub="ใส่ได้ 1 ถุงต่อ 1 ต้น ตอนกดปลูก">
          <div className="grid gap-3 md:grid-cols-3">
            {fertilizers.map((f) => {
              const t = TONES[f.tone];
              return (
                <div key={f.key} className={`rounded-2xl border p-4 ${t.box}`}>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt="" className="h-14 w-14 shrink-0 rounded-xl object-contain" />
                    <div className="min-w-0">
                      <div className={`text-sm font-bold ${t.text}`}>{f.icon} {f.name}</div>
                      <div className="mt-0.5 text-xs font-semibold text-white">{f.effect}</div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg bg-black/40 px-2.5 py-2 text-center">
                    <div className="font-mono text-sm font-bold text-lime-200">
                      {(f.dropChance * 100).toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-emerald-100/55">โอกาสดรอปต่อการเก็บ 1 ครั้ง</div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-emerald-100/80">
            🎁 {fertNote}
          </p>
        </Section>

        {/* ===== กลางคืน + ฤดูกาล ===== */}
        <Section icon="🌦️" title="กลางคืน & ฤดูกาล" sub={seasonNote}>
          <div className="rounded-2xl border border-sky-400/35 bg-sky-500/[0.07] p-4">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-sky-200">
              <span className="text-lg">🌙</span>
              ปลูกกลางคืน ({night.from}:00–0{night.to}:00)
              <span className="rounded-full border border-sky-400/40 bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-200">
                โตช้าลง 20%
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">{night.desc}</p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((s) => {
              const t = TONES[s.tone];
              return (
                <div key={s.key} className={`rounded-2xl border p-4 ${t.box}`}>
                  <div className="text-3xl">{s.icon}</div>
                  <div className={`mt-1.5 text-sm font-bold ${t.text}`}>{s.name}</div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ===== ออเดอร์ + แข่ง ===== */}
        <Section icon="🎯" title="ออเดอร์ประจำวัน & แข่งผลใหญ่รายสัปดาห์">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* ออเดอร์ */}
            <div className="rounded-2xl border border-lime-400/35 bg-lime-500/[0.07] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="text-base font-bold text-lime-200">ออเดอร์ประจำวัน</span>
                <span className="rounded-full border border-lime-400/40 bg-lime-500/15 px-2 py-0.5 text-[10px] font-semibold text-lime-200">
                  วันละ 1 ใบ
                </span>
              </div>
              <div className="mt-3 rounded-xl bg-black/40 px-3 py-2.5 text-center">
                <div className="text-lg font-bold text-lime-200">
                  {fmtNum(order.minReward)} – {fmtNum(order.maxReward)}
                </div>
                <div className="text-[10px] text-emerald-100/55">ค่าตอบแทน · รีเซ็ต{order.resetAt}</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {order.levels.map((l) => (
                  <div key={l.key} className="rounded-xl border border-white/10 bg-black/35 px-3 py-2">
                    <div className="text-xs font-bold text-white">{l.icon} {l.name}</div>
                    <div className="mt-0.5 text-[10px] text-emerald-100/70">ต้อง{l.need}</div>
                    <div className="mt-0.5 font-mono text-[10px] text-amber-200">คูณ ×{l.mult}</div>
                  </div>
                ))}
              </div>
              <ol className="mt-3 space-y-1.5">
                {order.howto.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/50 text-[9px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[11px] leading-relaxed text-emerald-50/85">{h}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-2.5 rounded-lg bg-black/35 px-2.5 py-2 text-[10px] leading-relaxed text-emerald-100/70">
                💡 {order.note}
              </p>
            </div>

            {/* แข่ง */}
            <div className="rounded-2xl border border-amber-400/35 bg-amber-500/[0.07] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-base font-bold text-amber-200">แข่งผลใหญ่รายสัปดาห์</span>
                <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                  Top {contest.top}
                </span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">{contest.rule}</p>
              <ul className="mt-3 space-y-2">
                {contest.rewards.map((r) => (
                  <li key={r.rank} className="flex items-center gap-3 rounded-xl bg-black/40 px-3 py-2">
                    <span className="text-xl">{r.medal}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-white">{r.rank}</span>
                      <span className="block text-[10px] text-emerald-100/65">{r.fert}</span>
                    </span>
                    <span className="shrink-0 font-mono text-sm font-bold text-lime-200">
                      {fmtNum(r.money)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2.5 space-y-1.5 text-[10px] leading-relaxed text-emerald-100/70">
                <p>🔄 {contest.reset}</p>
                <p>💸 {contest.payout}</p>
                <p>🚫 {contest.adminNote}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== ช่องปลูก ===== */}
        <Section
          icon="🏡"
          title="ช่องปลูก"
          sub={`เริ่มฟรี ${plots.free} ช่อง ซื้อเพิ่มได้ถึง ${plots.max} ช่อง · ซื้อครบทั้งหมด ${fmtNum(plotTotal)}`}
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: plots.max }, (_, i) => i + 1).map((n) => {
              const buy = plots.prices.find((p) => p.n === n);
              return (
                <div
                  key={n}
                  className={
                    "rounded-2xl border px-3 py-3 text-center " +
                    (buy ? "border-white/10 bg-black/45" : "border-emerald-400/40 bg-emerald-500/[0.1]")
                  }
                >
                  <div className="text-xs font-bold text-white">ช่องที่ {n}</div>
                  {buy ? (
                    <div className="mt-1 font-mono text-[11px] font-semibold text-amber-200">
                      {fmtNum(buy.price)}
                    </div>
                  ) : (
                    <div className="mt-1 text-[11px] font-semibold text-emerald-200">ฟรี</div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ===== ข้อควรรู้ ===== */}
        <Section icon="📌" title="ข้อควรรู้">
          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((t) => {
              const tone = TONES[t.tone] || TONES.emerald;
              return (
                <div key={t.title} className={`rounded-2xl border p-4 ${tone.box}`}>
                  <div className={`flex items-center gap-2 text-sm font-bold leading-[1.5] ${tone.text}`}>
                    <span>{t.icon}</span>
                    {t.title}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-50/85 md:text-xs">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <p className="mt-10 text-center text-[10px] text-emerald-100/40">
          ข้อมูลอ้างอิงจากระบบในเกมจริง · อัปเดต 7 ก.ย. 2569
        </p>
      </div>
    </div>
  );
}
