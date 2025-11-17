import "./globals.css"; 
import Nav from "@/components/Nav/Nav";

export const metadata = {
  title: "Sweet Paradise Hub",
  description: "เว็บรวมข้อมูลแมพ Sweet Paradise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-black text-gray-100">
        <Nav />
        <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
          <div className="px-4 py-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
