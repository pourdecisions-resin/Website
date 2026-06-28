import Link from "next/link";
import { Heart, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-amber-300" />
              <span className="text-lg font-bold text-white">Pour Decisions</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">Handcrafted resin art made with love. Each piece is a one-of-a-kind creation poured by hand in small batches.</p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-stone-400 hover:text-pink-400 transition-colors" aria-label="Instagram"><Heart className="w-5 h-5" /></a>
              <a href="#" className="text-stone-400 hover:text-blue-400 transition-colors" aria-label="Website"><Globe className="w-5 h-5" /></a>
              <a href="mailto:hello@pourdecisionsresin.com" className="text-stone-400 hover:text-purple-400 transition-colors" aria-label="Email"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "All Products" },
                { href: "/products?category=coasters", label: "Coasters" },
                { href: "/products?category=trays", label: "Serving Trays" },
                { href: "/products?category=jewelry", label: "Jewelry" },
                { href: "/products?category=wall-art", label: "Wall Art" },
              ].map((l) => (<li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Orders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
              <li><a href="mailto:hello@pourdecisionsresin.com" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Pour Decisions Resin. All rights reserved.</p>
          <p>Handcrafted with love ✦</p>
        </div>
      </div>
    </footer>
  );
}
