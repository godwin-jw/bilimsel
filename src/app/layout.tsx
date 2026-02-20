import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 1. Footer'ı buraya çağırıyoruz

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bilimsel Araştırma Grubu",
  description: "Bilimsel makaleler, projeler ve duyurular platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-[#0b0f1a] text-gray-100 flex flex-col min-h-screen`}>
        {/* Navbar en tepede */}
        <Navbar />
        
        {/* İçerik ortada ve genişleyebilir */}
        <main className="grow">
          {children}
        </main>
        
        {/* Footer en altta */}
        <Footer /> 
      </body>
    </html>
  );
}