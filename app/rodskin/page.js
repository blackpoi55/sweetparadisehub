import {
  meta,
  skins,
  iconIds,
  STATS,
  upgradeTable,
  upgradeItems,
  craft,
  helpers,
  lockRules,
  howto,
  facts,
  fxTable,
  fxNotes,
  fxChanges,
} from "@/json/rodskin";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const revalidate = 3600;

export const metadata = {
  title: "สกินเบ็ด — Sweet Paradise Hub",
  description:
    "คู่มือระบบสกินเบ็ด (Rod Skin) — สกิน 8 แบบ ใส่ทับเบ็ดไหนก็ได้ โบนัสบวกเพิ่ม ตีบวกถึง +30 แยกลุคกับความสามารถ พร้อมสูตรคราฟและตารางตีบวก",
};

// ดึงรูปสกินจริงจาก Roblox (ฝั่ง server — เลี่ยง CORS + แคช 1 ชม.)
async function fetchSkinIcons() {
  try {
    const r = await fetch(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${iconIds.join(",")}&size=420x420&format=Png&isCircular=false`,
      { next: { revalidate: 3600 } }
    );
    const j = await r.json();
    const map = {};
    for (const d of j.data || []) {
      if (d.state === "Completed" && d.imageUrl) map[String(d.targetId)] = d.imageUrl;
    }
    return map;
  } catch {
    return {};
  }
}

// สีการ์ดบัตร/ตั๋ว (เขียนเต็มคลาส — Tailwind ต้องเห็นชื่อคลาสตรง ๆ)
const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200" },
  lime: { box: "border-lime-400/35 bg-lime-500/[0.07]", text: "text-lime-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200" },
};

function Section({ id, icon, title, sub, children }) {
  return (
    <section id={id} className="mt-9">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mb-3 mt-1 text-xs text-sky-200/70 md:text-sm">{sub}</p>}
      <div className={sub ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

/* โบนัสของสกิน (แสดงเฉพาะสเตทที่มี) */
function BonusList({ bonus, dim }) {
  const present = STATS.filter((s) => bonus[s.key]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {present.map((s) => (
        <span
          key={s.key}
          className="inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[11px] font-semibold"
          style={{
            background: dim ? "rgba(255,255,255,0.05)" : `${s.color}1f`,
            color: dim ? "rgba(255,255,255,0.55)" : s.color,
          }}
        >
          <span>{s.emoji}</span>
          {s.fmt(bonus[s.key])}
        </span>
      ))}
    </div>
  );
}

function SkinCard({ s, img }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border bg-black/60"
      style={{ borderColor: `${s.color}55` }}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition group-hover:opacity-90"
        style={{ background: `${s.color}33` }}
      />

      {/* image */}
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(circle at 50% 60%, ${s.color}2e, transparent 70%)` }}
      >
        {img ? (
          <img
            src={img}
            alt={s.name}
            className="h-36 w-36 object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-6xl">{s.emoji}</span>
        )}
        <span
          className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold"
          style={{ borderColor: `${s.color}88`, background: "rgba(0,0,0,0.55)", color: s.color }}
        >
          {s.lane}
        </span>
      </div>

      {/* body */}
      <div className="relative p-4 pt-3">
        <h3 className="flex items-center gap-1.5 text-base font-bold" style={{ color: s.color }}>
          <span>{s.emoji}</span>
          {s.name}
        </h3>
        <p className="mt-0.5 text-[11px] leading-relaxed text-sky-100/65">{s.desc}</p>

        <div className="mt-3 space-y-2 rounded-2xl bg-white/[0.03] p-2.5">
          <div>
            <p className="mb-1 text-[10px] font-medium text-white/40">เริ่มต้น +0</p>
            <BonusList bonus={s.at0} dim />
          </div>
          <div className="border-t border-white/10 pt-2">
            <p className="mb-1 text-[10px] font-medium" style={{ color: s.color }}>
              สูงสุด +{meta.maxLevel} 🔥
            </p>
            <BonusList bonus={s.at30} />
          </div>
        </div>
      </div>
    </article>
  );
}

function CostItem({ item, amount, formula }) {
  const a = resolveAsset(item);
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-2.5 py-1.5">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-6 w-6 rounded" />
      <span className="min-w-0 flex-1 truncate text-[11px] text-sky-50">{a.label}</span>
      <span className="flex-shrink-0 font-mono text-[11px] font-semibold text-amber-200">
        {formula ? formula : `×${fmtNum(amount)}`}
      </span>
    </div>
  );
}

export default async function RodSkinPage() {
  const icons = await fetchSkinIcons();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-sky-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* HERO */}
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
            🎣 Rod Skin • ระบบใหม่
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-sky-300 via-fuchsia-200 to-amber-200 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-5xl">
            สกินเบ็ด
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xs text-sky-100/80 md:text-sm">
            สกิน <b className="text-white">8 แบบ</b> ใส่ทับเบ็ดตัวไหนก็ได้ — เปลี่ยนทั้ง
            <b className="text-fuchsia-200"> หน้าตา</b> และ
            <b className="text-amber-200"> เพิ่มพลังเบ็ด</b> แบบบวกเพิ่ม ตีบวกได้ถึง{" "}
            <b className="text-white">+{meta.maxLevel}</b> และเลือกใช้ “ลุค” กับ “ความสามารถ” ข้ามสกินกันได้
          </p>

          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { v: "8 แบบ", l: "สกินทั้งหมด" },
              { v: `+${meta.maxLevel}`, l: "ตีบวกสูงสุด" },
              { v: "บวก (+)", l: "ไม่ใช่คูณ" },
              { v: `${meta.appIcon} แอป`, l: meta.appName },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-sky-500/25 bg-black/50 px-3 py-2.5">
                <p className="text-sm font-bold text-sky-100">{s.v}</p>
                <p className="text-[10px] text-sky-300/70">{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* FACTS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-2xl">{f.icon}</div>
              <p className="mt-1.5 text-sm font-bold text-white">{f.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-sky-200/70">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* GALLERY */}
        <Section
          id="skins"
          icon="✨"
          title="สกินทั้ง 8 แบบ"
          sub="แต่ละสกินมี “สาย” ของตัวเอง — เลือกให้เข้ากับสไตล์การตกปลาของคุณ"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skins.map((s) => (
              <SkinCard key={s.key} s={s} img={icons[String(s.iconId)]} />
            ))}
          </div>
        </Section>

        {/* COMPARE TABLE */}
        <Section
          id="compare"
          icon="📊"
          title={`เทียบโบนัสที่ +${meta.maxLevel} (สูงสุด)`}
          sub="ค่าทั้งหมดคือ “บวกเพิ่ม” จากเบ็ดที่ใช้อยู่ · ความเร็ว = ลดวินาทีต่อการเหวี่ยง (ยิ่งติดลบยิ่งเร็ว)"
        >
          <div className="overflow-x-auto rounded-2xl border border-sky-500/25 bg-black/50">
            <table className="w-full min-w-[560px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-sky-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">สกิน</th>
                  <th className="px-3 py-2.5 text-left font-medium">สาย</th>
                  {STATS.map((s) => (
                    <th key={s.key} className="px-3 py-2.5 text-right font-medium">
                      {s.emoji} {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {skins.map((s) => (
                  <tr key={s.key} className="border-t border-sky-500/10">
                    <td className="px-3 py-2.5 font-semibold" style={{ color: s.color }}>
                      {s.emoji} {s.name}
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-sky-200/60">{s.lane}</td>
                    {STATS.map((st) => {
                      const v = s.at30[st.key];
                      return (
                        <td
                          key={st.key}
                          className="px-3 py-2.5 text-right font-mono font-semibold"
                          style={{ color: v ? st.color : "rgba(255,255,255,0.18)" }}
                        >
                          {v ? st.fmt(v) : "–"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* LOOK vs ABILITY */}
        <Section
          id="lock"
          icon="🎭"
          title="ลุค & ความสามารถ — แยกกันได้"
          sub="ใช้หน้าตาของสกินหนึ่ง แต่เอาพลังของอีกสกินได้ (ต้องตีบวกถึงเกณฑ์ก่อน)"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {lockRules.map((r) => (
              <div
                key={r.title}
                className={
                  "rounded-2xl border p-4 " +
                  (r.ok ? "border-emerald-400/35 bg-emerald-500/[0.07]" : "border-amber-400/35 bg-amber-500/[0.07]")
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{r.title}</h3>
                  <span className={"rounded-full px-2 py-0.5 text-[10px] font-medium " + (r.ok ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200")}>
                    {r.sub}
                  </span>
                </div>
                <p className={"mt-2 text-sm font-bold " + (r.ok ? "text-emerald-200" : "text-amber-200")}>
                  {r.ok ? "✅ " : "🔒 "}
                  {r.req}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-sky-100/70">{r.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* FX SCALE */}
        <Section
          id="fx"
          icon="🎨"
          title="ยิ่งตีบวก เอฟเฟกต์ยิ่งสวย"
          sub="ความแรงเอฟเฟกต์เพิ่มตามเลเวลของสกิน — +0 เห็นจาง ๆ ไล่ขึ้นจนเต็มสูบที่ +30"
        >
          <div className="rounded-2xl border border-fuchsia-500/25 bg-black/50 p-4 md:p-5">
            {/* bars */}
            <div className="flex items-end justify-between gap-2 sm:gap-4">
              {fxTable.map((f) => (
                <div key={f.lv} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className={"text-[11px] font-bold " + (f.max ? "text-amber-200" : "text-fuchsia-200/70")}>
                    {f.pct}%
                  </span>
                  <div className="flex h-28 w-full max-w-[46px] items-end overflow-hidden rounded-lg bg-white/[0.05] sm:h-32">
                    <div
                      className={
                        "w-full rounded-lg " +
                        (f.max
                          ? "bg-gradient-to-t from-amber-500 via-fuchsia-400 to-sky-300"
                          : "bg-gradient-to-t from-fuchsia-600/70 to-sky-400/70")
                      }
                      style={{ height: `${f.pct}%` }}
                    />
                  </div>
                  <span className={"text-[11px] font-semibold " + (f.max ? "text-amber-200" : "text-sky-100/70")}>
                    +{f.lv}
                    {f.max ? " 🔥" : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* what changes */}
            <div className="mt-4 grid grid-cols-1 gap-2 border-t border-white/10 pt-3.5 sm:grid-cols-2">
              {fxChanges.map((c) => (
                <div key={c.label} className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] px-3 py-2">
                  <span className="text-lg leading-none">{c.icon}</span>
                  <div>
                    <p className="text-[12px] font-semibold text-fuchsia-100">{c.label}</p>
                    <p className="text-[11px] leading-tight text-sky-200/70">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* notes */}
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {fxNotes.map((n) => (
              <div
                key={n.title}
                className={
                  "rounded-2xl border p-4 " +
                  (n.tone === "amber"
                    ? "border-amber-400/35 bg-amber-500/[0.07]"
                    : "border-sky-400/35 bg-sky-500/[0.07]")
                }
              >
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="text-lg">{n.icon}</span>
                  {n.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-sky-100/75">{n.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CRAFT */}
        <Section
          id="craft"
          icon="🔨"
          title="คราฟสกิน (ได้สกินใหม่ที่ +0)"
          sub="คราฟจบในแอปเดียว ไม่ต้องเดินไปโต๊ะคราฟ — หรือใช้ 🎴 บัตรการันตี ข้ามไปเลย"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
            <div className="rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-4">
              <p className="text-[11px] text-sky-300/70">โอกาสสำเร็จต่อครั้ง</p>
              <p className="text-4xl font-black text-fuchsia-200">{Math.round(craft.chance * 100)}%</p>
              <p className="mt-1 text-[11px] text-sky-100/70">ใช้ 🍀 ตั๋วนำโชคช่วยได้อีก +10%</p>
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sky-200/70">💰 เงิน</span>
                  <span className="font-mono font-bold text-emerald-200">{fmtNum(craft.money)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sky-200/70">🎣 คะแนนตกปลา</span>
                  <span className="font-mono font-bold text-sky-200">{fmtNum(craft.fscore)}</span>
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-black/40 px-2.5 py-2 text-[10px] leading-relaxed text-sky-200/60">
                คราฟสำเร็จ → ได้สกินที่ +0 · ถ้าเป็นสกินแรก ระบบใส่ให้อัตโนมัติ ใช้ได้ทันที
              </p>
            </div>

            <div className="rounded-2xl border border-sky-500/25 bg-black/50 p-4">
              <p className="mb-2.5 text-xs font-semibold text-sky-100">🧾 วัตถุดิบที่ใช้ (เท่ากันทุกสกิน)</p>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {craft.items.map((it) => (
                  <CostItem key={it.item} item={it.item} amount={it.amount} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* UPGRADE */}
        <Section
          id="upgrade"
          icon="⬆️"
          title={`ตีบวก +1 → +${meta.maxLevel}`}
          sub="ลุ้นแบบมีโอกาสแตก — ยิ่งเลเวลสูง โอกาสยิ่งน้อยและทุนยิ่งแพง (เสียของทุกครั้งที่กด ไม่ว่าติดหรือแตก)"
        >
          <div className="overflow-x-auto rounded-2xl border border-sky-500/25 bg-black/50">
            <table className="w-full min-w-[520px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-sky-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">ตีบวก</th>
                  <th className="px-3 py-2.5 text-right font-medium">โอกาสสำเร็จ</th>
                  <th className="px-3 py-2.5 text-right font-medium">💰 เงิน</th>
                  <th className="px-3 py-2.5 text-right font-medium">🎣 คะแนน</th>
                  <th className="px-3 py-2.5 text-right font-medium">🎫 การันตี</th>
                </tr>
              </thead>
              <tbody>
                {upgradeTable.map((r) => {
                  const p = Math.round(r.chance * 100);
                  const pc = p >= 25 ? "text-emerald-200" : p >= 15 ? "text-amber-200" : "text-rose-200";
                  return (
                    <tr key={r.lv} className="border-t border-sky-500/10">
                      <td className="px-3 py-2.5 font-semibold text-sky-50">
                        +{r.lv} → +{r.to}
                      </td>
                      <td className={"px-3 py-2.5 text-right font-bold " + pc}>{p}%</td>
                      <td className="px-3 py-2.5 text-right font-mono text-emerald-100">{fmtNum(r.money)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-sky-100">{fmtNum(r.fscore)}</td>
                      <td className="px-3 py-2.5 text-right text-amber-200">{r.guarantee} ใบ</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* items used */}
          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <p className="mb-2 text-xs font-semibold text-sky-100">ของพื้นฐาน (ทุกขั้น)</p>
              <div className="space-y-1.5">
                {upgradeItems.base.map((it) => (
                  <CostItem key={it.item} item={it.item} formula={it.formula} />
                ))}
              </div>
            </div>
            {upgradeItems.tiers.map((t) => (
              <div key={t.range} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-sky-100">{t.label}</p>
                  <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] text-sky-200">{t.range}</span>
                </div>
                <div className="space-y-1.5">
                  {t.items.map((it) => (
                    <CostItem key={it.item} item={it.item} amount={it.amount} />
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-sky-300/50">+ ของพื้นฐานทุกขั้น</p>
              </div>
            ))}
          </div>
        </Section>

        {/* HELPERS */}
        <Section id="helpers" icon="🎴" title="บัตร & ตั๋วช่วย" sub="ตัวช่วยลดความเจ็บปวดเวลาลุ้น — เทรด/ซื้อขายในตลาดได้">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {helpers.map((h) => {
              const tone = TONES[h.tone] || TONES.sky;
              return (
                <div key={h.code} className={"rounded-2xl border p-4 " + tone.box}>
                  <div className="text-3xl">{h.emoji}</div>
                  <p className="mt-1.5 text-sm font-bold text-white">{h.name}</p>
                  <p className={"mt-1 text-xs font-semibold " + tone.text}>{h.effect}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-sky-100/65">{h.note}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* HOWTO */}
        <Section id="howto" icon="🎮" title="เริ่มยังไง">
          <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {howto.map((s, i) => (
              <li key={i} className="relative rounded-2xl border border-sky-500/25 bg-black/50 p-3.5">
                <span className="absolute right-3 top-2 text-[10px] font-bold text-sky-400/40">{i + 1}</span>
                <div className="text-2xl">{s.icon}</div>
                <p className="mt-1.5 text-sm font-semibold text-sky-100">{s.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-sky-200/70">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        <p className="mt-8 text-center text-[11px] text-sky-300/50">
          * ตัวเลขทั้งหมดอ้างอิงค่าปัจจุบันในเกม อาจปรับสมดุลได้ในอนาคต
        </p>
      </div>
    </div>
  );
}
