import { getLiveStatus } from "@/lib/robloxLive";
import LiveServersClient from "@/components/LiveServersClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "เซิร์ฟเวอร์สด — Sweet Paradise Hub",
  description:
    "ดูจำนวนคนออนไลน์ทั้งหมด และรายการเซิร์ฟเวอร์สดของ Sweet Paradise แบบเรียลไทม์ — คนต่อเซิร์ฟ ปิง และสถานะเซิร์ฟ",
};

export default async function ServersPage() {
  const initial = await getLiveStatus();
  return <LiveServersClient initial={initial} />;
}
