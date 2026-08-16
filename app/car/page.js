import {
  meta, trialNotice, cars, iconIds, onlineReward,
  bodyColors, glowColors, glowModes, headColors, smokeColors, tints,
  engineTones, hornTones, soundVols, rideSteps, looksGroups,
  tuneOptions, tunePresets,
  upgradeMeta, upgradeTracks, upgradeTiers, costPerTrackFull, costAllTracksFull,
  howto, tips,
} from "@/json/car";

export const revalidate = 3600;

export const metadata = {
  title: "รถแข่ง & แต่งรถ — Sweet Paradise Hub",
  description:
    "คู่มือรถแข่งทั้ง 4 คันในเกม พร้อมระบบแต่งรถเต็มรูปแบบ — สีตัวถัง ไฟใต้ท้อง ฟิล์ม เสียงเครื่อง ความสูงรถ ป้ายทะเบียน จูนการขับ 10 ช่อง และอัปเกรด 4 สาย สายละ 24 ขั้น",
};

const fmt = (n) => Number(n || 0).toLocaleString("en-US");

// ดึงรูปรถจริงจาก Roblox (ฝั่ง server — เลี่ยง CORS + แคช 1 ชม.)
async function fetchCarIcons() {
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

const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200" },
  rose: { box: "border-rose-400/35 bg-rose-500/[0.07]", text: "text-rose-200" },
};

function Section({ id, icon, title, sub, children }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs text-pink-200/75 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

/* แถบสีให้เห็นของจริง ไม่ต้องเดาจากชื่อ */
function Swatches({ list, ring }) {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((c) => (
        <div
          key={c.n}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 py-1 pl-1 pr-2.5"
        >
          <span
            className={"h-5 w-5 flex-shrink-0 rounded-full " + (ring ? "ring-2 ring-white/25" : "border border-white/25")}
            style={{ backgroundColor: c.hex, boxShadow: ring ? `0 0 10px ${c.hex}` : undefined }}
          />
          <span className="whitespace-nowrap text-[11px] text-pink-50">
            {c.n}
            {c.stock && <span className="ml-1 text-[10px] text-pink-300/60">(เดิม)</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function Pills({ list, render }) {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((x, i) => (
        <span key={i} className="rounded-full border border-pink-500/25 bg-black/50 px-3 py-1 text-[11px] text-pink-50">
          {render(x)}
        </span>
      ))}
    </div>
  );
}

/* ที่มาของรถ — แสดงต่างกันตามชนิด (ร้าน / คราฟ / ออนไลน์สะสม) */
function ObtainBox({ o }) {
  const tone =
    o.kind === "shop"
      ? "border-emerald-400/35 bg-emerald-500/[0.08]"
      : o.kind === "craft"
      ? "border-violet-400/35 bg-violet-500/[0.08]"
      : o.kind === "locked"
      ? "border-slate-400/30 bg-slate-500/[0.08]"
      : "border-sky-400/35 bg-sky-500/[0.08]";
  const textTone =
    o.kind === "shop"
      ? "text-emerald-100"
      : o.kind === "craft"
      ? "text-violet-100"
      : o.kind === "locked"
      ? "text-slate-200"
      : "text-sky-100";

  return (
    <div className={"rounded-xl border p-3 " + tone}>
      <p className={"text-xs font-bold " + textTone}>
        {o.icon} {o.label}
      </p>

      {o.kind === "shop" && (
        <p className="mt-1.5 flex flex-wrap items-baseline gap-1.5">
          {o.priceFull && <span className="text-[11px] text-pink-300/50 line-through">{fmt(o.priceFull)}</span>}
          <span className="text-lg font-black text-amber-200">{fmt(o.price)}</span>
          {o.minLevel && <span className="text-[10px] text-pink-200/60">· ต้อง Lv.{o.minLevel}+</span>}
        </p>
      )}

      {o.kind === "craft" && (
        <>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {o.cost.map((c) => (
              <span
                key={c.item}
                className="rounded-lg border border-violet-400/25 bg-black/40 px-2 py-1 text-[11px] text-violet-50"
              >
                {c.name} <span className="font-bold">{fmt(c.amount)}</span>
                {c.full && c.full !== c.amount && (
                  <span className="ml-1 text-[10px] text-pink-300/45 line-through">{fmt(c.full)}</span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-violet-100/90">
            โอกาสคราฟติด <span className="font-bold text-violet-50">{Math.round(o.chance * 100)}%</span>
          </p>
        </>
      )}

      {o.kind === "online" && (
        <p className="mt-1.5 text-[11px] text-sky-100/90">
          มีรถคันนี้อยู่แล้ว → รับเป็นเงินแทน{" "}
          <span className="font-bold text-amber-200">{fmt(o.altMoney)}</span>
        </p>
      )}

      {o.note && <p className="mt-1.5 text-[10px] leading-relaxed text-pink-100/70">{o.note}</p>}
      {o.warn && <p className="mt-1 text-[10px] text-rose-200/85">⚠️ {o.warn}</p>}
    </div>
  );
}

export default async function CarPage() {
  const icons = await fetchCarIcons();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🏎️ Cars & Tuning
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            รถแข่ง <span className="text-pink-300">4 คัน</span> + ระบบแต่งรถ
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-pink-100/85 md:text-sm">
            แต่งได้ตั้งแต่สีตัวถัง ไฟใต้ท้อง ฟิล์ม เสียงเครื่อง ความสูงรถ ยันป้ายทะเบียน · จูนการขับฟรี 10 ช่อง ·
            แล้วอัปเกรดเพิ่มพลังอีก 4 สาย — เปิดจาก <span className="text-pink-200">{meta.openFrom}</span>
          </p>
        </header>

        {/* ⚠️ ประกาศช่วงทดลอง */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-500/[0.09] p-4">
          <span className="text-2xl leading-none">🧪</span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-amber-100">{trialNotice.title}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-amber-100/85 md:text-xs">{trialNotice.desc}</p>
          </div>
        </div>

        {/* สรุปเร็ว */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: "🚗", t: `${cars.length} คัน`, d: "แต่งแยกกันได้ทุกคัน ค่าที่แต่งไม่ปนกัน" },
            { icon: "🎨", t: `${looksGroups.length} หมวดแต่งสวย`, d: `ค่าเข้าอู่ ${fmt(meta.paintCost)} ต่อการบันทึกที่มีของเปลี่ยน` },
            { icon: "🔧", t: `จูน ${tuneOptions.length} ช่อง`, d: "ฟรี ไม่เสียเงิน ปรับกี่รอบก็ได้" },
            { icon: "⬆️", t: `อัป ${upgradeTracks.length} สาย × ${upgradeMeta.maxLevel} ขั้น`, d: "อัปติดแน่นอน 100% ไม่ใช่การพนัน" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3.5">
              <div className="text-2xl">{f.icon}</div>
              <p className="mt-1.5 text-sm font-bold text-pink-50">{f.t}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-pink-200/70">{f.d}</p>
            </div>
          ))}
        </div>

        {/* ===== รถ 4 คัน ===== */}
        <Section id="cars" icon="🚗" title={`รถทั้ง ${cars.length} คัน`} sub="ทุกคันแต่ง/จูน/อัปเกรดได้เหมือนกัน ต่างกันที่ขนาดตัวถังและชิ้นส่วนที่รองรับ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cars.map((c) => {
              const img = icons[String(c.iconId)];
              return (
                <article key={c.key} className="overflow-hidden rounded-2xl border border-pink-500/25 bg-black/60">
                  <div className="flex gap-4 p-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-pink-500/20 bg-gradient-to-br from-sky-500/15 to-fuchsia-500/15">
                      {img ? (
                        <img src={img} alt={c.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl">{c.emoji}</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-white">
                        {c.emoji} {c.name}
                      </h3>
                      <p className="text-[11px] text-pink-300/70">{c.fullName}</p>
                      <p className="mt-1 text-xs text-pink-100/85">{c.tagline}</p>
                    </div>
                  </div>

                  <div className="px-4 pb-3">
                    <ObtainBox o={c.obtain} />
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-pink-500/15 p-3">
                    {[
                      { k: "head", label: "🔦 ไฟหน้า" },
                      { k: "smoke", label: "💨 ควันยาง" },
                      { k: "ex", label: "🔥 ไฟท่อ" },
                      { k: "tint", label: "🪟 ฟิล์ม" },
                      { k: "horn", label: "📣 แตร" },
                    ].map((f) => (
                      <span
                        key={f.k}
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] " +
                          (c.fx[f.k]
                            ? "bg-emerald-500/15 text-emerald-200"
                            : "bg-rose-500/15 text-rose-300 line-through")
                        }
                      >
                        {f.label}
                      </span>
                    ))}
                  </div>
                  {c.fxNote && <p className="px-3 pb-3 text-[10px] text-rose-200/80">⚠️ {c.fxNote}</p>}
                </article>
              );
            })}
          </div>
          {/* กติกาออนไลน์สะสม (ทางได้รถดริฟต์/รถบิน) */}
          <div className="mt-4 rounded-2xl border border-sky-400/30 bg-sky-500/[0.07] p-4">
            <p className="text-sm font-bold text-sky-100">
              {onlineReward.appEmoji} {cars.filter((c) => c.obtain.kind === "online").map((c) => c.name).join(" · ")} ได้จาก
              “{onlineReward.appName}” — กติกาสั้น ๆ
            </p>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {onlineReward.rules.map((r) => (
                <li key={r} className="text-[11px] leading-relaxed text-sky-100/85">
                  • {r}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-sky-200/70">เปิดจาก {onlineReward.openFrom}</p>
            <p className="mt-1.5 rounded-lg bg-black/40 p-2 text-[11px] text-amber-100">
              ⏳ จำนวนชั่วโมงของแต่ละด่านยังปรับจูนอยู่ — ดูเวลาที่ต้องใช้จริงในแอพ (หน้าเว็บไม่ระบุไว้ กันข้อมูลคลาดเคลื่อน)
            </p>
          </div>
        </Section>

        {/* ===== วิธีเล่น ===== */}
        <Section id="howto" icon="🧭" title="เริ่มยังไง (5 ขั้นตอน)">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {howto.map((s) => (
              <div key={s.step} className="rounded-xl border border-pink-500/15 bg-black/40 p-3">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[10px] font-bold text-black">
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

        {/* ===== แต่งหน้าตา ===== */}
        <Section
          id="looks"
          icon="🎨"
          title="แต่งหน้าตา (ของสวย)"
          sub={`มี ${looksGroups.length} หมวด · คิดค่าเข้าอู่ ${fmt(meta.paintCost)} ต่อการกดบันทึก 1 ครั้งที่มีอะไรเปลี่ยนจริง`}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {looksGroups.map((g) => (
              <div key={g.name} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3.5">
                <p className="text-sm font-bold text-pink-50">
                  {g.icon} {g.name}{" "}
                  <span className="text-[11px] font-normal text-pink-300/70">· {g.count} แบบ</span>
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-pink-200/70">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4 rounded-2xl border border-pink-500/20 bg-black/50 p-4">
            <div>
              <p className="mb-2 text-xs font-semibold text-pink-50">🎨 สีตัวถัง ({bodyColors.length} สีสำเร็จรูป)</p>
              <Swatches list={bodyColors} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-pink-50">💡 สีไฟใต้ท้อง / ไฟล้อ / ไฟท่อ ({glowColors.length} สี)</p>
              <Swatches list={glowColors} ring />
              <div className="mt-2 flex flex-wrap gap-2">
                {glowModes.map((m) => (
                  <span key={m.key} className="rounded-full border border-pink-500/25 bg-black/50 px-3 py-1 text-[11px] text-pink-50">
                    {m.n} <span className="text-pink-300/60">— {m.d}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">🔦 สีไฟหน้า ({headColors.length})</p>
                <Swatches list={headColors} ring />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">💨 สีควันยาง ({smokeColors.length})</p>
                <Swatches list={smokeColors} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">🪟 ฟิล์มกรองแสง</p>
                <Pills list={tints} render={(x) => x.n} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">📐 ความสูงรถ</p>
                <Pills list={rideSteps} render={(x) => x.n} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">🔊 โทนเสียงเครื่อง / แตร</p>
                <Pills list={[...engineTones, ...hornTones.slice(1)]} render={(x) => x.n} />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-pink-50">🔇 ความดัง (รถ · ท่อ แยกกัน)</p>
                <Pills list={soundVols} render={(x) => x.n} />
              </div>
            </div>
            <p className="rounded-xl border border-emerald-400/25 bg-emerald-500/[0.07] p-2.5 text-[11px] text-emerald-100">
              🌈 ไม่ถูกใจสีสำเร็จรูป? ทุกช่องสีมีแถบเลื่อนผสมเอง (สี/ความสด/ความสว่าง) เลือกได้ 16.7 ล้านสี
            </p>
          </div>
        </Section>

        {/* ===== จูน ===== */}
        <Section
          id="tune"
          icon="🔧"
          title={`จูนการขับ ${tuneOptions.length} ช่อง (ฟรี)`}
          sub="ทุกช่องเป็นได้อย่างเสียอย่าง — ไม่มีช่องไหนเพิ่มพลังฟรี ๆ · ปรับเสร็จลงจากรถแล้วขึ้นใหม่ = มีผลทันที"
        >
          <div className="mb-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {tunePresets.map((p) => (
              <div key={p.key} className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/[0.07] p-3">
                <p className="text-sm font-bold text-fuchsia-100">
                  {p.icon} {p.n}
                </p>
                <p className="mt-0.5 text-[11px] text-fuchsia-200/75">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="mb-3 text-[11px] text-pink-200/70">
            ↑ กดชุดสำเร็จรูปทีเดียวได้ครบทุกช่อง แล้วค่อยแก้ทีละช่องต่อได้
          </p>

          <div className="overflow-x-auto rounded-2xl border border-pink-500/25">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-pink-500/10 text-[11px] uppercase tracking-wide text-pink-200/80">
                <tr>
                  <th className="px-3 py-2">ช่องจูน</th>
                  <th className="px-3 py-2">ตัวเลือก (ซ้าย → ขวา)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-500/10">
                {tuneOptions.map((t) => (
                  <tr key={t.key} className="bg-black/40 align-top">
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <p className="font-semibold text-pink-50">
                        {t.icon} {t.n}
                      </p>
                      <p className="text-[10px] text-pink-200/60">{t.d}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {t.opts.map((o, i) => (
                          <span
                            key={o.n}
                            className={
                              "rounded-lg border px-2 py-1 text-[11px] " +
                              (i + 1 === t.def
                                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                                : "border-pink-500/20 bg-black/50 text-pink-100")
                            }
                          >
                            <span className="font-medium">{o.n}</span>
                            <span className="text-pink-300/60"> — {o.d}</span>
                            {i + 1 === t.def && <span className="ml-1 text-[9px] text-emerald-300/80">ค่าเริ่มต้น</span>}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== อัปเกรด ===== */}
        <Section
          id="upgrade"
          icon="⬆️"
          title={`อัปเกรด ${upgradeTracks.length} สาย สายละ ${upgradeMeta.maxLevel} ขั้น`}
          sub="ตัวเพิ่มพลังจริง (เสียเงิน) — อัปติดแน่นอน 100% ทุกขั้น ไม่มีพลาด ไม่ใช่การพนัน"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {upgradeTracks.map((t) => (
              <div key={t.key} className="rounded-2xl border border-sky-400/30 bg-sky-500/[0.07] p-4">
                <p className="text-2xl">{t.icon}</p>
                <p className="mt-1 text-sm font-bold text-sky-50">{t.name}</p>
                <p className="mt-0.5 text-[11px] text-sky-200/75">{t.desc}</p>
                <p className="mt-2 inline-block rounded-full bg-sky-500/20 px-2 py-0.5 text-[11px] font-semibold text-sky-100">
                  อัปครบ 24 ขั้น = {t.maxGainText}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="overflow-x-auto rounded-2xl border border-pink-500/25">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-pink-500/10 text-[11px] uppercase tracking-wide text-pink-200/80">
                  <tr>
                    <th className="px-3 py-2">ช่วง</th>
                    <th className="px-3 py-2">ขั้นที่</th>
                    <th className="px-3 py-2 text-right">ราคา/ขั้น</th>
                    <th className="px-3 py-2 text-right">รวมช่วงนี้</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-500/10">
                  {upgradeTiers.map((t) => (
                    <tr key={t.tier} className="bg-black/40">
                      <td className="px-3 py-2 font-semibold text-pink-50">ช่วง {t.tier}</td>
                      <td className="px-3 py-2 text-pink-100/85">{t.levels}</td>
                      <td className="px-3 py-2 text-right font-mono text-amber-200">{fmt(t.perStep)}</td>
                      <td className="px-3 py-2 text-right font-mono text-pink-200/80">{fmt(t.perStep * 4)}</td>
                    </tr>
                  ))}
                  <tr className="bg-pink-500/10">
                    <td className="px-3 py-2 font-bold text-pink-50" colSpan={3}>
                      รวมอัปสายเดียวจนสุด (24 ขั้น)
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-bold text-emerald-300">{fmt(costPerTrackFull)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.07] p-4">
              <p className="text-xs font-semibold text-amber-100">💰 อัปครบทั้ง 4 สาย (1 คัน)</p>
              <p className="mt-1 text-2xl font-black text-amber-200">{fmt(costAllTracksFull)}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-amber-100/80">
                ยิ่งขั้นสูงยิ่งแพงขึ้นเป็นช่วง ๆ (ช่วงละ 4 ขั้น) · ค่าที่อัปแล้วเก็บถาวรแยกรายคัน
              </p>
              <p className="mt-2 rounded-lg bg-black/40 p-2 text-[11px] text-amber-100">
                ♻️ {upgradeMeta.note}
              </p>
            </div>
          </div>
        </Section>

        {/* ===== ข้อควรรู้ ===== */}
        <Section id="tips" icon="💡" title="ข้อควรรู้ (อ่านก่อนเสียเงินฟรี)">
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

        <p className="mt-8 text-center text-[11px] text-pink-300/50">
          ข้อมูลทั้งหมดคัดลอกจาก config จริงในเกม (CarCustomConfig / CarUpgradeConfig / ShopConfig)
        </p>
      </div>
    </div>
  );
}
