// app/marketitems/page.js
import { getItemAssignmentsSummary } from "@/lib/robloxCloud";
import ItemCardClient from "./ItemCardClient";

export const dynamic = "force-dynamic";

function groupItemsByType(items) {
  const groups = {};
  for (const item of items) {
    if (!groups[item.grouptype]) groups[item.grouptype] = [];
    groups[item.grouptype].push(item);
  }
  return groups;
}

export default async function MarketItemsPage() {
  const { items, userMap } = await getItemAssignmentsSummary();

  const groups = groupItemsByType(items);

  // อยากจัดลำดับหมวดก่อนหลังเองเพิ่มได้
  const groupOrder = Object.keys(groups).sort((a, b) =>
    a.localeCompare(b, "th-TH")
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 md:mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            Sweet Paradise • Item Ownership
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            ผู้ครอบครองไอเท็มในร้านค้า{" "}
            <span className="text-pink-300">Sweet Paradise</span>
          </h1>
          <p className="mt-3 text-sm text-pink-100/85 md:text-base">
            ดูได้ว่าแต่ละไอเท็มมีใครถืออยู่บ้าง และมีคนถือกี่คน
            หมวดตุ๊กตาจะสรุปเฉพาะจำนวนเพราะคนถือเยอะมาก 🧸
          </p>
        </header>

        {/* ไม่มีข้อมูล */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-pink-500/40 bg-black/80 px-4 py-6 text-center text-sm text-pink-100/85">
            ยังไม่มีข้อมูลใน DataStore <br />
            ตรวจสอบค่า DataStore / Universe / Entry key ในไฟล์ .env.local
          </div>
        ) : (
          <div className="space-y-6">
            {groupOrder.map((groupName) => {
              const groupItems = groups[groupName];
              if (!groupItems || groupItems.length === 0) return null;

              const isDollGroup = groupName === "ตุ๊กตา";

              return (
                <section
                  key={groupName}
                  className="rounded-2xl border border-pink-500/40 bg-black/80 px-4 py-4 md:px-5 md:py-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                        หมวด {groupName}
                      </h2>
                      <p className="text-[11px] text-pink-200/80 md:text-xs">
                        ไอเท็มทั้งหมด {groupItems.length} ชิ้น
                        {isDollGroup &&
                          " (หมวดนี้คนถือเยอะมาก เลยสรุปเฉพาะจำนวนผู้ถือรวม)"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {groupItems.map((item) => (
                      <ItemCardClient
                        key={item.code}
                        item={item}
                        userMap={userMap}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center text-[12px] text-pink-200/80 md:text-sm">
          คลิกชื่อผู้เล่นเพื่อเปิดโปรไฟล์ Roblox ในแท็บใหม่ ✨
        </div>
      </div>
    </div>
  );
}
