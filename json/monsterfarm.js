// json/monsterfarm.js — ข้อมูลระบบ "มอนสเตอร์ฟาร์ม" (mirror ของ ReplicatedStorage.MonsterFarmConfig)
// หมายเหตุ: ตัวเลขดรอปที่ละเอียดอ่อน (weight/เปอร์เซ็นต์เล็ก ๆ) ถูกแปลงเป็น "ระดับความหายาก" แทน
// สูตรคำนวณคัดลอกจาก config จริง เพื่อให้ตัวเลขตรงกับในเกมเสมอ

const MAX_LEVEL = 50;
const PUNCH_RANGE = 13;

// ===== สูตรจริงจาก config =====
export const fistDamage = (lv) => Math.floor(10 + (Math.max(1, Math.min(MAX_LEVEL, lv)) - 1) * 3);
export const fistCooldown = (lv) => {
  const t = (Math.max(1, Math.min(MAX_LEVEL, lv)) - 1) / (MAX_LEVEL - 1);
  return 0.55 - (0.55 - 0.18) * t;
};
export const upgradeCost = (lv) => ({
  exp: 40 + lv * lv * 12,
  money: 1000 + lv * lv * 200,
});
export const upgradeChance = (lv) => Math.max(0.1, Math.min(0.9, 0.9 - (lv - 1) * 0.02));

export const meta = {
  maxLevel: MAX_LEVEL,
  punchRange: PUNCH_RANGE,
  appName: "หมัดฟาร์มมอน",
  appIcon: "🥊",
};

// ===== ระดับหมัด (สีไฟตามช่วงเลเวล) =====
export const fistTiers = [
  { min: 1, max: 10, name: "หมัดธรรมดา", color: "#EBF0FF", fire: false, note: "หมัดเปล่า ยังไม่มีไฟ" },
  { min: 11, max: 20, name: "หมัดไฟส้ม", color: "#FF9628", fire: true, note: "เริ่มมีไฟที่กำปั้น" },
  { min: 21, max: 30, name: "หมัดไฟฟ้า", color: "#3CAAFF", fire: true, note: "ไฟสีฟ้าไฟฟ้า" },
  { min: 31, max: 40, name: "หมัดไฟม่วง", color: "#B43CFF", fire: true, note: "ไฟสีม่วงเข้ม" },
  { min: 41, max: 49, name: "หมัดไฟนรก", color: "#FF3C3C", fire: true, note: "ไฟแดงเดือด" },
  { min: 50, max: 50, name: "หมัดทองรุ้ง", color: "#FFDC50", fire: true, note: "หมัดสูงสุด สีทองรุ้ง" },
];

export const fistTierOf = (lv) => {
  let t = fistTiers[0];
  for (const tier of fistTiers) if (lv >= tier.min) t = tier;
  return t;
};

// ตารางตัวอย่างดาเมจต่อเลเวล — ใช้ "จุดเริ่มของแต่ละเทียร์" (1/11/21/31/41/50) ให้ตรงกับป้ายไฟด้านบน + ครบทั้ง 6 เทียร์
export const fistTable = [1, 11, 21, 31, 41, 50].map((lv) => {
  const dmg = fistDamage(lv);
  return {
    lv,
    dmg,
    cooldown: fistCooldown(lv).toFixed(2),
    hitsNormal: Math.ceil(300 / dmg), // ต่อยมอนธรรมดา (300 HP) กี่ที
    tier: fistTierOf(lv),
  };
});

// ===== มอนสเตอร์แต่ละชนิด =====
// เงิน/EXP = ได้ชัวร์เมื่อฆ่า · dropNote = ระดับการดรอปของ (ไม่โชว์ % จริง) · spawn = ความถี่การเกิด
export const monsters = [
  {
    key: "normal",
    name: "มอนธรรมดา",
    emoji: "👾",
    color: "#963C46",
    hp: 300,
    money: 55,
    exp: 8,
    spawn: "เกิดทั่วไปในสนาม",
    dropNote: "ดรอปของพื้นฐานเป็นบางครั้ง",
    dropBars: 1,
  },
  {
    key: "elite",
    name: "มอนอีลิท",
    emoji: "🟣",
    color: "#5A328C",
    hp: 900,
    money: 220,
    exp: 24,
    spawn: "เกิดเป็นบางตัว (ไม่บ่อย)",
    dropNote: "ลุ้นของเก่าเพิ่มขึ้น",
    dropBars: 2,
  },
  {
    key: "golden",
    name: "มอนทอง",
    emoji: "🟡",
    color: "#FFC83C",
    hp: 1800,
    money: 1600,
    exp: 110,
    spawn: "โผล่แบบสุ่ม (หายากมาก)",
    dropNote: "ดรอปของบ่อย + มีลุ้นตั๋วหายาก/บัตร EXP",
    dropBars: 3,
    highlight: true,
  },
  {
    key: "boss",
    name: "บอสสนาม",
    emoji: "👹",
    color: "#B41E28",
    hp: 12000,
    money: 9000,
    exp: 300,
    spawn: "สุ่มโผล่ระหว่างฟาร์ม (นาน ๆ ที) — ตีรวมทุกคน",
    dropNote: "ดรอปของชัวร์ + บัตร EXP ชัวร์ + ลุ้นตั๋วการันตี",
    dropBars: 4,
    highlight: true,
  },
];

// ===== ของที่ดรอป (ซ่อน weight/% จริง → ใช้ระดับความหายาก) =====
// tiers = ชนิดมอนที่มีสิทธิ์ดรอปของกลุ่มนี้
export const dropGroups = [
  {
    title: "ของพื้นฐาน",
    from: "ทุกมอน",
    desc: "ใช้คราฟ/ซื้อของ และ “เหล็ก” ใช้ซื้อลูกเล่น (perk)",
    items: [
      { code: "Rice", rarity: "บ่อย" },
      { code: "RiceTop", rarity: "ปานกลาง" },
      { code: "Iron", rarity: "ปานกลาง" },
    ],
  },
  {
    title: "ของเก่า",
    from: "อีลิทขึ้นไป",
    desc: "วัตถุดิบของเก่า สำหรับคราฟ — ต้องตีมอนอีลิท/ทอง/บอส",
    items: [
      { code: "OldClothes", rarity: "หายาก" },
      { code: "OldShoes", rarity: "หายาก" },
      { code: "OldHat", rarity: "หายาก" },
    ],
  },
  {
    title: "ตั๋วหายาก",
    from: "มอนทอง / บอส",
    desc: "ของรางวัลชิ้นเด็ด — ต้องล้มมอนทองหรือบอสเท่านั้น",
    items: [
      { code: "LuckyCraftTicket", rarity: "หายากมาก" },
      { code: "GoldenTicket", rarity: "หายากมาก" },
      { code: "GuaranteeCraftTicket", rarity: "เฉพาะบอส", bossOnly: true },
    ],
  },
];

// ===== บัตรเพิ่ม EXP (ไอเทมฟาร์ม เทรดได้) =====
export const expCards = [
  { code: "MFExp100", name: "บัตร EXP +100", emoji: "🃏", effect: "+100 EXP ทันที", rarity: "พบบ่อย" },
  { code: "MFExp500", name: "บัตร EXP +500", emoji: "🃏", effect: "+500 EXP ทันที", rarity: "ปานกลาง" },
  { code: "MFExp1000", name: "บัตร EXP +1000", emoji: "🎴", effect: "+1000 EXP ทันที", rarity: "หายาก" },
  { code: "MFExpX2", name: "บัตร EXP x2", emoji: "✨", effect: "EXP ที่ได้ ×2 นาน 10 นาที", rarity: "หายาก" },
];

// ===== ตีบวกอัพหมัด (โอกาสสำเร็จ + ทุน) =====
export const upgradeTable = [1, 5, 10, 20, 30, 40, 49].map((lv) => {
  const c = upgradeCost(lv);
  return { lv, to: lv + 1, exp: c.exp, money: c.money, chance: upgradeChance(lv) };
});

// ===== สกิลพลังหมัด =====
export const skill = {
  name: "พลังหมัด",
  emoji: "💥",
  cooldown: 45,
  dmgMult: 2.5,
  range: 15,
  desc: "ปล่อยพลังหมัดโจมตีมอนทุกตัวรอบตัวพร้อมกัน ดาเมจ = แรงหมัด ×2.5 (ติดคริแน่นอน) ยิ่งเลเวลสูง เอฟเฟกต์และดาเมจยิ่งอลังการ",
};

// ===== ลูกเล่น (perk) — อัพในเมนูโทรศัพท์ ด้วยเงิน + เหล็ก =====
export const perks = [
  { key: "crit", name: "คริติคอล", emoji: "🎯", max: 20, perLv: "+0.5% โอกาสตีแรง ×2", maxEffect: "สูงสุด 10%" },
  { key: "cleave", name: "ต่อยกวาด", emoji: "🌀", max: 3, perLv: "โดนมอนรอบตัว +1 ตัว/ขั้น", maxEffect: "สูงสุด +3 ตัว" },
  { key: "gold", name: "เงินงาม", emoji: "💰", max: 20, perLv: "+1.25% เงินที่ดรอป", maxEffect: "สูงสุด +25%" },
  { key: "expb", name: "EXP บูสต์", emoji: "⭐", max: 20, perLv: "+1.25% EXP ที่ได้", maxEffect: "สูงสุด +25%" },
];

// ===== ระบบเสริม =====
export const combo = {
  window: 3.5,
  perKill: "+4%",
  max: "+50%",
  desc: "ฆ่ามอนต่อเนื่องภายใน 3.5 วินาที จะสะสมคอมโบ เพิ่มทั้งเงินและ EXP ที่ได้ (+4% ต่อคอมโบ สูงสุด +50%) — พลาดจังหวะคอมโบรีเซ็ต",
};

export const claim = {
  desc: "ใครก็ช่วยตีมอนตัวเดียวกันได้ แต่รางวัลจะไปที่ “คนที่เริ่มตีก่อน” (เจ้าของ) — ไม่มีแย่งฆ่า ป้าย 🤝 บอกว่าเป็นมอนของเพื่อน (ช่วยได้ รางวัลเข้าเจ้าของ) · บอสสนาม = ตีรวม ทุกคนที่ช่วยได้รางวัล",
};

export const knockback = {
  desc: "มอนจะ “ตีให้กระเด็น” เมื่อเข้าใกล้ (ไม่เสียเลือด แค่กระเด็น) — กันคนยืนเฉย ๆ ออโต้คลิกฟาร์ม ต้องขยับ/วิ่งสู้ หรือหลบไปยืนบนลู่วิ่ง AFK",
};

export const treadmill = {
  desc: "ลู่วิ่ง AFK ในสนาม — ยืนบนลู่จะปลอดภัยจากมอน (เซฟโซน) และกันคนมาแกล้ง พร้อมได้ EXP เรื่อย ๆ ทีละนิด (ช้ากว่าฟาร์มเองมาก เหมาะไว้พักมือ) มีอนิเมชันวิ่ง + ตัวนับถอยหลังจนได้ EXP รอบถัดไป",
};

export const howto = [
  { icon: "📍", title: "ไปที่สนามฟาร์มมอน", desc: "หาโซนสนามในแมพ (มีมอนเดินเพ่นพ่าน)" },
  { icon: "👊", title: "คลิก/แตะเพื่อต่อย", desc: "ระบบล็อกเป้ามอนตัวใกล้ที่สุดให้อัตโนมัติ ต่อยรัวได้เลย" },
  { icon: "💰", title: "ฆ่ามอน = ได้เงิน + EXP", desc: "เงินและ EXP ได้ชัวร์ทุกครั้งที่ล้มมอน + มีลุ้นของฟาร์ม" },
  { icon: "🔨", title: "ตีบวกอัพหมัด", desc: "เอา EXP + เงิน ไปตีบวกในเมนู หมัดแรงขึ้น ต่อยเร็วขึ้น มีไฟ" },
  { icon: "📱", title: "เปิดเมนูจากโทรศัพท์", desc: `เปิดแอป ${meta.appIcon} ${meta.appName} เพื่ออัพหมัด/ลูกเล่น/ดูอันดับ/ใช้บัตร` },
];
