// บอสโลก (WorldBossServer) — สปาวน์ร่วมเซิร์ฟ ทุกคนช่วยกันตี
export const bossMeta = {
  spawn: "ทุก 2 ชั่วโมง (ชั่วโมงเลขคู่ เวลาไทย)",
  fightTime: "15 นาที",
  hpPerPlayer: 18000,
  hpMin: 25000,
  hitRange: 26,
  minDmgShare: 0.03, // ต้องทำดาเมจ >=3% ถึงได้รางวัลผู้เข้าร่วม
};

// รางวัลตามอันดับดาเมจ (เหมือนกันทุกบอส ต่างที่ชนิดกล่องกาชา)
export const bossRewardTiers = [
  { rank: "🥇 อันดับ 1", amount: 15, money: 25000 },
  { rank: "🥈 อันดับ 2", amount: 10, money: 15000 },
  { rank: "🥉 อันดับ 3", amount: 5, money: 10000 },
  { rank: "ผู้เข้าร่วม (ดาเมจ ≥3%)", amount: 2, money: 2000 },
];

export const bosses = [
  {
    key: "monster",
    name: "มอนสเตอร์มหากาฬ",
    emoji: "☠️",
    gachaBox: "EventGachaBox",
    gachaLabel: "กาชา Event",
    petDrop: "SharkPet",
    color: "#8B5CF6",
  },
  {
    key: "zombie",
    name: "ซอมบี้ยักษ์",
    emoji: "🧟",
    gachaBox: "AdminGachaBox",
    gachaLabel: "กาชา Admin",
    petDrop: "Dog",
    color: "#22C55E",
  },
  {
    key: "sadnoob",
    name: "SadNoob มหาเศร้า",
    emoji: "😭",
    gachaBox: "SadnoobBossGachaBox",
    gachaLabel: "กาชา SadNoob",
    petDrop: null,
    special: "กล่องบอสนี้มีลุ้น 🌈 ปีกรุ้ง (Rainbowwing)",
    color: "#38BDF8",
  },
];
