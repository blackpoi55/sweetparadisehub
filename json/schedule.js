// ตารางเวลากิจกรรมประจำ (เวลาไทย UTC+7) — ดึงจากสคริปต์ในเกม
export const scheduleEvents = [
  {
    key: "boss",
    icon: "🐉",
    name: "บอสโลก",
    when: "ทุก 2 ชั่วโมง — ชั่วโมงเลขคู่ (0, 2, 4 … 22 น.)",
    duration: "15 นาที",
    reward: "กาชา Event/Admin/SadNoob ×2–15 + เงิน ตามอันดับดาเมจ",
    href: "/boss",
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    key: "airdrop",
    icon: "🪂",
    name: "Airdrop",
    when: "ทุก 1 ชั่วโมง (เฉพาะเซิร์ฟสาธารณะ)",
    duration: "หาให้เจอใน 10 นาที",
    reward: "กาชา Event ×5 (5 คนแรกที่ทำมินิเกมสำเร็จ)",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    key: "adminquest",
    icon: "📜",
    name: "เควสแอดมิน",
    when: "ทุกชั่วโมงเลขคี่ (1, 3, 5 … 23 น.)",
    duration: "15 นาที",
    reward: "ของเก่า (เสื้อ/รองเท้า/หมวก) + เงิน 1,000–5,000",
    accent: "from-amber-500/20 to-yellow-500/10",
  },
  {
    key: "clash",
    icon: "🐟",
    name: "ทัวร์นาเมนต์ศึกปลา",
    when: "ทุกวัน 21:00 น.",
    duration: "จบในไม่กี่นาที",
    reward: "ClashPoints + ตำแหน่งแชมป์",
    href: "/fishclash",
    accent: "from-fuchsia-500/20 to-purple-500/10",
  },
  {
    key: "lucky",
    icon: "🍀",
    name: "หวยออกผล",
    when: "ทุกวันอาทิตย์ 21:30 น.",
    duration: "-",
    reward: "กองรางวัลรวมทั้งหมด (ทายเลขตรง)",
    href: "/lucky",
    accent: "from-emerald-500/20 to-green-500/10",
  },
  {
    key: "wheel",
    icon: "🎡",
    name: "รีเซ็ตวงล้อรายวัน",
    when: "ทุกวัน 00:00 น. (เที่ยงคืน)",
    duration: "-",
    reward: "หมุนฟรีใหม่ 1 ครั้ง + สะสมสตรีค",
    href: "/wheel",
    accent: "from-pink-500/20 to-fuchsia-500/10",
  },
];

// ไทม์ไลน์ราย 24 ชั่วโมง (สิ่งที่เกิดในแต่ละชั่วโมง)
export function hourlyTimeline() {
  const rows = [];
  for (let h = 0; h < 24; h++) {
    const items = ["🪂"]; // Airdrop ทุกชั่วโมง
    if (h % 2 === 0) items.push("🐉"); // บอสเลขคู่
    else items.push("📜"); // เควสเลขคี่
    if (h === 21) items.push("🐟"); // ทัวร์ศึกปลา
    if (h === 0) items.push("🎡"); // รีเซ็ตวงล้อ
    rows.push({ hour: h, items });
  }
  return rows;
}

export const scheduleLegend = [
  { icon: "🪂", label: "Airdrop" },
  { icon: "🐉", label: "บอสโลก" },
  { icon: "📜", label: "เควสแอดมิน" },
  { icon: "🐟", label: "ทัวร์ศึกปลา" },
  { icon: "🎡", label: "รีเซ็ตวงล้อ" },
];
