import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pour Decisions Resin | Handcrafted Resin Art",
  description: "Shop handcrafted resin art including coasters, serving trays, jewelry, wall art, and bookmarks. Each piece is one-of-a-kind.",
  keywords: "resin art, handmade, coasters, serving tray, resin jewelry, wall art",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-stone-50`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
