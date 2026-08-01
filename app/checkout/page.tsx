"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type FormData = {
  email: string; firstName: string; lastName: string;
  address: string; city: string; state: string; zip: string; country: string;
  cardNumber: string; cardExpiry: string; cardCVC: string;
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({ email: "", firstName: "", lastName: "", address: "", city: "", state: "", zip: "", country: "US", cardNumber: "", cardExpiry: "", cardCVC: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const shipping = total >= 75 ? 0 : 8.95;
  const orderTotal = total + shipping;

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.address.trim()) e.address = "Address required";
    if (!form.city.trim()) e.city = "City required";
    if (!form.state.trim()) e.state = "State required";
    if (!form.zip.trim()) e.zip = "ZIP code required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
    if (!form.cardExpiry.match(/^\d{2}\/\d{2}$/)) e.cardExpiry = "Format MM/YY";
    if (form.cardCVC.length < 3) e.cardCVC = "CVC required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "cardExpiry") formatted = value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");
    if (name === "cardCVC") formatted = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false); setSubmitted(true); clearCart();
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-3">Order Confirmed!</h1>
        <p className="text-stone-500 mb-2">Thank you for your order, {form.firstName}!</p>
        <p className="text-stone-500 mb-8 text-sm">A confirmation email has been sent to <strong>{form.email}</strong>. Your handcrafted piece will be carefully packaged and shipped within 3–5 business days.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">Nothing to check out</h1>
        <Link href="/products" className="text-purple-700 hover:underline">Browse the shop</Link>
      </div>
    );
  }

  const Field = ({ label, name, type = "text", placeholder, half = false }: { label: string; name: keyof FormData; type?: string; placeholder?: string; half?: boolean }) => (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
      <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-300 transition ${errors[name] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white"}`} />
      {errors[name] && <p className="text-xs text-rose-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-purple-700 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email Address" name="email" type="email" placeholder="you@example.com" />
            </div>
          </section>
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" name="firstName" placeholder="Jane" half />
              <Field label="Last Name" name="lastName" placeholder="Smith" half />
              <Field label="Street Address" name="address" placeholder="123 Main St" />
              <Field label="City" name="city" placeholder="Portland" half />
              <Field label="State" name="state" placeholder="OR" half />
              <Field label="ZIP Code" name="zip" placeholder="97201" half />
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-stone-600 mb-1">Country</label>
                <select name="country" value={form.country} onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-base font-bold text-stone-800 mb-1">Payment</h2>
            <p className="text-xs text-stone-400 mb-4 flex items-center gap-1"><Lock className="w-3 h-3" /> Secured with 256-bit SSL encryption</p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Card Number" name="cardNumber" placeholder="1234 5678 9012 3456" />
              <Field label="Expiry Date" name="cardExpiry" placeholder="MM/YY" half />
              <Field label="CVC" name="cardCVC" placeholder="123" half />
            </div>
          </section>
          <button type="submit" disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full font-semibold text-base transition-all duration-200 shadow-md ${
              loading ? "bg-purple-400 text-white cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 text-white hover:shadow-lg"
            }`}>
            {loading ? (<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing…</>) : (<><Lock className="w-4 h-4" /> Place Order — ${orderTotal.toFixed(2)}</>)}
          </button>
        </form>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-base font-bold text-stone-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium text-stone-800 truncate">{product.name}</p></div>
                  <span className="text-xs font-semibold text-stone-800">${(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-stone-600"><span>Shipping</span><span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-base border-t border-stone-100 pt-3 mt-2"><span>Total</span><span>${orderTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
