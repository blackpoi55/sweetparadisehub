// วงล้อรายวัน (DailyWheelConfig) — หมุนฟรี 1 ครั้ง/วัน (เวลาไทย) สตรีคยิ่งยาว โชคยิ่งดี
// chance% คำนวณจาก weight ในเกม (ผลรวม ≈ 100)

export const wheelSegments = [
  { key: "m25k", emoji: "💰", label: "25,000", kind: "money", chance: 34.87, good: false },
  { key: "rice15", emoji: "🌾", label: "ต้นข้าว ×15", kind: "farm", chance: 21.98, good: false },
  { key: "iron8", emoji: "🔩", label: "เหล็ก ×8", kind: "farm", chance: 13.99, good: false },
  { key: "m70k", emoji: "💵", label: "70,000", kind: "money", chance: 10.99, good: false },
  { key: "gacha2", emoji: "🎁", label: "กล่องกาชา ×2", kind: "gacha", chance: 6.99, good: true },
  { key: "bump1", emoji: "🚀", label: "ตั๋วดันตลาด ×1", kind: "farm", chance: 5.0, good: true },
  { key: "gold3", emoji: "🎫", label: "Golden Ticket ×3", kind: "farm", chance: 3.5, good: true },
  { key: "m300k", emoji: "🤑", label: "300,000", kind: "money", chance: 2.0, good: true },
  { key: "m1_5m", emoji: "💎", label: "1,500,000", kind: "money", chance: 0.4, good: true },
  { key: "pet", emoji: "🐾", label: "เลือกเพ็ท 1 ตัว!", kind: "petChoose", chance: 0.1, good: true },
  { key: "season", emoji: "⚔️", label: "เลือกอาวุธซีซั่น!", kind: "seasonChoose", chance: 0.1, good: true },
  { key: "guarantee", emoji: "💯", label: "ตั๋วการันตีคราฟ", kind: "farm", chance: 0.1, good: true },
];

export const wheelMeta = {
  maxStreak: 60,
  luckAtMax: 4, // สตรีคเต็ม = โชค ×4
  luckCurve: [
    { streak: 0, mult: 1.0 },
    { streak: 7, mult: 1.35 },
    { streak: 60, mult: 4.0 },
  ],
  spinPerDay: 1, // 1 ครั้ง/วัน (รีเซ็ตเที่ยงคืนเวลาไทย)
};

// รางวัลพิเศษที่ให้ "เลือกเอง" เมื่อหมุนติด
export const wheelPetChoices = ["Bunny", "SharkPet", "Dog", "frog", "Chicken", "Cat", "DarkDevil"];
export const wheelSeasonChoices = [
  "BaseBallss3",
  "FrozenHammer",
  "Rope",
  "RibbonRope",
  "SniperGun",
  "Sniperinvite",
];
export const wheelGachaRandom = ["DollGachaBox", "ChairGachaBox", "EventGachaBox"];
