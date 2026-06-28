"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/products", label: "Shop" },
    { href: "/products?category=coasters", label: "Coasters" },
    { href: "/products?category=trays", label: "Trays" },
    { href: "/products?category=jewelry", label: "Jewelry" },
    { href: "/products?category=wall-art", label: "Wall Art" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-amber-300" />
            <span className="text-xl font-bold text-stone-800 tracking-tight group-hover:text-purple-700 transition-colors">Pour Decisions</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-stone-600 hover:text-purple-700 transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-100 hover:bg-purple-100 transition-colors group">
              <ShoppingCart className="w-5 h-5 text-stone-600 group-hover:text-purple-700 transition-colors" />
              <span className="text-sm font-medium text-stone-600 group-hover:text-purple-700 transition-colors hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded-full flex items-center justify-center">{itemCount}</span>
              )}
            </Link>
            <button className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-stone-700 hover:text-purple-700 transition-colors py-1" onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
