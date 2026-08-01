"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Package, Shield, Truck, Check } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ProductCard";
import { useState, use } from "react";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProduct(slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-purple-700 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100">
            <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white text-stone-800 font-semibold px-6 py-2 rounded-full">Sold Out</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-purple-600" : "border-stone-200 hover:border-stone-400"
                  }`}>
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-purple-600 capitalize mb-2">{product.category.replace("-", " ")}</p>
          <h1 className="text-3xl font-bold text-stone-900 mb-3">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold text-stone-900">${product.price}</span>
            {product.originalPrice && (<span className="text-xl text-stone-400 line-through">${product.originalPrice}</span>)}
            {product.originalPrice && (<span className="text-sm font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Save ${product.originalPrice - product.price}</span>)}
          </div>
          <p className="text-stone-600 leading-relaxed mb-6">{product.longDescription}</p>
          <div className="space-y-2 mb-6 text-sm text-stone-600">
            {product.dimensions && (<p><span className="font-medium text-stone-800">Dimensions:</span> {product.dimensions}</p>)}
            {product.materials && (<p><span className="font-medium text-stone-800">Materials:</span> {product.materials}</p>)}
            {product.inStock && product.stockCount <= 5 && (<p className="text-amber-600 font-medium">Only {product.stockCount} left in stock!</p>)}
          </div>
          <button onClick={handleAdd} disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-full font-semibold text-base transition-all duration-200 mb-4 ${
              !product.inStock ? "bg-stone-200 text-stone-400 cursor-not-allowed"
              : added ? "bg-green-500 text-white shadow-lg"
              : "bg-purple-700 hover:bg-purple-800 text-white shadow-md hover:shadow-lg"
            }`}>
            {added ? (<><Check className="w-5 h-5" /> Added to Cart!</>) : (<><ShoppingCart className="w-5 h-5" />{product.inStock ? "Add to Cart" : "Currently Unavailable"}</>)}
          </button>
          {added && (
            <Link href="/cart" className="block w-full text-center py-3 px-8 rounded-full font-semibold text-purple-700 border-2 border-purple-700 hover:bg-purple-50 transition-colors">
              View Cart & Checkout
            </Link>
          )}
          <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-3 gap-4 text-center text-xs text-stone-500">
            {[{icon: Package, label: "Secure packaging"}, {icon: Truck, label: "Ships in 3–5 days"}, {icon: Shield, label: "14-day returns"}].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 text-purple-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>
      )}
    </div>
  );
}
