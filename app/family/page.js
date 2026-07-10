// app/family/page.js — ระบบครอบครัว & คู่รัก (ดึงข้อมูลสดจาก Roblox DataStore)
import { getFamiliesFull, getCouplesFull } from "@/lib/robloxCloud";
import FamilyBrowserClient from "./FamilyBrowserClient";

export const dynamic = "force-dynamic";

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-pink-500/10 px-3 py-2">
      <span className="text-lg leading-none">{icon}</span>
      <div>
        <p className="text-xs font-medium text-pink-50 md:text-sm">{label}</p>
        {value && <p className="text-[11px] text-pink-100/80">{value}</p>}
      </div>
    </div>
  );
}

export default async function FamilyPage() {
  const [famRes, cplRes] = await Promise.all([
    getFamiliesFull(),
    getCouplesFull(),
  ]);
  const userMap = { ...(famRes.userMap || {}), ...(cplRes.userMap || {}) };

  const live = famRes.ok || cplRes.ok;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* header */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            👨‍👩‍👧💕 Family &amp; Couple
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            ครอบครัว &amp; คู่รัก
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            สร้างครอบครัวหรือแต่งงาน อยู่ใกล้กันแล้วได้บัฟเงินตกปลา สะสมแต้มสนิท ไต่อันดับ
            และดูรายชื่อครอบครัว/คู่รักทั้งหมด (ข้อมูลสดจากในเกม)
          </p>
        </header>

        {/* how it works */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5">
            <h2 className="mb-3 text-sm font-semibold text-pink-50 md:text-base">
              👨‍👩‍👧 ครอบครัว
            </h2>
            <div className="flex flex-col gap-2">
              <InfoRow icon="🏠" label="สร้างด้วยตั๋วสร้างครอบครัว" value="คราฟที่โต๊ะคราฟ หรือซื้อด้วย Robux • ตั้งชื่อ + แท็ก [ABC] 1–3 ตัวอักษร" />
              <InfoRow icon="➕" label="ขยายสมาชิก 5 → สูงสุด 25 คน" value="ใช้ตั๋วเพิ่มขนาดครอบครัว" />
              <InfoRow icon="🎣" label="บัฟเงินตกปลา +0.5% ต่อสมาชิกที่อยู่ใกล้" value="ต้องมีสมาชิก ≥2 คนอยู่รวมกันในระยะ 30 ช่อง — ยิ่งมารวมกันเยอะยิ่งได้เยอะ (รวมกับคู่รักเพดาน +15%)" />
              <InfoRow icon="💗" label="แต้มสนิท +1 / 10 นาที / คน" value="อยู่ใกล้สมาชิก (≥2 คน) สะสมแต้ม → ไต่อันดับครอบครัว" />
              <InfoRow icon="🏷️" label="แท็ก [TAG] ลอยเหนือหัว" value="โชว์ให้ทุกคนเห็นว่าอยู่ครอบครัวเดียวกัน" />
            </div>
          </section>

          <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5">
            <h2 className="mb-3 text-sm font-semibold text-pink-50 md:text-base">💕 คู่รัก</h2>
            <div className="flex flex-col gap-2">
              <InfoRow icon="💍" label="แต่งงานด้วยตั๋วขอแต่งงาน" value="คราฟที่โต๊ะคราฟ หรือซื้อด้วย Robux" />
              <InfoRow icon="🎣" label="บัฟเงินตกปลา +5%" value="อยู่ใกล้คู่ในระยะ 24 ช่อง" />
              <InfoRow icon="💨" label="เดินเร็วขึ้น +2" value="ตอนอยู่ใกล้คู่รัก" />
              <InfoRow icon="💞" label="แต้มสนิทคู่สะสมข้ามการหย่า" value="กลับมาแต่งคนเดิมได้แต้มเดิมคืน" />
              <InfoRow icon="🏆" label="อันดับคู่รัก" value="แข่งแต้มสนิท & ความรวยของทั้งคู่" />
            </div>
          </section>
        </div>

        {/* live data */}
        <FamilyBrowserClient
          families={famRes.families || []}
          couples={cplRes.couples || []}
          userMap={userMap}
          live={live}
        />
      </div>
    </div>
  );
}
