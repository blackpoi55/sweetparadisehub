'use client'

import React, { useMemo, useState } from 'react'

/** ========= DATA =========
 * ใส่รายการจาก RunFXConfig ของคุณได้เลย
 * baseChance ควรเป็น 0..1
 */
const LEVELS = [
  { lv: 1,  name: 'Trail Feet White',  desc: 'เส้นลมวิ่ง ซ้ายขวา สีขาว',  baseChance: 0.60, reqLevel: 20,  costMoney: 50000,  costFishing: 50,  effectType: 'TRAIL_FEET_White' },
  { lv: 2,  name: 'Trail Feet Green',  desc: 'เส้นลมวิ่ง ซ้ายขวา เขียว',  baseChance: 0.58, reqLevel: 20,  costMoney: 50000,  costFishing: 50,  effectType: 'TRAIL_FEET_Green' },
  { lv: 3,  name: 'Trail Feet Blue',   desc: 'เส้นลมวิ่ง ซ้ายขวา ฟ้า',    baseChance: 0.56, reqLevel: 20,  costMoney: 50000,  costFishing: 50,  effectType: 'TRAIL_FEET_Blue' },
  { lv: 4,  name: 'Trail Feet Pink',   desc: 'เส้นลมวิ่ง ซ้ายขวา ชมพู',   baseChance: 0.54, reqLevel: 20,  costMoney: 50000,  costFishing: 50,  effectType: 'TRAIL_FEET_Pink' },

  { lv: 5,  name: 'Spark Steps White', desc: 'ประกายสปาร์คตอนก้าวเท้า สีขาว', baseChance: 0.50, reqLevel: 50,  costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_White' },
  { lv: 6,  name: 'Spark Steps Green', desc: 'ประกายสปาร์คตอนก้าวเท้า เขียว',  baseChance: 0.48, reqLevel: 50,  costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Green' },
  { lv: 7,  name: 'Spark Steps Blue',  desc: 'ประกายสปาร์คตอนก้าวเท้า ฟ้า',    baseChance: 0.46, reqLevel: 50,  costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Blue' },
  { lv: 8,  name: 'Spark Steps Pink',  desc: 'ประกายสปาร์คตอนก้าวเท้า ชมพู',   baseChance: 0.44, reqLevel: 50,  costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Pink' },

  { lv: 9,  name: 'Wind Ring White',   desc: 'วงลมใต้ตัว สีขาว',   baseChance: 0.40, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_White' },
  { lv: 10, name: 'Wind Ring Green',   desc: 'วงลมใต้ตัว เขียว',  baseChance: 0.38, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Green' },
  { lv: 11, name: 'Wind Ring Blue',    desc: 'วงลมใต้ตัว ฟ้า',    baseChance: 0.36, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Blue' },
  { lv: 12, name: 'Wind Ring Pink',    desc: 'วงลมใต้ตัว ชมพู',   baseChance: 0.34, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Pink' },

  { lv: 13, name: 'Dust Burst White',  desc: 'ฝุ่นปะทุเป็นจังหวะ สีขาว', baseChance: 0.30, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_White' },
  { lv: 14, name: 'Dust Burst Green',  desc: 'ฝุ่นปะทุเป็นจังหวะ เขียว',  baseChance: 0.28, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Green' },
  { lv: 15, name: 'Dust Burst Blue',   desc: 'ฝุ่นปะทุเป็นจังหวะ ฟ้า',    baseChance: 0.26, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Blue' },
  { lv: 16, name: 'Dust Burst Pink',   desc: 'ฝุ่นปะทุเป็นจังหวะ ชมพู',   baseChance: 0.24, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Pink' },

  { lv: 17, name: 'Heart Runner White', desc: 'รอยเท้ารูปหัวใจ สีขาว', baseChance: 0.20, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_White' },
  { lv: 18, name: 'Heart Runner Green', desc: 'รอยเท้ารูปหัวใจ เขียว',  baseChance: 0.18, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Green' },
  { lv: 19, name: 'Heart Runner Blue',  desc: 'รอยเท้ารูปหัวใจ ฟ้า',    baseChance: 0.16, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Blue' },
  { lv: 20, name: 'Heart Runner Pink',  desc: 'รอยเท้ารูปหัวใจ ชมพู',   baseChance: 0.14, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Pink' },

  { lv: 21, name: 'Aura Runner White', desc: 'ออร่าหมอกรอบตัว สีขาว', baseChance: 0.10, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_White' },
  { lv: 22, name: 'Aura Runner Green', desc: 'ออร่าหมอกรอบตัว เขียว',  baseChance: 0.08, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Green' },
  { lv: 23, name: 'Aura Runner Blue',  desc: 'ออร่าหมอกรอบตัว ฟ้า',    baseChance: 0.06, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Blue' },
  { lv: 24, name: 'Aura Runner Pink',  desc: 'ออร่าหมอกรอบตัว ชมพู',   baseChance: 0.04, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Pink' },
]

/** ========= helpers ========= */
const fmtNum = (n) => {
  const x = Number(n || 0)
  return Number.isFinite(x) ? x.toLocaleString('en-US') : '0'
}
const pct = (x) => `${Math.round((Number(x || 0)) * 100)}%`

const splitEffect = (effectType) => {
  const s = String(effectType || '')
  const i = s.lastIndexOf('_')
  if (i <= 0) return { group: s, color: '' }
  return { group: s.slice(0, i), color: s.slice(i + 1) }
}
const uniq = (arr) => Array.from(new Set(arr)).filter(Boolean)

const badgeTone = (group) => {
  const g = String(group || '').toUpperCase()
  if (g.includes('AURA')) return 'ring-pink-400/30 bg-pink-500/10 text-pink-200'
  if (g.includes('HEART')) return 'ring-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200'
  if (g.includes('DUST')) return 'ring-rose-400/20 bg-rose-500/10 text-rose-200'
  if (g.includes('WIND')) return 'ring-violet-400/20 bg-violet-500/10 text-violet-200'
  if (g.includes('SPARK')) return 'ring-indigo-400/20 bg-indigo-500/10 text-indigo-200'
  return 'ring-white/15 bg-white/5 text-white/80'
}

export default function RunFXCraftTablePage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('ALL')
  const [color, setColor] = useState('ALL')

  const types = useMemo(() => ['ALL', ...uniq(LEVELS.map((x) => splitEffect(x.effectType).group))], [])
  const colors = useMemo(() => ['ALL', ...uniq(LEVELS.map((x) => splitEffect(x.effectType).color))], [])

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase()
    return LEVELS.filter((it) => {
      const ef = splitEffect(it.effectType)
      if (type !== 'ALL' && ef.group !== type) return false
      if (color !== 'ALL' && ef.color !== color) return false
      if (!s) return true
      const blob = `${it.lv} ${it.name} ${it.desc} ${it.effectType}`.toLowerCase()
      return blob.includes(s)
    })
  }, [q, type, color])

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white">
      {/* subtle pink glow background */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-24 left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[320px] w-[640px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-8">
        {/* Header card (Hub vibe) */}
        <div className="mb-4 overflow-hidden rounded-3xl border border-pink-500/15 bg-neutral-950/50 shadow-[0_0_0_1px_rgba(236,72,153,0.08)]">
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-pink-500/70 to-transparent" />
          <div className="px-5 py-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-3xl font-black tracking-tight">
                  <span className="text-white">Run FX</span>{' '}
                  <span className="text-pink-400">Forge Catalog</span>
                </div>
                <div className="mt-1 text-sm text-white/65">
                  ตารางแสดงข้อมูลเอฟเฟคทั้งหมด (ไม่จำลองคราฟ): ชื่อ/คำอธิบาย/ประเภท/สี/โอกาส/เงื่อนไข/ค่าใช้จ่าย
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                <span className="rounded-full bg-pink-500/15 px-2 py-1 font-semibold text-pink-200">
                  Showing {rows.length}/{LEVELS.length}
                </span>
                <span className="hidden sm:inline">Theme: Pink / Black</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <div className="group flex items-center gap-2 rounded-2xl border border-pink-500/20 bg-white/5 px-4 py-2.5 focus-within:border-pink-400/60 focus-within:ring-2 focus-within:ring-pink-500/15">
              <div className="text-xs text-white/45">🔎</div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search (LV / name / desc / effectType)..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
              />
              {q && (
                <button
                  onClick={() => setQ('')}
                  className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl border border-pink-500/20 bg-white/5 px-4 py-2.5 text-sm outline-none
                         focus:border-pink-400/60 focus:ring-2 focus:ring-pink-500/15"
            >
              {types.map((t) => (
                <option key={t} value={t} className="bg-neutral-900">
                  {t === 'ALL' ? 'All Types' : t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-2xl border border-pink-500/20 bg-white/5 px-4 py-2.5 text-sm outline-none
                         focus:border-pink-400/60 focus:ring-2 focus:ring-pink-500/15"
            >
              {colors.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">
                  {c === 'ALL' ? 'All Colors' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table container (กันทะลุ) */}
        <div className="overflow-hidden rounded-3xl border border-pink-500/15 bg-neutral-950/50 shadow-[0_0_0_1px_rgba(236,72,153,0.08)]">
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="text-sm font-bold text-white">
              Catalog Table <span className="text-pink-400">•</span>{' '}
              <span className="text-white/60">Run FX Effects</span>
            </div>
            <div className="text-xs text-white/55">
              Scroll inside table only
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="max-h-[68vh] overflow-auto">
              <div className="min-w-[980px]">
                {/* sticky header */}
                <div className="sticky top-0 z-10 grid grid-cols-12 border-y border-white/10 bg-neutral-950/80 px-5 py-3 text-[12px] font-semibold text-white/75 backdrop-blur">
                  <div className="col-span-1">LV</div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-3">Effect</div>
                  <div className="col-span-1 text-right">Rate</div>
                  <div className="col-span-1 text-right">Req</div>
                  <div className="col-span-2 text-right">Cost</div>
                </div>

                {rows.map((it, idx) => {
                  const ef = splitEffect(it.effectType)
                  const zebra = idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                  return (
                    <div
                      key={it.lv}
                      className={`grid grid-cols-12 px-5 py-3 border-b border-white/5 ${zebra} hover:bg-pink-500/5`}
                    >
                      <div className="col-span-1">
                        <div className="inline-flex items-center gap-2">
                          <span className="font-black text-pink-300">{it.lv}</span>
                        </div>
                      </div>

                      <div className="col-span-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-white">{it.name}</div>
                            <div className="mt-0.5 text-xs text-white/55">{it.desc}</div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center rounded-xl px-2 py-1 text-[11px] font-semibold ring-1 ${badgeTone(ef.group)}`}>
                            {ef.group}
                          </span>
                          {ef.color && (
                            <span className="inline-flex items-center rounded-xl bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
                              {ef.color}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[11px] font-mono text-white/35 break-all">
                          {it.effectType}
                        </div>
                      </div>

                      <div className="col-span-1 text-right">
                        <span className="inline-flex rounded-xl bg-pink-500/10 px-2 py-1 text-xs font-bold text-pink-200 ring-1 ring-pink-400/20">
                          {pct(it.baseChance)}
                        </span>
                      </div>

                      <div className="col-span-1 text-right text-sm text-white/80">
                        {it.reqLevel}
                      </div>

                      <div className="col-span-2 text-right text-xs text-white/80">
                        <div>💰 {fmtNum(it.costMoney)}</div>
                        <div>🎣 {fmtNum(it.costFishing)}</div>
                      </div>
                    </div>
                  )
                })}

                {rows.length === 0 && (
                  <div className="p-10 text-center text-sm text-white/60">
                    ไม่พบข้อมูลที่ตรงกับตัวกรอง/คำค้น
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden">
            <div className="max-h-[70vh] overflow-auto p-3">
              <div className="grid grid-cols-1 gap-3">
                {rows.map((it) => {
                  const ef = splitEffect(it.effectType)
                  return (
                    <div key={it.lv} className="rounded-2xl border border-pink-500/15 bg-white/5 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold">
                            <span className="text-pink-300">LV.{it.lv}</span> {it.name}
                          </div>
                          <div className="mt-1 text-xs text-white/65">{it.desc}</div>
                        </div>
                        <span className="shrink-0 rounded-xl bg-pink-500/10 px-2 py-1 text-xs font-bold text-pink-200 ring-1 ring-pink-400/20">
                          {pct(it.baseChance)}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={`rounded-xl px-2 py-1 text-[11px] font-semibold ring-1 ${badgeTone(ef.group)}`}>
                          {ef.group}
                        </span>
                        {ef.color && (
                          <span className="rounded-xl bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
                            {ef.color}
                          </span>
                        )}
                        <span className="rounded-xl bg-white/5 px-2 py-1 text-[11px] text-white/70 ring-1 ring-white/10">
                          Req {it.reqLevel}
                        </span>
                        <span className="rounded-xl bg-white/5 px-2 py-1 text-[11px] text-white/70 ring-1 ring-white/10">
                          💰 {fmtNum(it.costMoney)}
                        </span>
                        <span className="rounded-xl bg-white/5 px-2 py-1 text-[11px] text-white/70 ring-1 ring-white/10">
                          🎣 {fmtNum(it.costFishing)}
                        </span>
                      </div>

                      <div className="mt-2 rounded-xl border border-white/10 bg-neutral-950/40 px-2 py-2">
                        <div className="text-[11px] text-white/50">EffectType</div>
                        <div className="break-all font-mono text-[12px] text-white/70">{it.effectType}</div>
                      </div>
                    </div>
                  )
                })}

                {rows.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/60">
                    ไม่พบข้อมูลที่ตรงกับตัวกรอง/คำค้น
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
        </div>

        <div className="mt-6 text-xs text-white/35">
          Sweet Paradise Hub • Run FX Forge • Catalog (Display Only)
        </div>
      </div>
    </div>
  )
}
