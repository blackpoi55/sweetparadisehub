// โต๊ะคราฟ (CraftConfig) — สูตรคราฟ: วัตถุดิบ (farm/เงิน) → ผลลัพธ์ + โอกาสสำเร็จ (chance)
// หมายเหตุ: คนละระบบกับหน้า "คราฟเอฟเฟค" (RunFX รอยเท้า)

export const craftCategories = [
  { id: "Item", label: "ไอเทม" },
  { id: "Gacha", label: "กล่องกาชา" },
  { id: "Gamepass", label: "Gamepass" },
];

export const craftMeta = {
  maxDistance: 15,
  consumeOnFail: true, // วัตถุดิบถูกใช้แม้คราฟไม่สำเร็จ
};

// cost: [{kind:'farm', item, amount} | {kind:'money', amount}]
// result: {kind:'farm', item} | {kind:'permanent', item} | {kind:'pet', petKey} | {kind:'pass', passId}
export const craftRecipes = {
  Item: [
    {
      id: "RiceTop", name: "ยอดข้าว", chance: 0.5,
      result: { kind: "farm", item: "RiceTop" },
      cost: [
        { kind: "farm", item: "Rice", amount: 50 },
        { kind: "money", amount: 20000 },
      ],
    },
    {
      id: "GoldenTicket", name: "Golden Ticket", chance: 0.25,
      result: { kind: "farm", item: "GoldenTicket" },
      cost: [
        { kind: "farm", item: "RiceTop", amount: 10 },
        { kind: "farm", item: "Rice", amount: 30 },
        { kind: "money", amount: 50000 },
      ],
    },
    {
      id: "MarketBumpTicket", name: "🚀 ตั๋วดันตลาด", chance: 1,
      result: { kind: "farm", item: "MarketBumpTicket" },
      cost: [
        { kind: "farm", item: "Iron", amount: 10 },
        { kind: "farm", item: "RiceTop", amount: 3 },
        { kind: "farm", item: "Rice", amount: 15 },
        { kind: "money", amount: 15000 },
      ],
    },
    {
      id: "FamilyCreateTicket", name: "🏠 ตั๋วสร้างครอบครัว", chance: 0.3,
      result: { kind: "farm", item: "FamilyCreateTicket" },
      cost: [
        { kind: "farm", item: "OldClothes", amount: 10 },
        { kind: "farm", item: "OldShoes", amount: 10 },
        { kind: "farm", item: "OldHat", amount: 10 },
        { kind: "farm", item: "GoldenTicket", amount: 10 },
        { kind: "money", amount: 500000 },
      ],
    },
    {
      id: "FamilyExpandTicket", name: "➕ ตั๋วเพิ่มขนาดครอบครัว", chance: 0.25,
      result: { kind: "farm", item: "FamilyExpandTicket" },
      cost: [
        { kind: "farm", item: "OldClothes", amount: 5 },
        { kind: "farm", item: "OldShoes", amount: 5 },
        { kind: "farm", item: "OldHat", amount: 5 },
        { kind: "farm", item: "GoldenTicket", amount: 5 },
        { kind: "money", amount: 100000 },
      ],
    },
    {
      id: "MarriageTicket", name: "💍 ตั๋วขอแต่งงาน", chance: 0.3,
      result: { kind: "farm", item: "MarriageTicket" },
      cost: [
        { kind: "farm", item: "OldClothes", amount: 5 },
        { kind: "farm", item: "OldShoes", amount: 5 },
        { kind: "farm", item: "OldHat", amount: 5 },
        { kind: "farm", item: "GoldenTicket", amount: 5 },
        { kind: "money", amount: 500000 },
      ],
    },
    {
      id: "ChairSakuratreeswingTool", name: "เก้าอี้ซากุระชิงช้า", chance: 0.12,
      result: { kind: "permanent", item: "ChairSakuratreeswingTool" },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 40 },
        { kind: "farm", item: "ChairGachaBox", amount: 10 },
        { kind: "money", amount: 1000000 },
      ],
    },
    {
      id: "BunnyPet", name: "🐰 สัตว์เลี้ยงกระต่าย", chance: 0.15,
      result: { kind: "pet", petKey: "Bunny" },
      cost: [
        { kind: "farm", item: "Rice", amount: 50 },
        { kind: "farm", item: "RiceTop", amount: 5 },
        { kind: "farm", item: "Iron", amount: 3 },
      ],
    },
    {
      id: "dancegun", name: "💃 ปืนแดนซ์", chance: 0.7,
      result: { kind: "permanent", item: "dancegun" },
      cost: [
        { kind: "farm", item: "OldClothes", amount: 20 },
        { kind: "farm", item: "OldShoes", amount: 20 },
        { kind: "farm", item: "OldHat", amount: 20 },
        { kind: "money", amount: 50000 },
      ],
    },
    {
      id: "Magicbook", name: "📖 หนังสือวาร์ป", chance: 0.25,
      result: { kind: "permanent", item: "Magicbook" },
      cost: [
        { kind: "farm", item: "Rice", amount: 50 },
        { kind: "farm", item: "RiceTop", amount: 20 },
        { kind: "farm", item: "GoldenTicket", amount: 12 },
        { kind: "farm", item: "ChairGachaBox", amount: 5 },
        { kind: "farm", item: "OldClothes", amount: 10 },
        { kind: "farm", item: "OldHat", amount: 10 },
        { kind: "farm", item: "OldShoes", amount: 10 },
        { kind: "money", amount: 500000 },
      ],
    },
  ],
  Gacha: [
    {
      id: "DollGachaBox", name: "กาชาตุ๊กตา V1", chance: 0.4,
      result: { kind: "farm", item: "DollGachaBox" },
      cost: [{ kind: "farm", item: "Rice", amount: 20 }],
    },
    {
      id: "ChairGachaBox", name: "กาชาเก้าอี้ V1", chance: 0.4,
      result: { kind: "farm", item: "ChairGachaBox" },
      cost: [
        { kind: "farm", item: "Rice", amount: 30 },
        { kind: "farm", item: "RiceTop", amount: 1 },
      ],
    },
    {
      id: "PetGachaBox", name: "กาชาสัตว์เลี้ยง", chance: 0.2,
      result: { kind: "farm", item: "PetGachaBox" },
      cost: [
        { kind: "farm", item: "RiceTop", amount: 25 },
        { kind: "farm", item: "Rice", amount: 150 },
        { kind: "farm", item: "Iron", amount: 12 },
        { kind: "money", amount: 1000000 },
      ],
    },
    {
      id: "SeasonGachaBox", name: "กาชาไอเทมซีซั่น", chance: 0.25,
      result: { kind: "farm", item: "SeasonGachaBox" },
      cost: [
        { kind: "farm", item: "RiceTop", amount: 8 },
        { kind: "farm", item: "Rice", amount: 50 },
        { kind: "farm", item: "GoldenTicket", amount: 3 },
        { kind: "farm", item: "Iron", amount: 5 },
        { kind: "money", amount: 250000 },
      ],
    },
    {
      id: "DecorGachaBox", name: "กาชาของตกแต่งv1", chance: 0.8,
      result: { kind: "farm", item: "DecorGachaBox" },
      cost: [
        { kind: "farm", item: "RiceTop", amount: 7 },
        { kind: "farm", item: "Rice", amount: 40 },
        { kind: "farm", item: "Iron", amount: 3 },
        { kind: "farm", item: "GoldenTicket", amount: 2 },
        { kind: "money", amount: 100000 },
      ],
    },
  ],
  Gamepass: [
    {
      id: "VipFishingPass", name: "พาส ViP", chance: 0.5,
      result: { kind: "pass", passId: 1373421368 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 10 },
        { kind: "farm", item: "ChairGachaBox", amount: 2 },
        { kind: "money", amount: 500000 },
      ],
    },
    {
      id: "WingFly", name: "Wing Fly", chance: 0.1,
      result: { kind: "pass", passId: 1447030821, item: "WingFly" },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 50 },
        { kind: "farm", item: "ChairGachaBox", amount: 10 },
        { kind: "money", amount: 1000000 },
      ],
    },
    {
      id: "CloudFly", name: "Cloud Fly", chance: 0.1,
      result: { kind: "pass", passId: 1438076864, item: "CloudFly" },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 50 },
        { kind: "farm", item: "ChairGachaBox", amount: 10 },
        { kind: "money", amount: 1000000 },
      ],
    },
    {
      id: "BroomFly", name: "Broom Fly", chance: 0.1,
      result: { kind: "pass", passId: 1446760866, item: "BroomFly" },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 50 },
        { kind: "farm", item: "ChairGachaBox", amount: 10 },
        { kind: "money", amount: 1000000 },
      ],
    },
    {
      id: "ResizePass", name: "พาสปรับขนาดตัว", chance: 0.4,
      result: { kind: "pass", passId: 1380168483 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 12 },
        { kind: "farm", item: "DollGachaBox", amount: 6 },
        { kind: "money", amount: 300000 },
      ],
    },
    {
      id: "NameTagColorPass", name: "พาสสีชื่อ (NameTag)", chance: 0.4,
      result: { kind: "pass", passId: 1380882236 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 10 },
        { kind: "farm", item: "ChairGachaBox", amount: 5 },
        { kind: "money", amount: 250000 },
      ],
    },
    {
      id: "BoomboxPass", name: "พาสบูมบ็อกซ์", chance: 0.4,
      result: { kind: "pass", passId: 1380714316 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 10 },
        { kind: "farm", item: "DollGachaBox", amount: 5 },
        { kind: "money", amount: 250000 },
      ],
    },
    {
      id: "PhoneWarpPass", name: "📱 ขอวาร์ป (โทรศัพท์)", chance: 0.35,
      result: { kind: "pass", passId: 1898929856 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 10 },
        { kind: "farm", item: "ChairGachaBox", amount: 5 },
        { kind: "money", amount: 300000 },
      ],
    },
    {
      id: "PhoneVideoPass", name: "📱 วิดีโอคอล (โทรศัพท์)", chance: 0.35,
      result: { kind: "pass", passId: 1900069805 },
      cost: [
        { kind: "farm", item: "GoldenTicket", amount: 12 },
        { kind: "farm", item: "DollGachaBox", amount: 5 },
        { kind: "money", amount: 350000 },
      ],
    },
  ],
};
