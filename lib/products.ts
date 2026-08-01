export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  dimensions?: string;
  materials?: string;
  featured?: boolean;
}

export const categories = [
  { id: "all", name: "All Products" },
  { id: "coasters", name: "Coasters" },
  { id: "trays", name: "Serving Trays" },
  { id: "jewelry", name: "Jewelry" },
  { id: "wall-art", name: "Wall Art" },
  { id: "bookmarks", name: "Bookmarks" },
];

export const products: Product[] = [
  {
    id: "1", slug: "ocean-wave-coaster-set", name: "Ocean Wave Coaster Set", price: 48,
    description: "Set of 4 handcrafted resin coasters with stunning ocean wave design.",
    longDescription: "Each coaster is individually poured with premium epoxy resin, creating a unique ocean wave effect with vibrant blues, teals, and whites. No two coasters are exactly alike, making this set truly one of a kind. Food-safe and heat-resistant up to 120°F. Perfect for adding a coastal vibe to any home.",
    category: "coasters", images: ["https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=800&q=80", "https://images.unsplash.com/photo-1615799998603-7c6270a45196?w=800&q=80"],
    inStock: true, stockCount: 12, tags: ["coasters", "ocean", "blue", "set"],
    dimensions: '4" x 4" each, ¼" thick', materials: "Premium epoxy resin, alcohol inks, silicone mold", featured: true,
  },
  {
    id: "2", slug: "rose-gold-geode-tray", name: "Rose Gold Geode Serving Tray", price: 120,
    description: "Stunning geode-inspired serving tray with rose gold leaf accents.",
    longDescription: "This breathtaking serving tray features a hand-crafted geode design with real gold leaf accents and amethyst-inspired purple hues. Perfect as a decorative piece or functional tray for entertaining. Each tray is a wearable work of art — the geode pattern is unique to every pour.",
    category: "trays", images: ["https://images.unsplash.com/photo-1616485828858-b1b419e09db9?w=800&q=80"],
    inStock: true, stockCount: 5, tags: ["tray", "geode", "rose gold", "serving"],
    dimensions: '12" x 8" x ½"', materials: "Premium epoxy resin, gold leaf, alcohol inks, pine wood base", featured: true,
  },
  {
    id: "3", slug: "galaxy-earrings", name: "Galaxy Resin Earrings", price: 28,
    description: "Handmade resin earrings with a swirling galaxy of stars and nebula colors.",
    longDescription: "These lightweight resin earrings capture the beauty of the cosmos. Each pair features deep purples, midnight blues, and shimmering gold glitter that evokes a starry night sky. Hypoallergenic stainless steel hooks included. Packaged in a gift-ready box.",
    category: "jewelry", images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"],
    inStock: true, stockCount: 20, tags: ["earrings", "galaxy", "jewelry", "gift"],
    dimensions: '1.5" drop length', materials: "UV resin, glitter, alcohol inks, stainless steel hooks", featured: false,
  },
  {
    id: "4", slug: "sunset-wall-art", name: "Sunset Abstract Wall Art", price: 195, originalPrice: 240,
    description: "Large-format abstract wall art capturing a vibrant sunset over the horizon.",
    longDescription: "This large abstract wall panel is a show-stopping centerpiece for any room. The layered resin technique creates incredible depth and texture, with warm oranges, pinks, and golds blending into deep purples. Comes ready to hang with a sawtooth hanger. UV-resistant coating ensures colors stay vivid for years.",
    category: "wall-art", images: ["https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80"],
    inStock: true, stockCount: 2, tags: ["wall art", "sunset", "abstract", "large"],
    dimensions: '24" x 18" x ¾"', materials: "Premium epoxy resin, canvas, alcohol inks, UV topcoat", featured: true,
  },
  {
    id: "5", slug: "botanical-bookmark-set", name: "Botanical Bookmark Set", price: 22,
    description: "Set of 3 resin bookmarks with preserved real flowers and leaves.",
    longDescription: "Bring nature to your reading with these enchanting bookmarks. Each bookmark features real pressed flowers and greenery preserved in clear resin, creating a window into a tiny garden. Set includes 3 bookmarks with different botanical designs. Attached with gold ribbon tassel.",
    category: "bookmarks", images: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"],
    inStock: true, stockCount: 30, tags: ["bookmarks", "botanical", "flowers", "gift"],
    dimensions: '6" x 1.5" each', materials: "Crystal clear resin, pressed flowers, gold ribbon tassels", featured: false,
  },
  {
    id: "6", slug: "malachite-coasters", name: "Malachite Effect Coasters", price: 52,
    description: "Set of 4 coasters with a stunning green malachite stone effect.",
    longDescription: "These gorgeous coasters mimic the swirling, hypnotic patterns of real malachite gemstone. Deep emerald greens and forest tones swirl through each coaster with a glossy finish. Cork-backed for protection. Heat-resistant up to 120°F. Set of 4 with a linen gift bag.",
    category: "coasters", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
    inStock: true, stockCount: 8, tags: ["coasters", "malachite", "green", "set"],
    dimensions: '4" x 4" each, ¼" thick', materials: "Premium epoxy resin, alcohol inks, cork backing", featured: false,
  },
  {
    id: "7", slug: "hoop-earrings-marble", name: "Marble Resin Hoop Earrings", price: 32,
    description: "Elegant white and gold marble-effect resin hoop earrings.",
    longDescription: "Sophisticated and versatile, these marble-effect hoop earrings pair effortlessly with any outfit. The classic white and gold marbling is achieved through careful resin layering and pigment blending. Lightweight and comfortable for all-day wear. Packaged in a branded gift box.",
    category: "jewelry", images: ["https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80"],
    inStock: true, stockCount: 15, tags: ["earrings", "marble", "jewelry", "hoops"],
    dimensions: '1" diameter hoop', materials: "UV resin, gold pigment, stainless steel hooks", featured: false,
  },
  {
    id: "8", slug: "ocean-resin-tray", name: "Turquoise Ocean Tray", price: 98,
    description: "Breathtaking ocean-inspired tray with white foam and turquoise waves.",
    longDescription: "Bring the beach indoors with this stunning ocean-pour tray. Layers of turquoise, aqua, and deep blue are hand-mixed to create a realistic wave effect, complete with white foam tips. Perfect for a bathroom vanity, dresser, or entryway. Sealed with a scratch-resistant top coat.",
    category: "trays", images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"],
    inStock: false, stockCount: 0, tags: ["tray", "ocean", "turquoise", "beach"],
    dimensions: '10" x 6" x ½"', materials: "Premium epoxy resin, alcohol inks, pine wood base", featured: false,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
