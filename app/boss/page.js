import { bossMeta, bossRewardTiers, bosses } from "@/json/boss";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const metadata = { title: "บอสโลก — Sweet Paradise Hub" };

function BossCard({ b }) {
  const box = resolveAsset(b.gachaBox);
  const pet = b.petDrop ? resolveAsset(b.petDrop) : null;
  return (
    <article className="overflow-hidden rounded-2xl border border-pink-500/30 bg-black/80">
      <div className="flex items-center gap-3 p-4" style={{ background: `linear-gradient(135deg, ${b.color}22, transparent)` }}>
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-black/40 text-3xl">
          {b.emoji}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-white">{b.name}</h3>
          <p className="text-[11px] text-pink-200/75">ดรอปกล่อง: {b.gachaLabel}</p>
        </div>
      </div>
      <div className="space-y-2 p-4 pt-0 text-xs md:text-sm">
        <div className="flex items-center gap-2 rounded-xl bg-pink-500/10 px-3 py-2">
          <AssetIcon img={box.img} emoji={box.emoji} alt={box.label} className="h-8 w-8 rounded-lg" />
          <span className="text-pink-100/90">รางวัลหลัก: {box.label}</span>
        </div>
        {pet && (
          <div className="flex items-center gap-2 rounded-xl bg-fuchsia-500/10 px-3 py-2">
            <span className="text-lg">{pet.emoji}</span>
            <span className="text-pink-100/90">มีลุ้นเพ็ท: {pet.label}</span>
          </div>
        )}
        {b.special && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-amber-200">
            ✨ {b.special}
          </div>
        )}
      </div>
    </article>
  );
}

export default function BossPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🐉 World Boss
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">บอสโลก</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            บอสร่วมเซิร์ฟ — ทุกคนช่วยกันตี (คลิก/อาวุธ) ล้มแล้วแจกรางวัลตามอันดับดาเมจ ยิ่งคนเยอะ บอสยิ่งอึด
          </p>
        </header>

        {/* meta tiles */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
            <p className="text-sm font-bold text-pink-100">ทุก 2 ชม.</p>
            <p className="text-[11px] text-pink-300/70">ชั่วโมงเลขคู่</p>
          </div>
          <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
            <p className="text-sm font-bold text-pink-100">15 นาที</p>
            <p className="text-[11px] text-pink-300/70">เวลาสู้</p>
          </div>
          <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
            <p className="text-sm font-bold text-pink-100">{fmtNum(bossMeta.hpPerPlayer)}</p>
            <p className="text-[11px] text-pink-300/70">HP/คน (ขั้นต่ำ {fmtNum(bossMeta.hpMin)})</p>
          </div>
          <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
            <p className="text-sm font-bold text-pink-100">≥3%</p>
            <p className="text-[11px] text-pink-300/70">ดาเมจขั้นต่ำเพื่อรับรางวัล</p>
          </div>
        </div>

        {/* bosses */}
        <h2 className="mb-3 text-base font-semibold text-white">👹 บอสทั้ง 3 ชนิด (สุ่มเกิด)</h2>
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {bosses.map((b) => (
            <BossCard key={b.key} b={b} />
          ))}
        </div>

        {/* reward table */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-1 text-base font-semibold text-white">🏆 รางวัลตามอันดับดาเมจ</h2>
          <p className="mb-4 text-xs text-pink-200/75">
            อันดับ 1–3 ได้เสมอ • ผู้เข้าร่วมต้องทำดาเมจ ≥3% ของเลือดบอส (กันยืนเฉย) • จำนวน = กล่องกาชาของบอสตัวนั้น
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-pink-300/80">
                  <th className="px-2 py-2 text-left font-medium">อันดับ</th>
                  <th className="px-2 py-2 text-right font-medium">🎁 กล่องกาชา</th>
                  <th className="px-2 py-2 text-right font-medium">💰 เงิน</th>
                </tr>
              </thead>
              <tbody>
                {bossRewardTiers.map((t, i) => (
                  <tr key={i} className="border-t border-pink-500/15">
                    <td className="px-2 py-2 text-pink-50">{t.rank}</td>
                    <td className="px-2 py-2 text-right font-semibold text-pink-100">×{t.amount}</td>
                    <td className="px-2 py-2 text-right font-semibold text-emerald-200">{fmtNum(t.money)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-5 text-center text-[11px] text-pink-300/60">
          🔗 ดูเวลาบอสถัดไปได้ที่หน้า “ตารางกิจกรรม”
        </p>
      </div>
    </div>
  );
}
