import { getLiveStatus } from "@/lib/robloxLive";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getLiveStatus();
  return Response.json(data, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
