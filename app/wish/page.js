import {
  meta,
  appTabs,
  cards,
  rewards,
  KIND_META,
  totalWeight,
  rewardPct,
  categories,
  rainbowFish,
  howto,
  rules,
  facts,
  redeemCombos,
  bestCombo,
  comboText,
  logging,
  iconIds,
  petPasses,
} from "@/json/wish";
import { robuxItems } from "@/json/robuxshop";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const revalidate = 3600;

export const metadata = {
  title: "ระบบขอพร — Sweet Paradise Hub",
  description:
    "คู่มือแอพขอพร (Wish App) — รีลกาชา 25 รางวัลพร้อมอัตราออกจริง, 8 หมวดของเลือกได้, บัตรอธิษฐาน/บัตรขอพร/บัตร Happy Birthday และตารางแลกเกมพาสด้วยบัตร",
};

/* ดึงรูปจริงจาก Roblox ฝั่ง server (เลี่ยง CORS + แคช 1 ชม.) */
async function fetchThumbs(url) {
  const map = {};
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    const j = await r.json();
    for (const d of j.data || []) {
      if (d.state === "Completed" && d.imageUrl) map[String(d.targetId)] = d.imageUrl;
    }
  } catch {
    /* ปล่อยว่าง → fallback เป็น emoji */
  }
  return map;
}

/* ของที่แลกด้วยบัตรได้ = Config.shopItems (เกมพาส + ลิมิเต็ด) + สัตว์เลี้ยง dev-product (404Demon) */
const passes = [
  ...robuxItems.filter((i) => (i.cat === "gamepass" || i.cat === "limited") && i.pid),
  ...petPasses,
].sort((a, b) => a.price - b.price);

const TOTAL_W = totalWeight();

/* โทนสี (เขียนเต็มคลาส — Tailwind ต้องเห็นชื่อคลาสตรง ๆ) */
const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200", chip: "bg-emerald-500/20 text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200", chip: "bg-sky-500/20 text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200", chip: "bg-amber-500/20 text-amber-200" },
  fuchsia: { box: "border-fuchsia-400/35 bg-fuchsia-500/[0.07]", text: "text-fuchsia-200", chip: "bg-fuchsia-500/20 text-fuchsia-200" },
};

function Section({ id, icon, title, sub, children }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mb-3 mt-1 text-xs leading-relaxed text-violet-200/70 md:text-sm">{sub}</p>}
      <div className={sub ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

/* ===== การ์ดบัตร 1 ใบ ===== */
function CardTile({ c, img }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border bg-black/60"
      style={{ borderColor: `${c.color}55` }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `${c.color}33` }}
      />

      <div
        className="relative flex h-36 items-center justify-center"
        style={{ background: `radial-gradient(circle at 50% 60%, ${c.color}30, transparent 70%)` }}
      >
        {img ? (
          <img
            src={img}
            alt={c.name}
            className="h-28 w-28 object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-6xl">{c.emoji}</span>
        )}
        <span
          className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold"
          style={{ borderColor: `${c.color}88`, background: "rgba(0,0,0,0.55)", color: c.color }}
        >
          {c.role}
        </span>
        {c.robux && (
          <span className="absolute right-3 top-3 rounded-full border border-amber-300/70 bg-black/60 px-2 py-0.5 text-[10px] font-bold text-amber-200">
            มูลค่า {fmtNum(c.robux)}R
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4 pt-3">
        <h3 className="flex items-center gap-1.5 text-base font-bold" style={{ color: c.color }}>
          <span>{c.emoji}</span>
          {c.name}
        </h3>
        <p className="mt-0.5 font-mono text-[10px] text-white/35">{c.code}</p>

        <p className="mt-2 rounded-xl bg-white/[0.04] px-2.5 py-2 text-[11px] font-semibold leading-relaxed text-white">
          {c.short}
        </p>
        <p className="mt-2 flex-1 text-[11px] leading-relaxed text-violet-100/70">{c.detail}</p>

        <div className="mt-3 border-t border-white/10 pt-2.5">
          <p className="mb-1 text-[10px] font-medium text-white/40">ได้มาจาก</p>
          <ul className="space-y-1">
            {c.obtain.map((o) => (
              <li key={o} className="flex items-start gap-1.5 text-[11px] text-violet-100/85">
                <span style={{ color: c.color }}>•</span>
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-2 rounded-lg bg-rose-500/10 px-2 py-1 text-[10px] leading-relaxed text-rose-200/80">
            ✕ {c.cantDo}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ===== แถวรางวัล 1 ช่อง ===== */
function RewardRow({ r, img, rank }) {
  const pct = rewardPct(r.weight);
  const kind = KIND_META[r.kind];
  const cat = r.kind === "choose" ? categories.find((c) => c.key === r.cat) : null;

  return (
    <tr className="border-t border-violet-500/10 transition hover:bg-white/[0.03]">
      <td className="px-2 py-2.5 text-center font-mono text-[11px] text-white/30">{rank}</td>
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg"
            style={{ background: `${r.color}22` }}
          >
            {img ? (
              <img src={img} alt={r.label} className="h-full w-full object-contain" />
            ) : (
              <span className="text-lg">{r.emoji}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-tight" style={{ color: r.color }}>
              {r.label}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-white/40">
              {r.kind === "money" && `เงินเข้าทันที ${fmtNum(r.amount)}`}
              {r.kind === "farm" && `ไอเทมฟาร์ม → เข้ากระเป๋า ×${r.amount}`}
              {r.kind === "choose" && `เลือกเองได้ 1 ชิ้นจาก ${cat ? (cat.items?.length ?? rainbowFish.length) : "?"} ชิ้น`}
              {r.kind === "wishcard" && "บัตรขอพร 1 ใบ (มูลค่า 500R)"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 py-2.5">
        <span className={"inline-block rounded-full px-2 py-0.5 text-[10px] font-medium " + TONES[kind.tone].chip}>
          {kind.emoji} {kind.label}
        </span>
      </td>
      <td className="px-2 py-2.5 text-right font-mono text-[11px] text-white/45">{fmtNum(r.weight)}</td>
      <td className="px-2 py-2.5">
        <div className="flex items-center justify-end gap-2">
          <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/10 sm:block">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(1.5, (pct / rewardPct(rewards[0].weight)) * 100)}%`, background: r.color }}
            />
          </div>
          <span className="w-14 text-right font-mono text-[12px] font-bold" style={{ color: r.color }}>
            {pct.toFixed(2)}%
          </span>
        </div>
      </td>
    </tr>
  );
}

/* ===== ของในหมวด 1 ชิ้น ===== */
function CatItem({ code }) {
  const a = resolveAsset(code);
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-2 text-center transition hover:border-white/25 hover:bg-white/[0.06]">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-12 w-12 rounded-lg" />
      <span className="line-clamp-2 text-[10px] leading-tight text-violet-50/85">{a.label}</span>
    </div>
  );
}

function FishItem({ f }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-sky-400/15 bg-sky-500/[0.04] px-2.5 py-2 transition hover:border-sky-400/40">
      <span className="text-lg">{f.event ? "🎉" : "🐟"}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-sky-50">{f.name}</p>
        <p className="text-[10px] text-sky-200/50">
          {fmtNum(f.price)} · {fmtNum(f.score)} คะแนน
          {f.event && <span className="ml-1 text-amber-300/80">• ปลาอีเวนต์</span>}
          {f.unlock && <span className="ml-1 text-fuchsia-300/80">• ปลดล็อก {f.unlock}</span>}
        </p>
      </div>
      <span className="flex-shrink-0 font-mono text-[10px] text-sky-300/40">#{f.id}</span>
    </div>
  );
}

export default async function WishPage() {
  const [assetIcons, passIcons] = await Promise.all([
    fetchThumbs(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${iconIds.join(",")}&size=150x150&format=Png&isCircular=false`
    ),
    fetchThumbs(
      `https://thumbnails.roblox.com/v1/game-passes?gamePassIds=${passes
        .filter((p) => p.pid)
        .map((p) => p.pid)
        .join(",")}&size=150x150&format=Png`
    ),
  ]);

  const chooseCount = rewards.filter((r) => r.kind === "choose").reduce((s, r) => s + r.weight, 0);
  const totalPickable =
    categories.reduce((s, c) => s + (c.items?.length ?? 0), 0) + rainbowFish.length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-violet-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#12101c] to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== HERO ===== */}
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
            🎫 Wish App • ระบบใหม่
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-200 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-5xl">
            ระบบขอพร
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-violet-100/80 md:text-sm">
            แอพในโทรศัพท์ที่ให้คุณ <b className="text-white">หมุนรีลกาชา</b> ด้วยเงินในเกม —
            บางช่องได้ของทันที บางช่องให้ <b className="text-amber-200">สิทธิ์เลือกของเอง</b> และช่องที่หายากที่สุดคือ{" "}
            <b className="text-fuchsia-200">บัตรขอพร</b> ที่สะสมไป
            <b className="text-white"> แลกเป็นเกมพาสจริง</b> ได้โดยไม่ต้องจ่ายโรบัค
          </p>

          <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { v: `${rewards.length} ช่อง`, l: "รางวัลในรีล" },
              { v: fmtNum(meta.costMoney), l: "ค่าหมุน / ครั้ง" },
              { v: `${categories.length} หมวด`, l: `ของเลือกได้ ${totalPickable} ชิ้น` },
              { v: `${passes.length} ชิ้น`, l: "แลกด้วยบัตรได้" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-violet-500/25 bg-black/50 px-3 py-2.5">
                <p className="text-sm font-bold text-violet-100">{s.v}</p>
                <p className="text-[10px] text-violet-300/70">{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ===== FACTS ===== */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-2xl">{f.icon}</div>
              <p className="mt-1.5 text-sm font-bold text-white">{f.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-violet-200/70">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== วิธีเล่น ===== */}
        <Section
          id="howto"
          icon="📖"
          title="เล่นยังไง — 5 ขั้นตอน"
          sub="ทั้งระบบอยู่ในแอพเดียว เปิดจากโทรศัพท์ ไม่ต้องเดินไปหา NPC ที่ไหน"
        >
          <div className="space-y-2.5">
            {howto.map((h) => (
              <div
                key={h.step}
                className="flex items-start gap-3.5 rounded-2xl border border-violet-500/20 bg-black/40 p-3.5 transition hover:border-violet-400/40"
              >
                <div className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/15">
                  <span className="text-lg leading-none">{h.icon}</span>
                  <span className="mt-0.5 text-[9px] font-bold text-violet-300/70">STEP {h.step}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white">{h.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-violet-100/70 md:text-xs">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* แท็บในแอพ */}
          <div className="mt-4 rounded-2xl border border-violet-500/25 bg-black/50 p-4">
            <p className="mb-3 text-xs font-bold text-violet-200">🗂️ ในแอพมี {appTabs.length} แท็บ</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {appTabs.map((t) => (
                <div key={t.id} className="rounded-xl bg-white/[0.03] p-2.5">
                  <p className="text-[12px] font-bold text-white">{t.label}</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-violet-200/60">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== บัตร 3 ใบ ===== */}
        <Section
          id="cards"
          icon="🎴"
          title="บัตรทั้ง 3 ใบ"
          sub="ทั้ง 3 ใบเป็นไอเทมฟาร์มแบบนับจำนวน — เก็บในกระเป๋า เทรดกับเพื่อนและฝากขายในตลาดได้ · ชื่อคนละใบ ทำคนละหน้าที่ อย่าสับสน"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((c) => (
              <CardTile key={c.code} c={c} img={assetIcons[String(c.iconId)]} />
            ))}
          </div>

          {/* ตารางเทียบบัตร */}
          <div className="mt-4 overflow-x-auto rounded-2xl border border-violet-500/25 bg-black/50">
            <table className="w-full min-w-[600px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-violet-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">ความสามารถ</th>
                  {cards.map((c) => (
                    <th key={c.code} className="px-3 py-2.5 text-center font-medium">
                      <span style={{ color: c.color }}>
                        {c.emoji} {c.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "🎡 ใช้หมุนรีลแทนเงิน 1M", v: ["✅", "✕", "✕"] },
                  { label: "🎁 เลือกของ 1 ชิ้น (ทุกหมวด)", v: ["✕", "✅", "✅"] },
                  { label: "🎟️ ใช้แลกเกมพาส", v: ["✕", "500R", "1,500R"] },
                  { label: "💰 ซื้อด้วยเงินในเกม", v: ["✕", `${fmtNum(meta.wishCardPrice)}`, "✕"] },
                  { label: "🎲 สุ่มได้จากรีล", v: ["✕", "✅ 0.24%", "✕"] },
                  { label: "🤝 เทรด / ฝากขายตลาด", v: ["✅", "✅", "✅"] },
                ].map((row) => (
                  <tr key={row.label} className="border-t border-violet-500/10">
                    <td className="px-3 py-2.5 text-[11px] text-violet-100/85 md:text-xs">{row.label}</td>
                    {row.v.map((cell, i) => (
                      <td
                        key={i}
                        className={
                          "px-3 py-2.5 text-center font-mono text-[11px] font-semibold md:text-xs " +
                          (cell === "✕" ? "text-white/20" : cell === "✅" ? "text-emerald-300" : "text-amber-200")
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== ตารางรางวัล ===== */}
        <Section
          id="rewards"
          icon="🎡"
          title={`รางวัลทั้ง ${rewards.length} ช่อง + อัตราออกจริง`}
          sub={`% คำนวณจากน้ำหนักหารด้วยน้ำหนักรวม ${fmtNum(TOTAL_W)} · ยิ่งน้ำหนักน้อยยิ่งออกยาก`}
        >
          <div className="overflow-x-auto rounded-2xl border border-violet-500/25 bg-black/50">
            <table className="w-full min-w-[640px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-violet-200/80">
                  <th className="px-2 py-2.5 text-center font-medium">#</th>
                  <th className="px-2 py-2.5 text-left font-medium">รางวัล</th>
                  <th className="px-2 py-2.5 text-left font-medium">ชนิด</th>
                  <th className="px-2 py-2.5 text-right font-medium">น้ำหนัก</th>
                  <th className="px-2 py-2.5 text-right font-medium">โอกาสออก</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((r, i) => (
                  <RewardRow key={r.key} r={r} rank={i + 1} img={assetIcons[String(r.iconId)]} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className={"rounded-2xl border p-3 " + TONES.amber.box}>
              <p className="text-[11px] text-white/50">โอกาสได้ช่อง “เลือกได้”</p>
              <p className={"mt-0.5 text-lg font-black " + TONES.amber.text}>
                {((chooseCount / TOTAL_W) * 100).toFixed(2)}%
              </p>
              <p className="mt-0.5 text-[10px] text-white/40">รวมทั้ง {categories.length} หมวด · มีของให้เลือก {totalPickable} ชิ้น</p>
            </div>
            <div className={"rounded-2xl border p-3 " + TONES.fuchsia.box}>
              <p className="text-[11px] text-white/50">โอกาสได้บัตรขอพร (ช่องหายากสุด)</p>
              <p className={"mt-0.5 text-lg font-black " + TONES.fuchsia.text}>
                {rewardPct(22).toFixed(2)}%
              </p>
              <p className="mt-0.5 text-[10px] text-white/40">ช่องหายากที่สุดในรีล · น้ำหนัก 22 จาก {fmtNum(TOTAL_W)}</p>
            </div>
            <div className={"rounded-2xl border p-3 " + TONES.sky.box}>
              <p className="text-[11px] text-white/50">ซื้อบัตรขอพรตรง ๆ ในแอพ</p>
              <p className={"mt-0.5 text-lg font-black " + TONES.sky.text}>{fmtNum(meta.wishCardPrice)}</p>
              <p className="mt-0.5 text-[10px] text-white/40">ไม่ต้องพึ่งดวง — มีเงินพอก็ซื้อได้เลย</p>
            </div>
          </div>
        </Section>

        {/* ===== 8 หมวดของเลือกได้ ===== */}
        <Section
          id="categories"
          icon="🎁"
          title={`${categories.length} หมวด “ของเลือกได้” — รวม ${totalPickable} ชิ้น`}
          sub="สุ่มติดช่องเลือกได้ = ได้สิทธิ์เลือกเอง 1 ชิ้นในหมวดนั้น (หรือใช้บัตรขอพร/บัตร HBD เลือกหมวดไหนก็ได้) · กดที่หัวข้อเพื่อกาง/พับรายชื่อ"
        >
          <div className="space-y-2.5">
            {categories.map((c) => {
              const count = c.items?.length ?? rainbowFish.length;
              const rw = rewards.find((r) => r.cat === c.key);
              return (
                <details
                  key={c.key}
                  className="group overflow-hidden rounded-2xl border bg-black/40"
                  style={{ borderColor: `${c.color}40` }}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-3.5 transition hover:bg-white/[0.03]">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                      style={{ background: `${c.color}22` }}
                    >
                      {c.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-sm font-bold" style={{ color: c.color }}>
                        {c.label}
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70">
                          {count} ชิ้น
                        </span>
                        {c.dup ? (
                          <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-medium text-sky-200">
                            เลือกซ้ำได้
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/45">
                            ห้ามซ้ำ
                          </span>
                        )}
                        {rw && (
                          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-200">
                            สุ่มติด {rewardPct(rw.weight).toFixed(2)}%
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-white/50">{c.note}</p>
                    </div>
                    <span className="flex-shrink-0 text-[11px] text-white/30 transition group-open:rotate-180">▾</span>
                  </summary>

                  <div className="border-t px-3.5 pb-3.5 pt-3" style={{ borderColor: `${c.color}25` }}>
                    <p className="mb-2.5 text-[10px] text-white/40">
                      📥 วิธีได้: {c.grantDesc}
                      {!c.dup && ` · มีครบทั้ง ${count} ชิ้นแล้ว → สุ่มติดหมวดนี้จะได้เงิน ${fmtNum(meta.allOwnedMoney)} แทน`}
                    </p>
                    {c.key === "fish" ? (
                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                        {rainbowFish.map((f) => (
                          <FishItem key={f.id} f={f} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-8">
                        {c.items.map((code) => (
                          <CatItem key={code} code={code} />
                        ))}
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </Section>

        {/* ===== แลกเกมพาส ===== */}
        <Section
          id="redeem"
          icon="🎟️"
          title="แลกเกมพาสด้วยบัตร"
          sub={`บัตรขอพร 1 ใบ = ${meta.wishCardValue}R · บัตร Happy Birthday 1 ใบ = ${fmtNum(meta.hbdValue)}R — ผสมกันได้ ใช้แลกได้ครบทั้ง ${passes.length} ชิ้น (เกมพาส + ลิมิเต็ด + เพ็ท 404 เดมอน) โดยไม่ใช้โรบัคจริง`}
        >
          {/* กติกา */}
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "รวมมูลค่าต้องถึง", d: "500×บัตรขอพร + 1,500×HBD ต้อง ≥ ราคาพาส" },
              { n: "2", t: "ไม่มีทอน", d: "ส่วนที่เกินราคาพาสจะหายไป ไม่คืนเป็นอะไรทั้งนั้น" },
              { n: "3", t: "ห้ามใส่เกินจำเป็น", d: "ถ้าเอาบัตรออก 1 ใบแล้วยังพอ = ระบบไม่ให้ยืนยัน" },
              { n: "4", t: "1 ครั้ง = 1 พาส", d: "และต้องยังไม่เป็นเจ้าของพาสนั้น" },
            ].map((r) => (
              <div key={r.n} className="rounded-2xl border border-amber-400/25 bg-amber-500/[0.05] p-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400/20 text-[11px] font-black text-amber-200">
                  {r.n}
                </span>
                <p className="mt-1.5 text-[12px] font-bold text-amber-100">{r.t}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-amber-200/60">{r.d}</p>
              </div>
            ))}
          </div>

          {/* ตัวอย่าง */}
          <div className="mt-3 rounded-2xl border border-violet-500/25 bg-black/50 p-4">
            <p className="mb-2.5 text-xs font-bold text-violet-200">🧮 ตัวอย่างการคิด — พาสราคา 4,900R</p>
            <div className="flex flex-wrap gap-2">
              {redeemCombos(4900).slice(0, 4).map((c, i) => (
                <div
                  key={i}
                  className={
                    "rounded-xl border px-3 py-2 " +
                    (i === 0 ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10 bg-white/[0.03]")
                  }
                >
                  <p className={"font-mono text-[12px] font-bold " + (i === 0 ? "text-emerald-200" : "text-white/70")}>
                    {comboText(c)}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/40">
                    = {fmtNum(c.total)}R{" "}
                    {c.waste > 0 ? `(ทิ้ง ${fmtNum(c.waste)}R)` : "(พอดีเป๊ะ)"}
                    {i === 0 && " ✓ คุ้มสุด"}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-2.5 text-[10px] leading-relaxed text-white/40">
              🎂 HBD×4 = 6,000R ก็แลกได้เหมือนกัน แต่ทิ้งมูลค่าไปถึง 1,100R — แอพจะแนะนำ combo ที่ประหยัดที่สุดให้อัตโนมัติ
              แต่คุณกดเลือกจำนวนบัตรเองได้ทั้งหมด
            </p>
          </div>

          {/* ตารางพาส */}
          <div className="mt-3 overflow-x-auto rounded-2xl border border-violet-500/25 bg-black/50">
            <table className="w-full min-w-[620px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-violet-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">เกมพาส</th>
                  <th className="px-3 py-2.5 text-left font-medium">หมวด</th>
                  <th className="px-3 py-2.5 text-right font-medium">ราคา</th>
                  <th className="px-3 py-2.5 text-right font-medium">บัตรที่ต้องใช้ (คุ้มสุด)</th>
                  <th className="px-3 py-2.5 text-right font-medium">ทิ้งมูลค่า</th>
                </tr>
              </thead>
              <tbody>
                {passes.map((p) => {
                  const c = bestCombo(p.price);
                  const alt = redeemCombos(p.price).length;
                  const icon = p.pid ? passIcons[String(p.pid)] : assetIcons[String(p.iconId)];
                  return (
                    <tr key={p.id} className="border-t border-violet-500/10 transition hover:bg-white/[0.03]">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-white/5">
                            {icon ? (
                              <img src={icon} alt={p.name} className="h-full w-full object-cover" />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-sm">🎟️</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[12px] font-semibold text-white">{p.name}</p>
                            <p className="truncate text-[10px] text-white/35">{p.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={
                            "inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium " +
                            (p.cat === "pet"
                              ? TONES.emerald.chip
                              : p.cat === "limited"
                                ? TONES.fuchsia.chip
                                : TONES.sky.chip)
                          }
                        >
                          {p.cat === "pet" ? "🐾 สัตว์เลี้ยง" : p.cat === "limited" ? "💎 ลิมิเต็ด" : "🎟️ เกมพาส"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[12px] font-semibold text-amber-200">
                        {fmtNum(p.price)}R
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <span className="font-mono text-[12px] font-bold text-violet-100">{comboText(c)}</span>
                        {alt > 1 && (
                          <span className="ml-1.5 text-[10px] text-white/30">(อีก {alt - 1} แบบ)</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[11px]">
                        {c && c.waste > 0 ? (
                          <span className="text-rose-300/70">−{fmtNum(c.waste)}R</span>
                        ) : (
                          <span className="text-emerald-300/80">พอดี</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* กรณีพิเศษ: เพ็ท dev-product */}
          <div className="mt-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-200">
              🐾 กรณีพิเศษ — เพ็ทที่แลกด้วยบัตรได้
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-emerald-100/70 md:text-xs">
              <b className="text-white">👹 404 เดมอน</b> ไม่ใช่เกมพาส แต่เป็น{" "}
              <b className="text-emerald-200">Developer Product</b> (ปกติซื้อ 4,999R เท่านั้น) — เจ้าของเปิดให้แลกด้วยบัตรได้เป็นกรณีพิเศษ
              จึงโผล่อยู่ในลิสต์แลกพาสด้วย ระบบเช็ก “มีเพ็ทนี้แล้วหรือยัง” และแจกผ่านระบบสัตว์เลี้ยงคนละทางกับเกมพาส —
              ถ้าแจกไม่สำเร็จหรือมีอยู่แล้ว <b className="text-white">บัตรจะไม่ถูกหัก</b>
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-emerald-100/55">
              ส่วน <b className="text-emerald-200/90">👾 แฮคเกอร์ (Haxigator)</b> เป็น Developer Product เหมือนกัน แต่{" "}
              <b className="text-white">ไม่อยู่ในลิสต์นี้</b> เพราะเลือกได้ฟรีอยู่แล้วในหมวด 🐾 สัตว์เลี้ยง (ไม่ต้องเปลืองบัตรแลก)
            </p>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-white/35">
            * ราคาที่ใช้คำนวณคือราคาในระบบเกม (Config.shopItems / PetConfig) ไม่ใช่ราคาขายสดบน Roblox —
            ถ้าเจ้าของลดราคาพาสในหน้า Roblox ระบบแลกบัตรยังคิดตามราคานี้เสมอ · เกมพาสแบบลิมิเต็ดที่แถมไอเทมในตัว
            จะได้ไอเทมนั้นมาด้วยอัตโนมัติ
          </p>
        </Section>

        {/* ===== กฎ ===== */}
        <Section id="rules" icon="⚖️" title="กฎ & ระบบกันโกง" sub="สิ่งที่ควรรู้ก่อนเสียเงิน 1 ล้าน">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {rules.map((r) => {
              const t = TONES[r.tone];
              return (
                <div key={r.title} className={"rounded-2xl border p-4 " + t.box}>
                  <p className={"flex items-center gap-2 text-sm font-bold " + t.text}>
                    <span>{r.icon}</span>
                    {r.title}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/65 md:text-xs">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ===== log ===== */}
        <Section
          id="log"
          icon="📜"
          title="ประวัติ & การบันทึก"
          sub="ทุกการกระทำในแอพถูกบันทึกไว้หมด — ทั้งของคุณเองและของแอดมิน"
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-violet-500/25 bg-black/50 p-4">
              <p className="text-sm font-bold text-white">📱 ประวัติของคุณ</p>
              <p className="mt-1 text-[11px] leading-relaxed text-violet-200/70">
                แท็บ 📜 ประวัติ ในแอพ เก็บผลหมุนล่าสุด <b className="text-white">{meta.myLogCap} ครั้ง</b> พร้อมบอกว่าครั้งนั้นจ่ายด้วย
                เงินหรือบัตรอธิษฐาน · เก็บถาวรข้ามเซิร์ฟ ออกเกมแล้วกลับมายังอยู่ เช่นเดียวกับสิทธิ์ “ค้างเลือก”
              </p>
            </div>
            <div className="rounded-2xl border border-violet-500/25 bg-black/50 p-4">
              <p className="text-sm font-bold text-white">🛠 log แอดมิน</p>
              <p className="mt-1 text-[11px] leading-relaxed text-violet-200/70">
                แอดมินดูได้ที่แท็บ <b className="text-white">{logging.adminTab}</b> — เก็บ {logging.cap} รายการล่าสุดแบบข้ามเซิร์ฟเวอร์
                บันทึกละเอียดว่าใคร ทำอะไร ได้อะไร และจ่ายไปเท่าไหร่
              </p>
              <div className="mt-2.5 space-y-1">
                {logging.actions.map((a) => (
                  <div key={a.action} className="flex flex-wrap items-baseline gap-x-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5">
                    <span className="text-[11px] font-semibold text-violet-100">{a.action}</span>
                    <span className="text-[10px] text-white/40">— จ่าย: {a.pay}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <p className="mt-8 text-center text-[10px] text-white/25">
          ข้อมูลทั้งหมดคัดลอกจาก config จริงในเกม (WishConfig / WishServer / FarmConfig / FishConfig) — อัปเดต 27 ก.ค. 2026
        </p>
      </div>
    </div>
  );
}
