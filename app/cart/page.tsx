"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">
        Your Cart <span className="text-stone-400 text-xl font-normal">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-stone-800 hover:text-purple-700 transition-colors line-clamp-2">{product.name}</Link>
                <p className="text-xs text-purple-600 capitalize mt-0.5">{product.category.replace("-", " ")}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 border border-stone-200 rounded-full px-1 py-0.5">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600" aria-label="Decrease quantity">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-stone-800">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-600" aria-label="Increase quantity">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-stone-900">${(product.price * quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(product.id)} className="text-stone-300 hover:text-rose-500 transition-colors" aria-label="Remove item">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-stone-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-stone-600">
                  <span className="truncate max-w-[160px]">{product.name} × {quantity}</span>
                  <span className="font-medium text-stone-800">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span><span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">{total >= 75 ? "FREE" : "Calculated at checkout"}</span>
              </div>
              {total < 75 && (<p className="text-xs text-stone-400 mt-1">Free shipping on orders over $75!</p>)}
            </div>
            <div className="border-t border-stone-100 mt-4 pt-4 flex justify-between font-bold text-base">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="mt-5 w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3.5 px-6 rounded-full transition-colors shadow-md">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="mt-3 w-full flex items-center justify-center text-sm text-stone-500 hover:text-purple-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
