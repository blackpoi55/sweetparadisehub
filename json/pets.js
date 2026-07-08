// สัตว์เลี้ยง (PetConfig) — เรียงตาม Order ในเกม
// rarity ดึงมาจาก pool กาชาสัตว์เลี้ยง (PetGacha)
export const petall = [
  {
    key: "Bunny",
    displayName: "กระต่าย",
    emoji: "🐰",
    rarity: "Common",
    ability: "ดรอปข้าวฟรีทุก 20 นาที",
    obtain: "🛠️ คราฟที่โต๊ะคราฟ (ติด 15%)",
    icon: "rbxassetid://130378408681906",
  },
  {
    key: "SharkPet",
    displayName: "ฉลาม",
    emoji: "🦈",
    rarity: "Uncommon",
    ability: "ตีบอสโลกแรงขึ้น",
    obtain: "☠️ ดรอปจากบอสมอนสเตอร์มหากาฬ (1%/รอบ)",
    icon: "rbxassetid://136910793533425",
  },
  {
    key: "Dog",
    displayName: "หมา",
    emoji: "🐶",
    rarity: "Uncommon",
    ability: "ขุดเงินให้ทุก 20 นาที",
    obtain: "🧟 ดรอปจากบอสซอมบี้ยักษ์ (1%/รอบ)",
    icon: "rbxassetid://87402624064193",
  },
  {
    key: "frog",
    displayName: "กบ",
    emoji: "🐸",
    rarity: "Rare",
    ability: "เพิ่มโอกาสตกปลาสีรุ้ง",
    obtain: "🎣 ดรอปตอนตกปลา (1%/ครั้ง)",
    icon: "rbxassetid://132113440263465",
  },
  {
    key: "Chicken",
    displayName: "ไก่",
    emoji: "🐔",
    rarity: "Rare",
    ability: "เพิ่มยอดข้าวตอนเกี่ยวข้าว",
    obtain: "🌾 ดรอปตอนเกี่ยวข้าว (2%/ครั้ง)",
    icon: "rbxassetid://85311679221211",
  },
  {
    key: "Cat",
    displayName: "แมว",
    emoji: "🐱",
    rarity: "Epic",
    ability: "เพิ่มโชคเปิดกาชา",
    obtain: "🎰 ดรอปตอนเปิดกาชา (1%/กล่อง)",
    icon: "rbxassetid://111817633156151",
  },
  {
    key: "DarkDevil",
    displayName: "ดาร์คเดวิล",
    emoji: "😈",
    rarity: "Legendary",
    ability: "ตำนาน: บัฟหลายอย่างพร้อมกัน",
    obtain: "🎰 กาชาสัตว์เลี้ยง (30M/กล่อง)",
    icon: "rbxassetid://131963005813522",
  },
];

export const petByKey = Object.fromEntries(petall.map((p) => [p.key, p]));

export const petMeta = {
  maxLevel: 50,
  maxEquip: 5,
  gachaPrice: 30000000,
  expPerFood: 5,
  expPerLevel: 100,
  foodItem: "Rice",
  foodDisplay: "ข้าว",
  dupRefundItem: "Rice",
  dupRefundAmount: 100,
};
