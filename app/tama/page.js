import {
  meta, stats, actions, stages, species, traits, traitMinLv,
  craving, events, eventMeta, visit, release, leaderboards, howto, facts,
} from "@/json/tama";
import { resolveAsset } from "@/lib/gameAssets";

export const metadata = { title: "เลี้ยงทามาก็อต — Sweet Paradise Hub" };

const statById = Object.fromEntries(stats.map((s) => [s.id, s]));

function cdText(sec) {
  if (sec % 3600 === 0) return `${sec / 3600} ชม.`;
  return `${Math.round(sec / 60)} นาที`;
}
function gainChips(gain) {
  return Object.entries(gain || {}).map(([id, v]) => {
    const s = statById[id];
    const up = v > 0;
    return (
      <span
        key={id}
        className={
          "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium " +
          (up ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200")
        }
      >
        {s?.emoji} {s?.label} {up ? "+" : ""}{v}
      </span>
    );
  });
}

function Section({ id, emoji, title, sub, children }) {
  return (
    <section id={id} className="mb-8">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-white md:text-xl">
          <span className="mr-1.5">{emoji}</span>{title}
        </h2>
        {sub && <p className="mt-0.5 text-xs text-pink-200/70 md:text-sm">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

export default function TamaPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🥚 Tamagotchi
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            เลี้ยง<span className="text-pink-300">ทามาก็อต</span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ฟักไข่เพื่อนตัวจิ๋วในโทรศัพท์ → เลี้ยงทุกวันให้โต {meta.maxLv} เลเวล · เปิดจาก{" "}
            <span className="text-pink-100">{meta.openFrom}</span>
          </p>
        </header>

        {/* Facts */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.title} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3.5">
              <div className="text-2xl">{f.icon}</div>
              <p className="mt-1.5 text-sm font-bold text-pink-50">{f.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-pink-200/70">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How to */}
        <Section id="howto" emoji="🧭" title="วิธีเล่น (5 ขั้นตอน)">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {howto.map((s) => (
              <div key={s.step} className="rounded-xl border border-pink-500/15 bg-black/40 p-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[10px] font-bold text-black">{s.step}</span>
                  <span className="text-base leading-none">{s.icon}</span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-pink-50">{s.title}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-pink-200/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <Section id="stats" emoji="📊" title="4 สเตตัสที่ต้องดูแล" sub="ทุกค่าลดลงตามเวลาจริง (คิดตอนเปิดแอพ) · ปล่อยให้เฉลี่ยต่ำเกินไปทามะจะป่วย">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.id} className="rounded-2xl border border-pink-500/25 bg-black/60 p-4 text-center">
                <div className="text-3xl">{s.emoji}</div>
                <p className="mt-1 text-sm font-bold text-pink-50">{s.label}</p>
                <p className="mt-1 text-[11px] text-pink-200/70">ลด {s.decay}/ชม.</p>
                <p className="text-[10px] text-pink-300/50">{s.note}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Actions */}
        <Section id="actions" emoji="🎮" title="การเลี้ยง (แตะเพื่อดูแล)" sub="แต่ละอย่างมีคูลดาวน์แยกกัน · ทุกครั้งได้ EXP (นับเข้าเพดานวัน)">
          <div className="overflow-x-auto rounded-2xl border border-pink-500/25">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-pink-500/10 text-[11px] uppercase tracking-wide text-pink-200/80">
                <tr>
                  <th className="px-3 py-2">การกระทำ</th>
                  <th className="px-3 py-2">ผลที่ได้</th>
                  <th className="px-3 py-2">ใช้</th>
                  <th className="px-3 py-2 text-center">คูลดาวน์</th>
                  <th className="px-3 py-2 text-center">EXP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-500/10">
                {actions.map((a) => {
                  const cost = a.cost ? resolveAsset(a.cost.item) : null;
                  return (
                    <tr key={a.id} className="bg-black/40">
                      <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-pink-50">{a.emoji} {a.label}</td>
                      <td className="px-3 py-2.5"><div className="flex flex-wrap gap-1">{gainChips(a.gain)}</div></td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-pink-100/85">
                        {cost ? `${cost.emoji || "📦"} ${cost.label} ×${a.cost.amount}` : <span className="text-emerald-300/80">ฟรี</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-center text-pink-200/80">{cdText(a.cd)}</td>
                      <td className="px-3 py-2.5 text-center font-bold text-amber-200">+{a.exp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-pink-300/60">
            🍜 ทุกวันทามะจะ “อยากกิน” ของอย่างหนึ่ง (สุ่มจาก {craving.pool.length} อย่าง) — ให้ถูกตัวได้ EXP ×{craving.mult} (ฐาน {craving.baseExp} · ชั่วโมงละครั้ง)
          </p>
        </Section>

        {/* Stages */}
        <Section id="stages" emoji="🦋" title={`${stages.length} สเตจการเติบโต`} sub={`โตตามเลเวล · ตั้งแต่ LV.${meta.tagMinLv} ขึ้นไปจะมีแท็กอวดทามะในแชท`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {stages.map((s) => (
              <div key={s.lv} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3 text-center">
                <div className="text-3xl">{s.emoji}</div>
                <p className="mt-1 text-xs font-bold text-pink-50">{s.name}</p>
                <p className="text-[10px] text-pink-300/60">LV.{s.lv}+</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Species */}
        <Section id="species" emoji="🎨" title={`${species.length} ชนิด (สุ่มตอนฟักไข่)`} sub="มีผลแค่หน้าตา ไม่มีผลต่อการเล่น">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {species.map((s) => (
              <div key={s.id} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3 text-center">
                <div className="text-3xl">{s.emoji}</div>
                <p className="mt-1 text-xs font-medium text-pink-100">{s.name}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Traits */}
        <Section id="traits" emoji="😼" title={`นิสัย ${traits.length} แบบ`} sub={`โตมาจากวิธีที่คุณเลี้ยง (เริ่มมีตั้งแต่ LV.${traitMinLv}) · เปลี่ยนอัตราลดสเตตัส/EXP บางอย่าง`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {traits.map((t) => (
              <div key={t.id} className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
                <p className="text-sm font-bold text-pink-50">{t.emoji} {t.name}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-pink-200/75">{t.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Events */}
        <Section id="events" emoji="🎲" title="เหตุการณ์สุ่ม" sub={`เปิดแอพมีโอกาส ${Math.round(eventMeta.chance * 100)}% เจอ (เว้นห่างอย่างน้อย ${eventMeta.gapSec / 60} นาที) · แต่ละเหตุการณ์มีให้เลือก 2 ทาง — ลองเลือกเองว่าทางไหนดี 😉`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <div key={e.id} className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
                <p className="text-sm font-semibold text-pink-50">{e.emoji} {e.text}</p>
                <div className="mt-2 space-y-1.5">
                  {e.choices.map((c, i) => (
                    <div key={i} className="rounded-lg border border-pink-500/15 bg-black/40 px-2.5 py-1.5">
                      <p className="text-[11px] font-medium text-pink-100">{c.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Visit + Release + Leaderboards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
            <h3 className="text-sm font-bold text-pink-50">🏡 เยี่ยมทามะเพื่อน</h3>
            <ul className="mt-2 space-y-1 text-[11px] text-pink-200/75">
              <li>• ต้องอยู่เซิร์ฟเดียวกัน</li>
              <li>• ได้ EXP +{visit.exp} และสุข +{visit.happy} ทั้งคู่</li>
              <li>• ไปได้วันละ {visit.perDay} คน</li>
              <li>• คนเดิมซ้ำต้องรอ {visit.sameGapHours} ชม.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
            <h3 className="text-sm font-bold text-pink-50">📖 สมุดสะสม + ปล่อยสู่ธรรมชาติ</h3>
            <ul className="mt-2 space-y-1 text-[11px] text-pink-200/75">
              <li>• เลี้ยงถึง LV.{release.minLv} แล้วปล่อยได้</li>
              <li>• ปล่อยแล้วบันทึกลงสมุด (เก็บได้ {release.bookCap} ตัว) แล้วฟักตัวใหม่</li>
              <li>• {release.note}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
            <h3 className="text-sm font-bold text-pink-50">🏆 อันดับ</h3>
            <ul className="mt-2 space-y-2 text-[11px] text-pink-200/75">
              {leaderboards.map((lb) => (
                <li key={lb.key}>
                  <span className="font-semibold text-pink-100">{lb.label}</span>
                  <br />
                  <span className="text-pink-200/60">{lb.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
