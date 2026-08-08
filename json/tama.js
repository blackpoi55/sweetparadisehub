// json/tama.js — ระบบ "เลี้ยงทามาก็อต" (แอพในโทรศัพท์)
// mirror ของ ReplicatedStorage.TamaConfig + กติกาจริงใน ServerScriptService.TamaServer
// ดึง/verify กับเกมจริง 2026-08-08 — ตัวเลขทุกตัวคัดลอกจาก config ตรง ๆ

export const meta = {
  appName: "เลี้ยงทามาก็อต",
  appEmoji: "🥚",
  openFrom: "โทรศัพท์ → แอพ 🥚 ทามาก็อต",
  maxLv: 100, // MAX_LV
  dailyExpCap: 240, // DAILY_EXP_CAP — เพดาน EXP ต่อวัน (ตัวคุมความยาวเกม)
  offlineCapHours: 24, // OFFLINE_CAP_HOURS — คิดสเตตัสย้อนหลังสูงสุด 24 ชม.
  sickAt: 15, // SICK_AT — ป่วยเมื่อค่าเฉลี่ยต่ำกว่านี้
  cureAt: 60, // CURE_AT — หายเมื่อเฉลี่ยกลับเกินนี้
  nameMax: 16, // NAME_MAX — ความยาวชื่อ (ตัวอักษร)
  tagMinLv: 15, // TAG_MIN_LV — แท็กอวดในแชทขึ้นตั้งแต่สเตจนี้
  // เส้นเลเวล expNeed(lv) = 40 + lv×12 → รวมถึง LV.100 = 63,360 EXP
  totalExpToMax: 63360,
  daysToMax: 264, // 63,360 / 240 ≈ 264 วัน (~9 เดือน) ถ้าเล่นเต็มเพดานทุกวัน
};

export function expNeed(lv) {
  return 40 + lv * 12;
}

// ===== สเตตัส 4 อย่าง (0–100) · ลดลงตามเวลาจริง =====
// decay = จุดที่ลดต่อชั่วโมง (นับตอนเปิดแอพ ไม่มีลูปเซิร์ฟเวอร์)
export const stats = [
  { id: "hunger", emoji: "🍖", label: "หิว", decay: 4.0, note: "100 → 0 ใน 25 ชม." },
  { id: "happy", emoji: "😊", label: "สุข", decay: 3.2, note: "100 → 0 ใน ~31 ชม." },
  { id: "clean", emoji: "🛁", label: "สะอาด", decay: 2.4, note: "100 → 0 ใน ~42 ชม." },
  { id: "energy", emoji: "⚡", label: "พลัง", decay: 3.0, note: "100 → 0 ใน ~33 ชม." },
];

// ===== การกระทำ (แตะเลี้ยง) =====
// cd = คูลดาวน์ (วินาที) · exp = EXP ที่ได้ (นับเข้าเพดานวัน) · cost = ไอเทมฟาร์มที่ใช้
export const actions = [
  { id: "feed", emoji: "🍚", label: "ให้ข้าว", cd: 1800, exp: 16, cost: { item: "Rice", amount: 1 }, gain: { hunger: 30 } },
  { id: "feast", emoji: "🌾", label: "ยอดข้าว", cd: 1800, exp: 26, cost: { item: "RiceTop", amount: 1 }, gain: { hunger: 55, happy: 10 } },
  { id: "play", emoji: "🎾", label: "เล่นด้วย", cd: 1500, exp: 18, cost: null, gain: { happy: 30, energy: -8 } },
  { id: "bath", emoji: "🛁", label: "อาบน้ำ", cd: 2700, exp: 15, cost: null, gain: { clean: 40 } },
  { id: "sleep", emoji: "😴", label: "ให้นอน", cd: 3600, exp: 12, cost: null, gain: { energy: 45, hunger: -5 } },
];

// ===== สเตจการเติบโต (ตามเลเวล) — ใช้ทั้งรูปในแอพและแท็กอวดในแชท =====
export const stages = [
  { lv: 1, emoji: "🥚", name: "ไข่" },
  { lv: 5, emoji: "🐣", name: "ตัวจิ๋ว" },
  { lv: 15, emoji: "🐤", name: "เด็ก" },
  { lv: 30, emoji: "🐥", name: "วัยรุ่น" },
  { lv: 50, emoji: "🦜", name: "โตเต็มวัย" },
  { lv: 65, emoji: "🦚", name: "ผู้ใหญ่" },
  { lv: 80, emoji: "🦅", name: "อาวุโส" },
  { lv: 95, emoji: "🐉", name: "ตำนาน" },
];

// ===== ชนิด (สุ่มตอนฟักไข่ · มีผลแค่หน้าตา) =====
export const species = [
  { id: "slime", emoji: "🟢", name: "สไลม์" },
  { id: "cloud", emoji: "☁️", name: "ก้อนเมฆ" },
  { id: "flame", emoji: "🔥", name: "เปลวไฟ" },
  { id: "drop", emoji: "💧", name: "หยดน้ำ" },
  { id: "star", emoji: "⭐", name: "ดาว" },
  { id: "ghost", emoji: "👻", name: "ผีน้อย" },
];

// ===== นิสัย — โตมาจากวิธีเลี้ยง (เริ่มมีตั้งแต่ LV.5) =====
export const traitMinLv = 5;
export const traits = [
  { id: "greedy", emoji: "😋", name: "ตะกละ", desc: "หิวเร็วขึ้น แต่กินอิ่มแล้ว EXP ดีขึ้น" },
  { id: "playful", emoji: "🤸", name: "ขี้เล่น", desc: "เล่นได้ EXP ดี แต่เบื่อง่าย" },
  { id: "tidy", emoji: "✨", name: "รักสะอาด", desc: "สกปรกนาน อาบน้ำได้ EXP ดี" },
  { id: "sleepy", emoji: "😴", name: "ขี้เซา", desc: "พลังหมดช้า นอนทีได้ EXP ดี" },
  { id: "sulky", emoji: "😢", name: "ขี้งอน", desc: "เคยโดนปล่อยหิว สุขลดไวกว่าชาวบ้าน" },
];

// ===== ของอยากกินประจำวัน — ให้ถูกอย่าง = EXP ×2 =====
export const craving = {
  pool: ["Rice", "RiceTop", "Iron", "OldClothes", "OldShoes", "OldHat", "GoldenTicket"],
  mult: 2.0, // CRAVE_MULT
  cd: 3600, // TREAT_CD — ชั่วโมงละครั้ง
  baseExp: 24, // TREAT_EXP (×2 เมื่อให้ถูกตัว)
};

// ===== เหตุการณ์สุ่ม — เปิดแอพทีไรก็ไม่เหมือนเดิม =====
export const eventMeta = { chance: 0.3, gapSec: 1800 }; // EVENT_CHANCE / EVENT_GAP_SEC
export const events = [
  {
    id: "coin", emoji: "🪙", text: "ขุดเจอเหรียญในสวน!",
    choices: [
      { label: "💰 เก็บไว้", detail: "ได้เงิน 25,000", exp: 8 },
      { label: "😊 ให้มันเล่น", detail: "สุข +25 · มันดีใจมาก", exp: 20 },
    ],
  },
  {
    id: "sulk", emoji: "😠", text: "งอนอยู่ ไม่ยอมกินข้าว",
    choices: [
      { label: "🤗 กอดหน่อย", detail: "สุข +30", exp: 18 },
      { label: "😐 ปล่อยไว้", detail: "สุข −10 · หิว +10", exp: 4 },
    ],
  },
  {
    id: "mud", emoji: "🐷", text: "ไปกลิ้งโคลนมาเต็มตัว!",
    choices: [
      { label: "🛁 อาบน้ำทันที", detail: "สะอาด +45", exp: 14 },
      { label: "😂 ถ่ายรูปก่อน", detail: "สุข +20 · สะอาด −10", exp: 12 },
    ],
  },
  {
    id: "dream", emoji: "💫", text: "ฝันว่าตัวเองบินได้",
    choices: [
      { label: "😴 ปล่อยให้ฝันต่อ", detail: "พลัง +35", exp: 16 },
      { label: "🌟 ปลุกมาเล่น", detail: "สุข +20 · พลัง −10", exp: 20 },
    ],
  },
  {
    id: "gift", emoji: "🎁", text: "เก็บของมาฝากไว้ให้คุณ",
    choices: [
      { label: "🌾 รับของ", detail: "ได้ข้าว 12", exp: 10 },
      { label: "💝 ชมเฉย ๆ", detail: "สุข +30", exp: 22 },
    ],
  },
  {
    id: "train", emoji: "💪", text: "อยากซ้อมให้แข็งแรง",
    choices: [
      { label: "🔥 ซ้อมหนัก", detail: "พลัง −25 · หิว −15", exp: 30 },
      { label: "🙌 ซ้อมเบา ๆ", detail: "พลัง −8 · สุข +10", exp: 14 },
    ],
  },
];

// ===== ไปเยี่ยมทามะเพื่อน (ต้องอยู่เซิร์ฟเดียวกัน) =====
export const visit = {
  exp: 22, // VISIT_EXP — ได้ทั้งคนไปและเจ้าบ้าน
  happy: 18, // VISIT_HAPPY — สุขที่เพิ่มทั้งคู่
  perDay: 5, // VISIT_PER_DAY
  sameGapHours: 24, // VISIT_SAME_GAP — คนเดิมซ้ำต้องรอ 1 วัน
};

// ===== สมุดสะสม + ปล่อยสู่ธรรมชาติ =====
export const release = {
  minLv: 100, // RELEASE_MIN_LV — ต้องถึงเลเวลสูงสุดก่อนถึงปล่อยได้
  bookCap: 60, // BOOK_CAP — เก็บในสมุดสูงสุด
  note: "อันดับใช้คะแนนสะสม (lifetime) ที่อยู่นอกตัวสัตว์ — ปล่อยแล้วอันดับไม่หาย",
};

// ===== อันดับ (leaderboard) =====
export const leaderboards = [
  { key: "TamaCare_v1", label: "คะแนนเลี้ยงสะสม", desc: "อันดับหลัก — สะสมจากทุกการกระทำ (ปล่อยสัตว์แล้วไม่รีเซ็ต)" },
  { key: "TamaLevel_v1", label: "เลเวลสูงสุด", desc: "เลเวลของทามะที่สูงสุดที่เคยเลี้ยง" },
];

// ===== ขั้นตอนเล่น =====
export const howto = [
  { step: 1, icon: "🥚", title: "ฟักไข่ + ตั้งชื่อ", desc: `เปิดแอพครั้งแรก ฟักไข่แล้วตั้งชื่อเพื่อนใหม่ (ยาวได้ถึง ${meta.nameMax} ตัวอักษร) — สุ่มได้ 1 ใน ${species.length} ชนิด (มีผลแค่หน้าตา)` },
  { step: 2, icon: "🍚", title: "เลี้ยงทุกวัน", desc: "แตะให้ข้าว/เล่น/อาบน้ำ/ให้นอน เพื่อรักษา 4 สเตตัสไม่ให้ตก — แต่ละอย่างมีคูลดาวน์ + ได้ EXP" },
  { step: 3, icon: "🍜", title: "ให้ของที่อยากกิน", desc: `แต่ละวันทามะจะอยากกินของอย่างหนึ่ง ให้ถูก = EXP ×${craving.mult}` },
  { step: 4, icon: "🎲", title: "ลุ้นเหตุการณ์สุ่ม", desc: `เปิดแอพมีโอกาส ${Math.round(eventMeta.chance * 100)}% เจอเหตุการณ์ให้เลือกทาง — ได้ของ/เงิน/สเตตัส/EXP ต่างกัน` },
  { step: 5, icon: "🏡", title: "เยี่ยมเพื่อน + ไต่อันดับ", desc: `ไปเยี่ยมทามะเพื่อนในเซิร์ฟเดียวกันได้วันละ ${visit.perDay} คน (ได้ EXP + สุขทั้งคู่) แล้วไต่อันดับคะแนนเลี้ยง` },
];

// ===== เกร็ดสำคัญ (การ์ดบนสุด) =====
export const facts = [
  { icon: "📈", title: `${meta.maxLv} เลเวล`, desc: `เล่นเต็มเพดานทุกวัน ~${meta.daysToMax} วัน (~9 เดือน) ถึงจะถึงเลเวลสูงสุด` },
  { icon: "⏳", title: `เพดาน ${meta.dailyExpCap} EXP/วัน`, desc: "เล่นสม่ำเสมอดีกว่าหักโหมวันเดียว — เกิน 240 วันนั้นไม่ได้ EXP เพิ่ม" },
  { icon: "🛡️", title: "หายไปนานไม่พัง", desc: `คิดสเตตัสย้อนหลังสูงสุด ${meta.offlineCapHours} ชม. ไม่ว่าหายไปนานแค่ไหน กลับมาไม่เจอสภาพสิ้นหวัง` },
  { icon: "🩹", title: "ป่วย/หาย", desc: `ค่าเฉลี่ย 4 สเตตัสต่ำกว่า ${meta.sickAt} = ป่วย · ดูแลจนเฉลี่ยเกิน ${meta.cureAt} = หาย` },
];
