// json/totem.js — ระบบ 🗿 โทเทมนำโชค (ไอเทมปัก + แอพในโทรศัพท์)
// mirror ของ ServerScriptService.TotemBuffServer + FishConfig.FISH_UNLOCK
// ดึง/verify กับเกมจริง 2026-08-22 — ตัวเลขทุกตัวคัดลอกจาก config ตรง ๆ

export const meta = {
  itemName: "🗿 โทเทมนำโชค",
  itemCode: "TotemTool",
  iconId: 122889572513434,
  appName: "โทเทม",
  appEmoji: "🗿",
  openFrom: "โทรศัพท์ → แอพ 🗿 โทเทม",

  radius: 50, // RADIUS — รัศมีที่บัฟติดทุกคน (stud)
  rerollCost: 500000, // REROLL_COST — ค่าสุ่มต่อครั้ง (เงินในเกม)
  lockCards: 1, // LOCK_CARDS — ล็อก 1 ช่อง = บัตรกันแตกกี่ใบ
  undoCards: 3, // UNDO_CARDS — ย้อนค่าเดิม = บัตรกันแตกกี่ใบ
  cardName: "🛡️ บัตรกันตีบวกแตก", // RodSkinConfig.SafeCardItem
  cardCode: "RodSkinSafeCard",

  maxLuckSum: 1.5, // MAX_LUCK_SUM — โชครวมจากทุกโทเทมสูงสุด +150%
  maxMoneySum: 0.75, // MAX_MONEY_SUM — เงินรวมสูงสุด +75%
  promptDistance: 12, // ระยะกด E ดูบัฟของโทเทม
};

// ที่มาของโทเทม — ตกปลารุ้งตัวใหม่
export const source = {
  fish: "ปลาโทเทมเรียกทรัพย์",
  fishPrice: 250000,
  fishScore: 888,
  fishRate: 0.001, // เท่าปลารารวดอึ (กลุ่มโหดสุดในเกม)
  note: "ตกได้ครั้งเดียวก็เป็นเจ้าของถาวร · หรือแลกจากแอพขอพร (หมวดปลารุ้ง) ก็ได้ของเหมือนกัน",
};

// ===== 2 ช่องบัฟ (สุ่มทีเดียวได้ทั้งคู่) =====
export const slots = [
  {
    key: "luck",
    emoji: "🍀",
    name: "โชคตกปลา",
    desc: "เพิ่มโอกาสได้ปลาหายาก (คูณกับโชคของคันเบ็ด/สกิน)",
    range: [10, 50],
    capText: "รวมทุกโทเทมสูงสุด +150%",
  },
  {
    key: "money",
    emoji: "💰",
    name: "เงินขายปลา",
    desc: "เพิ่มเงินที่ได้ตอนตกปลาได้",
    range: [5, 25],
    capText: "รวมทุกโทเทมสูงสุด +75%",
  },
];

// ===== 5 ชั้นความหายาก (TIERS — น้ำหนักเป็นส่วนในพัน รวม = 1000) =====
export const tiers = [
  { name: "ธรรมดา", color: "#b8b2c4", weight: 580, luck: [10, 19], money: [5, 9] },
  { name: "ดี", color: "#7ee08a", weight: 270, luck: [20, 29], money: [10, 14] },
  { name: "หายาก", color: "#6db6ff", weight: 110, luck: [30, 39], money: [15, 19] },
  { name: "หายากมาก", color: "#c88bff", weight: 32, luck: [40, 46], money: [20, 23] },
  { name: "ตำนาน", color: "#ffd257", weight: 8, luck: [47, 50], money: [24, 25] },
];

export const totalWeight = tiers.reduce((s, t) => s + t.weight, 0); // 1000

/** โอกาสออกของชั้นนั้น ต่อ 1 ช่อง (%) */
export function tierPct(weight) {
  return (weight / totalWeight) * 100;
}
/** โอกาสที่การสุ่ม 1 ครั้ง (2 ช่อง) จะเจอชั้นนั้นอย่างน้อย 1 ช่อง (%) */
export function tierPctPerRoll(weight) {
  const p = weight / totalWeight;
  return (1 - (1 - p) ** 2) * 100;
}

// ===== การกระทำในแอพ =====
export const actions = [
  {
    key: "reroll",
    icon: "🎲",
    name: "สุ่มบัฟ",
    cost: `เงิน ${meta.rerollCost.toLocaleString("en-US")}`,
    desc: "สุ่มใหม่ทั้ง 2 ช่องพร้อมกัน (โชค + เงิน) — แต่ละช่องสุ่มชั้นของตัวเองแยกกัน",
    tone: "sky",
  },
  {
    key: "lock",
    icon: "🔒",
    name: "ล็อกช่อง",
    cost: `เงิน ${meta.rerollCost.toLocaleString("en-US")} + บัตรกันแตก ${meta.lockCards} ใบ`,
    desc: "เลือกล็อก 1 ช่อง (โชค หรือ เงิน) → ช่องนั้นคงค่าเดิม สุ่มเฉพาะอีกช่อง",
    tone: "amber",
  },
  {
    key: "undo",
    icon: "↩️",
    name: "ย้อนค่าเดิม",
    cost: `บัตรกันแตก ${meta.undoCards} ใบ`,
    desc: "กลับไปใช้ค่าก่อนการสุ่มครั้งล่าสุด (เก็บไว้ชุดเดียว — สุ่มใหม่ทับของเก่า)",
    tone: "emerald",
  },
];

// ===== ขั้นตอนใช้งาน =====
export const howto = [
  { step: 1, icon: "🎣", title: "ตกปลาโทเทมเรียกทรัพย์", desc: `ปลาสายรุ้งเรทโหดสุดกลุ่มเดียวกับปลารารวดอึ — ตกได้ = ปลดล็อกโทเทมถาวร (หรือแลกจากแอพขอพร)` },
  { step: 2, icon: "🗿", title: "เสกโทเทมออกมาปัก", desc: "หยิบไอเทมโทเทมในกระเป๋าแล้วปักลงพื้น — ปักได้คนละ 1 อัน" },
  { step: 3, icon: "📱", title: "เปิดแอพโทเทม", desc: `${meta.openFrom} → กดสุ่มบัฟ ครั้งละ ${meta.rerollCost.toLocaleString("en-US")}` },
  { step: 4, icon: "🔒", title: "ได้ช่องที่ชอบแล้วล็อกไว้", desc: `ใช้บัตรกันแตก ${meta.lockCards} ใบล็อกช่องนั้น แล้วสุ่มเฉพาะอีกช่องต่อ` },
  { step: 5, icon: "🤝", title: "ยืนในวงกับเพื่อน", desc: `บัฟติดทุกคนในระยะ ${meta.radius} ช่อง — ปักหลายคนบวกกันได้ (มีเพดาน)` },
];

// ===== ข้อควรรู้ =====
export const tips = [
  {
    icon: "🤝", tone: "emerald", title: "บัฟติดทุกคนในวง ไม่ใช่แค่เจ้าของ",
    desc: `ใครก็ตามที่ยืนในระยะ ${meta.radius} ช่องจากโทเทม ได้บัฟเต็ม ๆ เหมือนกันหมด — ปักรวมกันหลายคนยิ่งคุ้ม`,
  },
  {
    icon: "➕", tone: "sky", title: "หลายโทเทมบวกกันได้ แต่มีเพดาน",
    desc: `โชครวมสูงสุด +${meta.maxLuckSum * 100}% · เงินรวมสูงสุด +${meta.maxMoneySum * 100}% — เกินจากนี้ปักเพิ่มก็ไม่ขึ้นแล้ว`,
  },
  {
    icon: "1️⃣", tone: "amber", title: "นับเจ้าของคนละ 1 อันเท่านั้น",
    desc: "ถึงจะมีโทเทมของคนเดิมวางซ้อนกันหลายอัน (เช่นของค้างจากรอบผ่อนผัน) ระบบนับให้แค่อันเดียว",
  },
  {
    icon: "🎲", tone: "sky", title: "สุ่มทีเดียวได้ 2 ช่อง",
    desc: "1 ครั้ง = สุ่มทั้งโชคและเงิน แต่ละช่องสุ่มชั้นแยกกัน — อาจได้โชคตำนานพร้อมเงินธรรมดาก็ได้",
  },
  {
    icon: "↩️", tone: "emerald", title: "เก็บค่าเดิมไว้ชุดเดียว",
    desc: `สุ่มพลาดแล้วย้อนกลับได้ด้วยบัตรกันแตก ${meta.undoCards} ใบ — แต่ถ้าสุ่มซ้ำอีกครั้ง ค่าเก่าก่อนหน้าจะถูกทับหายไป`,
  },
  {
    icon: "💾", tone: "emerald", title: "ไม่มีทางเสียเงินฟรี",
    desc: "ระบบเช็คว่าเซฟข้อมูลได้จริงก่อนหักเงิน/บัตรทุกครั้ง — ถ้าโปรไฟล์ยังโหลดไม่เสร็จจะเด้งเตือนโดยไม่หักอะไรเลย",
  },
];
