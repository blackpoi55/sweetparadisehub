// ชวนเพื่อน (ReferralServer DEFAULT_CONFIG) — แอดมินปรับได้ ค่าเริ่มต้นตามนี้
export const referralMeta = {
  levelReq: 20, // เพื่อนที่ชวนต้องถึงเลเวลนี้ถึงจะนับ (กันฟาร์ม)
  weeklyLeaderboard: true,
};

// รางวัลต่อการชวน 1 คน (ทุกคน)
export const perInvite = [{ type: "money", amount: 20000 }];

// รางวัลต้อนรับ (สำหรับ "เพื่อนที่ถูกชวน")
export const welcome = [
  { type: "money", amount: 20000 },
  { type: "farm", id: "EventGachaBox", amount: 2 },
];

// รางวัลไมล์สโตน (สะสมจำนวนเพื่อนที่ชวนสำเร็จ)
export const milestones = [
  { n: 1, rewards: [{ type: "money", amount: 50000 }, { type: "farm", id: "EventGachaBox", amount: 3 }, { type: "farm", id: "DollGachaBox", amount: 1 }] },
  { n: 3, rewards: [{ type: "money", amount: 150000 }, { type: "farm", id: "EventGachaBox", amount: 5 }, { type: "farm", id: "DollGachaBox", amount: 3 }] },
  { n: 5, rewards: [{ type: "money", amount: 300000 }, { type: "farm", id: "EventGachaBox", amount: 10 }, { type: "farm", id: "DollGachaBox", amount: 5 }, { type: "farm", id: "ChairGachaBox", amount: 1 }] },
  { n: 10, rewards: [{ type: "money", amount: 500000 }, { type: "farm", id: "SeasonGachaBox", amount: 1 }, { type: "farm", id: "PetGachaBox", amount: 1 }] },
  { n: 25, rewards: [{ type: "money", amount: 1000000 }, { type: "farm", id: "SeasonGachaBox", amount: 5 }, { type: "farm", id: "PetGachaBox", amount: 3 }] },
  { n: 50, rewards: [{ type: "money", amount: 2000000 }, { type: "petChoose" }] },
  { n: 60, rewards: [{ type: "money", amount: 3000000 }, { type: "farm", id: "GuaranteeCraftTicket", amount: 1 }, { type: "farm", id: "SeasonGachaBox", amount: 5 }] },
];
