export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* พื้นหลัง: รูปใหญ่ + ไล่สีทับ */}
      <div className="absolute inset-0">
        {/* รูป BG หลัก */}
        <div className="absolute inset-0 bg-[url('/images/Home.png')] bg-cover bg-center" />
        {/* เลเยอร์ไล่สีทับให้ตัวหนังสืออ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-pink-950/70" />
        {/* แสงชมพูฟุ้ง ๆ เพิ่มโทน Sweet Paradise */}
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      {/* เนื้อหาตรงกลางจอ */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="max-w-3xl text-center text-pink-50">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            Sweet Paradise • Hangout Map
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            แฮงเอาต์โซนที่สร้างจากความสุข
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-rose-400 bg-clip-text text-transparent">
              ไม่ใช่ดราม่าจากคนแปลกหน้า
            </span>
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-pink-100/85 md:text-base">
            Sweet Paradise เกิดจากความรักในแมพแนวแฮงเอาต์ของแอดมิน
            ที่เบื่อการวิ่งเล่นในแมพเดิม ๆ ที่ไม่อัปเดต
            ไม่มีอะไรให้ค้นหา นอกจากเดินคุยไปวัน ๆ
            แถมต้องทนฟังคำด่าจากคนแปลกหน้าที่ไม่รู้จักกันเลยสักนิด
            ผู้สร้างเลยตัดสินใจทำโลกใบใหม่ขึ้นมาเอง —
            โลกที่ตั้งใจให้เป็นพื้นที่ชิล ๆ
            ที่มีทั้งความสนุกและความปลอดภัยทางใจอยู่ด้วยกัน
          </p>

          <p className="mt-4 text-sm leading-relaxed text-pink-100/90 md:text-base">
            ที่นี่คือแมพที่คุณสามารถเข้ามานั่งเล่น
            แฮงเอาต์กับเพื่อน หรือทำความรู้จักคนใหม่ ๆ
            โดยไม่ต้องแลกสุขภาพจิตกับคำพูดแย่ ๆ
            จากคนแปลกหน้าอีกต่อไป
            ถ้าคุณกำลังมองหาที่พักใจใน Roblox…
            ยินดีต้อนรับสู่&nbsp;
            <span className="font-semibold text-pink-200">
              Sweet Paradise
            </span>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/tCX6vwwZxq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-7 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-500/40 transition hover:-translate-y-0.5 hover:shadow-pink-400/50"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-base">
                🍭
              </span>
              <span>เข้าดิสคอร์ด Sweet Paradise</span>
            </a>

            <a
              href="https://www.roblox.com/th/games/115633751220614/Sweet-paradise"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-pink-300/70 bg-black/60 px-6 py-2.5 text-sm font-medium text-pink-100 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-500/10"
            >
              <span className="text-base">▶</span>
              <span>เข้าเกม Sweet Paradise</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
