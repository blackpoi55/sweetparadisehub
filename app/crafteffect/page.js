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

export default function RunFXCraftTablePage() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('ALL')
  const [color, setColor] = useState('ALL')

  const types = useMemo(() => {
    return ['ALL', ...uniq(LEVELS.map((x) => splitEffect(x.effectType).group))]
  }, [])
  const colors = useMemo(() => {
    return ['ALL', ...uniq(LEVELS.map((x) => splitEffect(x.effectType).color))]
  }, [])

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
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="text-3xl font-black tracking-tight">
            <span className="text-white">Run FX</span>{' '}
            <span className="text-pink-400">Catalog</span>
          </div>
          <div className="mt-1 text-sm text-white/65">
            ตารางแสดงข้อมูลการคราฟเอฟเฟค (ชื่อ/คำอธิบาย/ประเภท/สี/โอกาส/เงื่อนไข/ค่าใช้จ่าย)
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search (name/desc/effectType/LV)..."
              className="w-full rounded-2xl border border-pink-500/25 bg-white/5 px-4 py-2 text-sm outline-none
                         focus:border-pink-400/60 focus:ring-2 focus:ring-pink-500/15"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl border border-pink-500/25 bg-white/5 px-4 py-2 text-sm outline-none
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
              className="w-full rounded-2xl border border-pink-500/25 bg-white/5 px-4 py-2 text-sm outline-none
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

        {/* Table wrapper (prevents overflow / "ทะลุ") */}
        <div className="rounded-3xl border border-pink-500/20 bg-white/5 p-3 shadow-[0_0_0_1px_rgba(236,72,153,0.08)]">
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="text-sm font-bold">
              <span className="text-white">Run FX Forge</span>{' '}
              <span className="text-pink-400">Table</span>
            </div>
            <div className="text-xs text-white/60">
              Showing: {rows.length} / {LEVELS.length}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* Desktop header */}
            <div className="hidden md:grid md:grid-cols-12 bg-neutral-950/60 px-4 py-3 text-xs font-semibold text-white/80">
              <div className="col-span-1">LV</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Effect</div>
              <div className="col-span-1">Chance</div>
              <div className="col-span-1">Req</div>
              <div className="col-span-2">Cost</div>
            </div>

            {/* Body: scroll only inside table, not page */}
            <div className="max-h-[62vh] overflow-auto">
              {/* Mobile cards */}
              <div className="grid grid-cols-1 gap-3 p-3 md:hidden">
                {rows.map((it) => {
                  const ef = splitEffect(it.effectType)
                  return (
                    <div key={it.lv} className="rounded-2xl border border-pink-500/15 bg-neutral-950/50 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-bold">
                            <span className="text-pink-400">LV.{it.lv}</span> {it.name}
                          </div>
                          <div className="mt-1 text-xs text-white/70">{it.desc}</div>
                        </div>
                        <div className="rounded-xl border border-pink-500/25 bg-pink-500/10 px-2 py-1 text-xs font-semibold text-pink-300">
                          {pct(it.baseChance)}
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <Chip k="Type" v={ef.group} />
                        <Chip k="Color" v={ef.color || '-'} />
                        <Chip k="Req Level" v={String(it.reqLevel)} />
                        <Chip k="Money" v={fmtNum(it.costMoney)} />
                        <Chip k="Fishing" v={fmtNum(it.costFishing)} />
                        <Chip k="EffectType" v={it.effectType} mono />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop rows */}
              <div className="hidden md:block">
                {rows.map((it) => {
                  const ef = splitEffect(it.effectType)
                  return (
                    <div
                      key={it.lv}
                      className="grid grid-cols-12 border-t border-white/10 px-4 py-3 text-sm hover:bg-pink-500/5"
                    >
                      <div className="col-span-1 font-black text-pink-300">{it.lv}</div>

                      <div className="col-span-4">
                        <div className="font-semibold">{it.name}</div>
                        <div className="mt-0.5 text-xs text-white/60">{it.desc}</div>
                      </div>

                      <div className="col-span-3">
                        <div className="text-xs text-white/65">{ef.group}</div>
                        <div className="font-semibold">{ef.color}</div>
                        <div className="mt-0.5 text-xs text-white/40">{it.effectType}</div>
                      </div>

                      <div className="col-span-1 font-bold text-pink-200">{pct(it.baseChance)}</div>
                      <div className="col-span-1">{it.reqLevel}</div>

                      <div className="col-span-2 text-xs">
                        <div>💰 {fmtNum(it.costMoney)}</div>
                        <div>🎣 {fmtNum(it.costFishing)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {rows.length === 0 && (
                <div className="p-8 text-center text-sm text-white/60">
                  ไม่พบข้อมูลที่ตรงกับตัวกรอง/คำค้น
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/40">
          Sweet Paradise Hub • Theme: Pink/Black • Run FX Catalog
        </div>
      </div>
    </div>
  )
}

function Chip({ k, v, mono }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2">
      <div className="text-[11px] text-white/60">{k}</div>
      <div className={`text-sm font-semibold ${mono ? 'break-all font-mono text-[12px]' : ''}`}>
        {v}
      </div>
    </div>
  )
}
