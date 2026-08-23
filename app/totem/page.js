import {
  meta, source, slots, tiers, totalWeight, tierPct, tierPctPerRoll,
  actions, howto, tips,
} from "@/json/totem";

export const revalidate = 3600;

export const metadata = {
  title: "โทเทมนำโชค — Sweet Paradise Hub",
  description:
    "คู่มือระบบ 🗿 โทเทมนำโชค — ปักแล้วบัฟโชคตกปลา + เงินขายปลาให้ทุกคนในระยะ 50 ช่อง พร้อมตารางชั้นความหายาก ค่าสุ่ม การล็อกช่อง และการย้อนค่าเดิม",
};

const fmt = (n) => Number(n || 0).toLocaleString("en-US");

async function fetchIcon() {
  try {
    const r = await fetch(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${meta.iconId}&size=420x420&format=Png&isCircular=false`,
      { next: { revalidate: 3600 } }
    );
    const j = await r.json();
    const d = (j.data || [])[0];
    return d && d.state === "Completed" ? d.imageUrl : null;
  } catch {
    return null;
  }
}

const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200" },
};

function Section({ icon, title, sub, children }) {
  return (
    <section className="mt-9">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs text-pink-200/75 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function TotemPage() {
  const icon = await fetchIcon();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🗿 Lucky Totem
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            โทเทม<span className="text-amber-300">นำโชค</span>
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-pink-100/85 md:text-sm">
            ปักไว้แล้ว <span className="text-amber-200">บัฟโชคตกปลา + เงินขายปลา</span> ให้ทุกคนที่ยืนในระยะ{" "}
            {meta.radius} ช่อง · สุ่มบัฟเองได้ในแอพ {meta.appEmoji} {meta.appName} ในโทรศัพท์
          </p>
        </header>

        {/* การ์ดไอเทม + ที่มา */}
        <div className="mt-6 grid gap-4 md:grid-cols-[240px_1fr]">
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-fuchsia-500/10 p-4 text-center">
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-2xl border border-amber-400/25 bg-black/40">
              {icon ? (
                <img src={icon} alt={meta.itemName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">🗿</div>
              )}
            </div>
            <p className="mt-2 text-sm font-bold text-amber-100">{meta.itemName}</p>
            <p className="text-[11px] text-pink-200/70">ไอเทมปัก (ลิมิเต็ด)</p>
          </div>

          <div className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
            <p className="text-sm font-bold text-pink-50">🎣 ได้มาจากไหน</p>
            <div className="mt-2 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/[0.07] p-3">
              <p className="text-sm font-semibold text-fuchsia-100">🌈 {source.fish}</p>
              <div className="mt-1.5 flex flex-wrap gap-3 text-[11px] text-pink-100/85">
                <span>💰 ขายได้ {fmt(source.fishPrice)}</span>
                <span>⭐ {fmt(source.fishScore)} คะแนน</span>
                <span className="text-rose-200">🎯 อัตราออก {source.fishRate}%</span>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-pink-200/75">{source.note}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { v: `${meta.radius}`, k: "รัศมีบัฟ (ช่อง)" },
                { v: fmt(meta.rerollCost), k: "ค่าสุ่ม/ครั้ง" },
                { v: `+${meta.maxLuckSum * 100}%`, k: "เพดานโชครวม", tone: "text-emerald-200" },
                { v: `+${meta.maxMoneySum * 100}%`, k: "เพดานเงินรวม", tone: "text-amber-200" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-pink-500/20 bg-black/50 px-2 py-2 text-center">
                  <p className={"text-sm font-bold " + (s.tone || "text-pink-100")}>{s.v}</p>
                  <p className="text-[10px] text-pink-300/70">{s.k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* วิธีเล่น */}
        <Section icon="🧭" title="เริ่มยังไง (5 ขั้นตอน)">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {howto.map((s) => (
              <div key={s.step} className="rounded-xl border border-pink-500/15 bg-black/40 p-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-fuchsia-500 text-[10px] font-bold text-black">
                    {s.step}
                  </span>
                  <span className="text-base leading-none">{s.icon}</span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-pink-50">{s.title}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-pink-200/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 2 ช่องบัฟ */}
        <Section icon="🎰" title="บัฟมี 2 ช่อง" sub="สุ่ม 1 ครั้งได้ทั้งคู่ — แต่ละช่องสุ่มชั้นความหายากของตัวเองแยกกัน">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {slots.map((s) => (
              <div key={s.key} className="rounded-2xl border border-pink-500/25 bg-black/60 p-4">
                <p className="text-base font-bold text-pink-50">
                  {s.emoji} {s.name}
                </p>
                <p className="mt-0.5 text-[11px] text-pink-200/75">{s.desc}</p>
                <p className="mt-2 inline-block rounded-full bg-pink-500/15 px-2.5 py-0.5 text-xs font-semibold text-pink-100">
                  ได้ +{s.range[0]}% ถึง +{s.range[1]}%
                </p>
                <p className="mt-1.5 text-[10px] text-pink-300/70">{s.capText}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ตารางชั้น */}
        <Section
          icon="🏅"
          title="5 ชั้นความหายาก"
          sub="ค่าที่ได้ขึ้นกับชั้นที่สุ่มติด — ยิ่งชั้นสูงยิ่งหายากและค่าสูง"
        >
          <div className="overflow-x-auto rounded-2xl border border-pink-500/25">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-pink-500/10 text-[11px] uppercase tracking-wide text-pink-200/80">
                <tr>
                  <th className="px-3 py-2">ชั้น</th>
                  <th className="px-3 py-2 text-center">🍀 โชคตกปลา</th>
                  <th className="px-3 py-2 text-center">💰 เงินขายปลา</th>
                  <th className="px-3 py-2 text-right">โอกาส/ช่อง</th>
                  <th className="px-3 py-2 text-right">โอกาส/การสุ่ม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-500/10">
                {tiers.map((t) => (
                  <tr key={t.name} className="bg-black/40">
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold"
                        style={{ backgroundColor: t.color + "22", color: t.color }}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                        {t.name}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-pink-100">
                      +{t.luck[0]}% – {t.luck[1]}%
                    </td>
                    <td className="px-3 py-2.5 text-center text-pink-100">
                      +{t.money[0]}% – {t.money[1]}%
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-pink-200/85">
                      {tierPct(t.weight).toFixed(1)}%
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-semibold text-amber-200">
                      {tierPctPerRoll(t.weight).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-pink-300/65">
            * “โอกาส/การสุ่ม” = โอกาสที่การสุ่ม 1 ครั้ง (2 ช่อง) จะเจอชั้นนั้นอย่างน้อย 1 ช่อง — สูงกว่าโอกาสต่อช่องเกือบเท่าตัว
          </p>
        </Section>

        {/* การกระทำ */}
        <Section icon="📱" title={`ทำอะไรได้บ้างในแอพ ${meta.appEmoji} ${meta.appName}`} sub={meta.openFrom}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {actions.map((a) => {
              const tone = TONES[a.tone] || TONES.sky;
              return (
                <div key={a.key} className={"rounded-2xl border p-4 " + tone.box}>
                  <p className="text-2xl">{a.icon}</p>
                  <p className={"mt-1 text-sm font-bold " + tone.text}>{a.name}</p>
                  <p className="mt-1 inline-block rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold text-pink-100">
                    {a.cost}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-pink-100/80">{a.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 rounded-xl border border-pink-500/20 bg-black/50 p-2.5 text-[11px] text-pink-200/80">
            🛡️ ทั้งการล็อกช่องและการย้อนค่าเดิม ใช้ <span className="text-pink-100">{meta.cardName}</span>{" "}
            (ใบเดียวกับที่ใช้ในระบบสกินเบ็ด) — หาได้จากขอพร / กาชา / ตลาดฝากขาย
          </p>
        </Section>

        {/* ข้อควรรู้ */}
        <Section icon="💡" title="ข้อควรรู้">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((t) => {
              const tone = TONES[t.tone] || TONES.sky;
              return (
                <div key={t.title} className={"rounded-2xl border p-3.5 " + tone.box}>
                  <p className={"text-sm font-bold " + tone.text}>
                    {t.icon} {t.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-pink-100/85">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <p className="mt-8 text-center text-[11px] text-pink-300/55">
          ข้อมูลทั้งหมดคัดลอกจากระบบจริงในเกม (TotemBuffServer / FishConfig) · กด E ที่โทเทมในเกมเพื่อดูบัฟของอันนั้น (ระยะ{" "}
          {meta.promptDistance} ช่อง)
        </p>
      </div>
    </div>
  );
}
