"use client";

import { useState } from "react";
import {
  clashMeta,
  elements,
  elementOrder,
  beats,
  tiers,
  abilities,
  points,
  synergies,
  powerBonuses,
  collectionBonus,
  shopItems,
} from "@/json/fishclash";

function ElementChip({ el, active, onClick }) {
  const e = elements[el];
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm " +
        (active ? "text-black" : "text-white hover:opacity-90")
      }
      style={{
        background: active ? e.color : "rgba(0,0,0,0.5)",
        borderColor: e.color,
      }}
    >
      <span>{e.icon}</span>
      <span>{e.name}</span>
    </button>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <section
      className={
        "rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5 " + className
      }
    >
      {title && (
        <h2 className="mb-3 text-sm font-semibold text-pink-50 md:text-base">{title}</h2>
      )}
      {children}
    </section>
  );
}

export default function FishClashPage() {
  const [sel, setSel] = useState("fire");
  const selEl = elements[sel];
  const winsOver = beats[sel] || [];
  const losesTo = elementOrder.filter((o) => (beats[o] || []).includes(sel));

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* header */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🐟⚔️ Fish Clash
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            ศึกปลา (Fish Clash)
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            โหมด PvP อัตโนมัติ — เอาปลาที่คุณเคยตกได้ (FishDex) มาจัดทีม {clashMeta.teamSize} ตัว
            สู้กันแบบ FFA {"(2–8 คน)"} ยิ่งปลาหายาก ยิ่งเก่ง ชนะแล้วได้ ClashPoints ไปแลกของในร้านมือถือ 📱
          </p>
        </header>

        {/* how it works */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card title="🎣 จัดทีมจากปลาที่ตกได้">
            <p className="text-xs text-pink-100/85 md:text-sm">
              ปลาทุกตัวที่เคยตกได้ในเกมใช้ลงสนามได้ เลือก {clashMeta.teamSize} ตัวต่อทีม —
              ตกได้ตัวเดิมซ้ำ ยิ่งเก่งขึ้น (สแต็ก)
            </p>
          </Card>
          <Card title="🤖 สู้อัตโนมัติ">
            <p className="text-xs text-pink-100/85 md:text-sm">
              เข้าห้อง 2–8 คนแบบ FFA เติมบอทถ้าคนน้อย ระบบคำนวณผลจากสเตตัส+ธาตุ+สกิลเอง ไม่ต้องกดสู้
            </p>
          </Card>
          <Card title="🏆 แลกรางวัล">
            <p className="text-xs text-pink-100/85 md:text-sm">
              ชนะได้ ClashPoints เอาไปแลกของในร้านมือถือ — ไม่มีระบบ tier แยก ทุกคนแข่งในสระเดียวกัน
            </p>
          </Card>
        </div>

        {/* element type chart */}
        <Card title="🌈 ตารางธาตุ (Type Chart)" className="mb-6">
          <p className="mb-3 text-xs text-pink-200/75">
            ปลาแต่ละตัวมีธาตุ กดเลือกธาตุเพื่อดูว่าได้เปรียบ/เสียเปรียบใคร —
            ได้เปรียบ ×{clashMeta.advMult} • เสียเปรียบ ×{clashMeta.disMult}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {elementOrder.map((el) => (
              <ElementChip key={el} el={el} active={sel === el} onClick={() => setSel(el)} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-emerald-200">
                <span style={{ color: selEl.color }}>{selEl.icon} {selEl.name}</span> ได้เปรียบ (×{clashMeta.advMult})
              </p>
              <div className="flex flex-wrap gap-2">
                {winsOver.map((o) => (
                  <span key={o} className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                    {elements[o].icon} {elements[o].name}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-3">
              <p className="mb-2 text-xs font-semibold text-rose-200">
                <span style={{ color: selEl.color }}>{selEl.icon} {selEl.name}</span> เสียเปรียบ (×{clashMeta.disMult})
              </p>
              <div className="flex flex-wrap gap-2">
                {losesTo.map((o) => (
                  <span key={o} className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                    {elements[o].icon} {elements[o].name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* tier stats */}
        <Card title="📊 สเตตัสฐานตามความหายาก" className="mb-6">
          <p className="mb-3 text-xs text-pink-200/75">
            สูตรฐาน: HP = 80 + 38×tier · ATK = 13 + 7×tier · SPD = 8 + 1.6×tier — ระดับตำนานขึ้นไปมี “สกิลพิเศษ”
            (ยังบวกโบนัส score ปลา และจำนวนที่สะสมได้อีก ดูด้านล่าง)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-pink-300/80">
                  <th className="px-2 py-2 text-left font-medium">ความหายาก</th>
                  <th className="px-2 py-2 text-right font-medium">❤️ HP</th>
                  <th className="px-2 py-2 text-right font-medium">⚔️ ATK</th>
                  <th className="px-2 py-2 text-right font-medium">💨 SPD</th>
                  <th className="px-2 py-2 text-left font-medium">สกิล</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => {
                  const ab = t.ability ? abilities[t.ability] : null;
                  return (
                    <tr key={t.tier} className="border-t border-pink-500/15">
                      <td className="px-2 py-2">
                        <span
                          className="inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium text-black"
                          style={{ background: t.color, borderColor: t.color }}
                        >
                          {t.rarity}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-right font-semibold text-pink-100">{t.hp}</td>
                      <td className="px-2 py-2 text-right font-semibold text-pink-100">{t.atk}</td>
                      <td className="px-2 py-2 text-right font-semibold text-pink-100">{t.spd}</td>
                      <td className="px-2 py-2 text-pink-100/85">
                        {ab ? `${ab.icon} ${ab.name}` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* abilities + points */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card title="✨ สกิลพิเศษ">
            <div className="flex flex-col gap-2">
              {Object.values(abilities).map((ab) => (
                <div key={ab.name} className="flex items-start gap-3 rounded-xl bg-pink-500/10 px-3 py-2">
                  <span className="text-2xl leading-none">{ab.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-pink-50">
                      {ab.name}{" "}
                      <span className="text-[11px] text-pink-300/70">(ทุก {ab.every} เทิร์น)</span>
                    </p>
                    <p className="text-xs text-pink-100/80">{ab.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="🏅 คะแนน ClashPoints ต่อแมตช์">
            <ul className="flex flex-col gap-2 text-xs md:text-sm">
              <li className="flex items-center justify-between rounded-xl bg-amber-500/10 px-3 py-2">
                <span className="text-amber-100">🥇 ชนะ (ที่ 1)</span>
                <span className="font-bold text-amber-200">+{points.win}</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-pink-500/10 px-3 py-2">
                <span className="text-pink-100">🥈 ที่ 2</span>
                <span className="font-bold text-pink-200">+{points.second}</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-fuchsia-500/10 px-3 py-2">
                <span className="text-fuchsia-100">🎁 โบนัสชนะครั้งแรกของวัน</span>
                <span className="font-bold text-fuchsia-200">+{points.firstWinDailyBonus}</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-500/10 px-3 py-2">
                <span className="text-slate-300">อันดับอื่น ๆ</span>
                <span className="font-bold text-slate-300">+{points.other}</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] text-pink-300/60">
              * ปลาหายากดีกว่าเสมอ (rarity มีผลมากสุด) แต่จับคู่ธาตุดี ๆ พลิกเกมได้
            </p>
          </Card>
        </div>

        {/* power bonuses */}
        <Card title="💪 โบนัสทำให้ทีมแรงขึ้น" className="mt-6">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {powerBonuses.map((b) => (
              <div key={b.title} className="flex items-start gap-3 rounded-xl bg-pink-500/10 px-3 py-2">
                <span className="text-2xl leading-none">{b.icon}</span>
                <div>
                  <p className="text-sm font-medium text-pink-50">{b.title}</p>
                  <p className="text-xs text-pink-100/80">{b.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-xl bg-fuchsia-500/10 px-3 py-2 sm:col-span-2">
              <span className="text-2xl leading-none">📚</span>
              <div>
                <p className="text-sm font-medium text-pink-50">โบนัสสะสมสายพันธุ์ (ถาวร)</p>
                <p className="text-xs text-pink-100/80">
                  ยิ่งเคยตกปลาได้หลายสายพันธุ์ ทีมยิ่งแรงถาวร — +{collectionBonus.perStep}% ทุก{" "}
                  {collectionBonus.every} สายพันธุ์ (สูงสุด +{collectionBonus.max}%)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* team synergy */}
        <Card title="🧩 โบนัสจัดทีมตามธาตุ (Synergy)" className="mt-6">
          <p className="mb-3 text-xs text-pink-200/75">
            จัดธาตุในทีมให้เข้าเงื่อนไข รับโบนัสดาเมจทั้งทีม (ได้แบบที่ดีสุดเพียงอย่างเดียว)
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {synergies.map((s) => (
              <div key={s.key} className="flex items-center gap-3 rounded-xl border border-pink-500/20 bg-black/50 p-3">
                <span className="text-2xl">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-pink-50">{s.name}</p>
                  <p className="text-[11px] text-pink-100/75">{s.desc}</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-200">
                  +{s.mult}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ClashPoints shop */}
        <Card title="🛒 ร้าน ClashPoints (ไอเทมช่วยรบ)" className="mt-6">
          <p className="mb-3 text-xs text-pink-200/75">
            ใช้ ClashPoints ที่ได้จากการแข่ง แลกไอเทมบัฟติดตัวก่อนเข้าแมตช์ (ในร้านมือถือ 📱)
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {shopItems.map((it) => (
              <div key={it.id} className="flex items-start gap-3 rounded-xl border border-pink-500/20 bg-black/50 p-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-xl">
                  {it.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-pink-50">{it.name}</p>
                    <span className="flex-shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-200">
                      {it.cost} pt
                    </span>
                  </div>
                  <p className="text-[11px] text-pink-100/75">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
