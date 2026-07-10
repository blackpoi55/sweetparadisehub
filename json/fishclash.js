// ศึกปลา (Fish Clash) — PvP auto-battler จากปลาที่เคยตกได้ (FishDex)
// ข้อมูลจาก ReplicatedStorage.FishClashConfig

export const clashMeta = {
  teamSize: 5, // จัดทีม 5 ตัว
  advMult: 1.25, // ธาตุได้เปรียบ ×1.25
  disMult: 0.82, // ธาตุเสียเปรียบ ×0.82
};

// ธาตุ 6 ชนิด + สีประจำธาตุ (จาก ELEMENT_COLOR ในเกม)
export const elements = {
  fire: { name: "ไฟ", icon: "🔥", color: "#FF6E50" },
  water: { name: "น้ำ", icon: "💧", color: "#5AAFFF" },
  wood: { name: "ไม้", icon: "🌿", color: "#78D26E" },
  electric: { name: "ไฟฟ้า", icon: "⚡", color: "#FFD75A" },
  ice: { name: "น้ำแข็ง", icon: "❄️", color: "#96E1FF" },
  earth: { name: "ดิน", icon: "🪨", color: "#BE9664" },
};

export const elementOrder = ["fire", "water", "wood", "electric", "ice", "earth"];

// ธาตุนี้ "ชนะ" ธาตุใดบ้าง (ได้เปรียบ ×1.25)
export const beats = {
  fire: ["wood", "electric"],
  water: ["fire", "earth"],
  wood: ["water", "ice"],
  electric: ["ice", "water"],
  ice: ["earth", "fire"],
  earth: ["electric", "wood"],
};

// สเตตัสฐานตาม tier — สูตรจริงในเกม: HP=80+38×tier, ATK=13+7×tier, SPD=8+1.6×tier
// (ยังบวกโบนัสจาก score ปลา และจำนวนที่สะสมได้อีก ดู teamBonuses ด้านล่าง)
export const tiers = [
  { tier: 1, rarity: "ธรรมดา", hp: 118, atk: 20, spd: 9.6, color: "#B0BEC5" },
  { tier: 2, rarity: "แรร์", hp: 156, atk: 27, spd: 11.2, color: "#42A5F5" },
  { tier: 3, rarity: "อัลตร้าแรร์", hp: 194, atk: 34, spd: 12.8, color: "#AB47BC" },
  { tier: 4, rarity: "ตำนาน", hp: 232, atk: 41, spd: 14.4, color: "#FFC107", ability: "heal" },
  { tier: 5, rarity: "เทพนิยาย", hp: 270, atk: 48, spd: 16.0, color: "#FF3B30", ability: "wave" },
  { tier: 6, rarity: "สายรุ้ง", hp: 308, atk: 55, spd: 17.6, color: "#EC4899", ability: "rainbow" },
];

// สกิลพิเศษ (ปลดล็อกตาม tier)
export const abilities = {
  heal: { name: "ฟื้นพลัง", icon: "✨", every: 3, tier: 4, desc: "ฮีลเพื่อนร่วมทีมทุก 3 เทิร์น" },
  wave: { name: "คลื่นยักษ์", icon: "🌊", every: 3, tier: 5, desc: "โจมตีศัตรูทั้งทีม (AoE) ทุก 3 เทิร์น" },
  rainbow: { name: "รุ้งพิฆาต", icon: "🌈", every: 2, tier: 6, desc: "AoE + ฮีลเพื่อนพร้อมกัน ทุก 2 เทิร์น" },
};

// โบนัสที่ทำให้ปลาแรงขึ้น (นอกเหนือจากสเตตัสฐาน)
export const powerBonuses = [
  { icon: "⭐", title: "โบนัส Score ปลา", desc: "ปลาที่ score สูงในระดับเดียวกันแรงกว่านิดหน่อย (สูงสุด +20%)" },
  { icon: "📦", title: "โบนัสจำนวนสะสม", desc: "ยิ่งตกปลาตัวเดิมได้เยอะ ยิ่งแรง (สูงสุด ~+25% ที่ ~50 ตัว) + เลเวลปลา 1–20" },
];

// โบนัสทีมจากการจัดธาตุ (element synergy) — เลือกได้แค่แบบเดียวที่ดีสุด
export const synergies = [
  { key: "master", name: "จ้าวธาตุ", mult: 12, desc: "ทั้งทีม 5 ตัวเป็นธาตุเดียวกัน", emoji: "🎯" },
  { key: "rainbow", name: "สมดุลรุ้ง", mult: 10, desc: "มีครบ 5 ธาตุขึ้นไปในทีม", emoji: "🌈" },
  { key: "combine", name: "รวมพลัง", mult: 6, desc: "มีธาตุเดียวกัน 4 ตัว", emoji: "🔗" },
  { key: "varied", name: "หลากหลาย", mult: 4, desc: "มี 4 ธาตุต่างกันในทีม", emoji: "🎨" },
];

// โบนัสสะสมสายพันธุ์ (unique collection — ถาวร)
export const collectionBonus = {
  perStep: 1, // +1%
  every: 5, // ทุก 5 สายพันธุ์
  max: 20, // สูงสุด +20%
};

// คะแนน ClashPoints ที่ได้ต่อแมตช์
export const points = {
  win: 2,
  second: 1,
  firstWinDailyBonus: 3,
  other: 0,
};

// ร้าน ClashPoints — ซื้อไอเทมบัฟก่อนเข้าแมตช์ (จ่ายด้วย ClashPoints)
export const shopItems = [
  { id: "armor", icon: "🛡️", name: "เกราะปะการัง", desc: "ทีมเริ่มด้วย HP +25%", cost: 40 },
  { id: "frenzy", icon: "⚔️", name: "คลั่งล่า", desc: "ตีแรง +30% ใน 3 รอบแรก", cost: 40 },
  { id: "heal", icon: "💚", name: "บ่อน้ำทิพย์", desc: "ฟื้น HP ทั้งทีม 30% กลางเกม", cost: 45 },
  { id: "haste", icon: "⚡", name: "กระแสเชี่ยว", desc: "ทีมได้ตีก่อน + speed", cost: 35 },
  { id: "whirl", icon: "🌀", name: "วังน้ำวน", desc: "ศัตรูตี -25% ใน 3 รอบแรก", cost: 45 },
  { id: "bomb", icon: "💥", name: "ระเบิดปลา", desc: "ระเบิดใส่ศัตรูตอนเริ่ม (15% HP)", cost: 50 },
  { id: "random", icon: "🎲", name: "พรทะเล", desc: "สุ่มบัฟ 1 อย่าง (ถูกกว่า)", cost: 25 },
];
