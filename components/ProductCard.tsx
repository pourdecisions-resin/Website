"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {product.originalPrice && (<span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Sale</span>)}
      {!product.inStock && (<span className="absolute top-3 right-3 z-10 bg-stone-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Sold Out</span>)}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-60 bg-stone-100 overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Quick View
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-purple-600 font-medium capitalize mb-1">{product.category.replace("-", " ")}</p>
          <h3 className="text-sm font-semibold text-stone-800 mb-1 leading-snug">{product.name}</h3>
          <p className="text-xs text-stone-500 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-900">${product.price}</span>
              {product.originalPrice && (<span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>)}
            </div>
            <button onClick={handleAddToCart} disabled={!product.inStock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                !product.inStock ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : added ? "bg-green-500 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}>
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? "Added!" : product.inStock ? "Add" : "Sold Out"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
