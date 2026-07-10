import { referralMeta, perInvite, welcome, milestones } from "@/json/referral";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const metadata = { title: "ชวนเพื่อน — Sweet Paradise Hub" };

function RewardChip({ rw }) {
  if (rw.type === "money") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-200">
        💰 {fmtNum(rw.amount)}
      </span>
    );
  }
  if (rw.type === "petChoose") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-500/15 px-2.5 py-1 text-[11px] font-medium text-fuchsia-200">
        🐾 เลือกเพ็ทได้ 1 ตัว!
      </span>
    );
  }
  const a = resolveAsset(rw.id);
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/10 px-2 py-1 text-[11px] text-pink-100">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-5 w-5 rounded" />
      {a.label} ×{rw.amount}
    </span>
  );
}

export default function ReferralPage() {
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
            👥 Invite Friends
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ชวนเพื่อน</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ชวนเพื่อนมาเล่นผ่านลิงก์เชิญ — เพื่อนต้องเล่นถึง <b>เลเวล {referralMeta.levelReq}</b> ถึงจะนับ (กันปั่น)
            แล้วรับรางวัลทั้งต่อคนและรางวัลไมล์สโตน
          </p>
        </header>

        {/* per-invite + welcome */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-pink-500/30 bg-black/70 p-4">
            <h2 className="mb-2 text-sm font-semibold text-pink-50">🎯 รางวัลต่อการชวน 1 คน</h2>
            <div className="flex flex-wrap gap-2">
              {perInvite.map((rw, i) => (
                <RewardChip key={i} rw={rw} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-pink-500/30 bg-black/70 p-4">
            <h2 className="mb-2 text-sm font-semibold text-pink-50">🎁 รางวัลต้อนรับ (คนที่ถูกชวน)</h2>
            <div className="flex flex-wrap gap-2">
              {welcome.map((rw, i) => (
                <RewardChip key={i} rw={rw} />
              ))}
            </div>
          </div>
        </div>

        {/* milestones ladder */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-1 text-base font-semibold text-white">🪜 รางวัลไมล์สโตน (สะสมจำนวนเพื่อน)</h2>
          <p className="mb-4 text-xs text-pink-200/75">ยิ่งชวนได้มาก รางวัลยิ่งใหญ่ — ครบ 50 คนได้เลือกเพ็ท!</p>
          <div className="space-y-2">
            {milestones.map((m) => {
              const big = m.n >= 50;
              return (
                <div
                  key={m.n}
                  className={
                    "flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center " +
                    (big ? "border-amber-400/40 bg-amber-500/5" : "border-pink-500/15 bg-black/50")
                  }
                >
                  <div className="flex w-full flex-shrink-0 items-center gap-2 sm:w-28">
                    <span className={"flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold " + (big ? "bg-amber-500/20 text-amber-200" : "bg-pink-500/20 text-pink-100")}>
                      {m.n}
                    </span>
                    <span className="text-xs text-pink-300/70">คน</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.rewards.map((rw, i) => (
                      <RewardChip key={i} rw={rw} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-pink-300/60">
            📊 มีลีดเดอร์บอร์ดรายสัปดาห์ด้วย — ชวนเยอะติดอันดับ
          </p>
        </section>
      </div>
    </div>
  );
}
