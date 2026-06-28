"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");

  let filtered = getProductsByCategory(activeCategory);
  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">Shop All</h1>
        <p className="text-stone-500">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"} available</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat.id ? "bg-purple-700 text-white border-purple-700" : "bg-white text-stone-600 border-stone-200 hover:border-purple-400 hover:text-purple-700"
              }`}>
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-400" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-stone-400">
          <p className="text-lg font-medium">No products in this category yet.</p>
          <p className="text-sm mt-2">Check back soon or browse all products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10 text-stone-500">Loading products…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
