// ฟาร์ม (FarmConfig) — แปลงเพาะปลูก + มินิเกม + ผลผลิต
export const farms = [
  {
    key: "Rice",
    displayName: "นาข้าว",
    emoji: "🌾",
    action: "เกี่ยวข้าว",
    successCooldown: 1200, // 20 นาที
    failCooldown: 300, // 5 นาที
    rewards: [
      { item: "Rice", min: 1, max: 5, chance: 1 },
      { item: "RiceTop", min: 1, max: 1, chance: 0.03 },
      { item: "DollGachaBox", min: 1, max: 1, chance: 0.01 },
      { item: "ChairGachaBox", min: 1, max: 1, chance: 0.01 },
    ],
  },
];

export const farmMinigame = {
  type: "Whack", // ตีตุ่น
  duration: 9, // วินาที
  quota: 6, // ตีให้ได้ 6 ตัวถึงจะสำเร็จ
  spawnTotal: 8,
  spawnInterval: 0.7,
  targetLifetime: 1.5,
};

export const farmMeta = {
  maxDistance: 28,
};

// ผลผลิต/ทรัพยากรจากฟาร์ม (ใช้ resolveAsset โชว์ไอคอน/ชื่อ)
export const farmResources = {
  "ผลผลิตหลัก": ["Rice", "RiceTop", "Iron"],
  "ของเก่า (ใช้คราฟ)": ["OldClothes", "OldShoes", "OldHat"],
  "ตั๋วพิเศษ": [
    "GoldenTicket",
    "MarketBumpTicket",
    "LuckyCraftTicket",
    "GuaranteeCraftTicket",
    "FamilyCreateTicket",
    "FamilyExpandTicket",
    "MarriageTicket",
  ],
  "กล่องกาชา": [
    "DollGachaBox",
    "ChairGachaBox",
    "PetGachaBox",
    "SeasonGachaBox",
  ],
};
