import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Package, Truck, RefreshCw } from "lucide-react";
import { getFeaturedProducts, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-800 to-pink-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Handcrafted with love
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Resin Art
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">That Pours</span>
              Your Soul
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg mb-8 leading-relaxed">
              Every piece is a one-of-a-kind creation — coasters, trays, jewelry, and wall art poured by hand in small batches.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/products" className="inline-flex items-center gap-2 bg-white text-purple-800 font-semibold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors shadow-lg">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products?category=coasters" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                View Coasters
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/30 to-pink-400/30 blur-xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image src="https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=800&q=80" alt="Featured resin coaster" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.slice(1).map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="flex-shrink-0 px-5 py-2 rounded-full border border-stone-200 text-sm font-medium text-stone-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Featured Pieces</h2>
            <p className="text-stone-500 mt-1">Hand-selected favorites from the studio</p>
          </div>
          <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="bg-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Package, title: "Carefully Packaged", desc: "Every order wrapped with care to arrive safely" },
              { icon: Truck, title: "Shipped with Love", desc: "3–5 business day processing for handmade items" },
              { icon: RefreshCw, title: "Hassle-Free Returns", desc: "Not in love? We'll make it right within 14 days" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="font-semibold text-base">{title}</h3>
                <p className="text-sm text-white/60 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-100 p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">Want something custom?</h2>
          <p className="text-stone-600 max-w-lg mx-auto mb-8">
            I take custom orders for colors, sizes, and designs. Let&apos;s create something uniquely yours — reach out and we&apos;ll chat about your vision.
          </p>
          <a href="mailto:hello@pourdecisionsresin.com" className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-7 py-3 rounded-full transition-colors shadow-md">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
