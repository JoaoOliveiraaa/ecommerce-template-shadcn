// Dados mockados para desenvolvimento
// Em produção, estes dados viriam de uma API ou banco de dados

export const products = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    description:
      "This minimalist desk lamp combines functionality with aesthetic appeal. The adjustable arm and energy-efficient LED light provide perfect illumination for your workspace.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
      { name: "Wood", value: "#A0522D" },
    ],
    sizes: [
      { name: "Small", value: "s" },
      { name: "Medium", value: "m" },
      { name: "Large", value: "l" },
    ],
    category: "Home",
    rating: 4.5,
    reviewCount: 128,
    stock: 15,
    isNew: false,
  },
  {
    id: 2,
    name: "Ergonomic Chair",
    price: 249.99,
    description:
      "Experience ultimate comfort with our ergonomic chair designed for long hours of sitting. Features adjustable height, lumbar support, and breathable mesh material.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: [
      { name: "Black", value: "black" },
      { name: "Gray", value: "gray" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Furniture",
    rating: 4.8,
    reviewCount: 95,
    stock: 8,
    isNew: false,
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: 79.99,
    description:
      "A compact, portable speaker with impressive sound quality. Features Bluetooth connectivity, 12-hour battery life, and water-resistant design.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "Black", value: "black" },
      { name: "Blue", value: "blue" },
      { name: "Red", value: "red" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Electronics",
    rating: 4.3,
    reviewCount: 67,
    stock: 20,
    isNew: true,
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 39.99,
    description:
      "Handcrafted genuine leather wallet with multiple card slots and a sleek, minimalist design. Perfect for everyday use.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "Brown", value: "brown" },
      { name: "Black", value: "black" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Accessories",
    rating: 4.6,
    reviewCount: 42,
    stock: 25,
    isNew: false,
  },
  {
    id: 5,
    name: "Ceramic Mug Set",
    price: 29.99,
    description: "Set of 4 minimalist ceramic mugs in neutral colors. Microwave and dishwasher safe.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Beige", value: "beige" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Kitchen",
    rating: 4.7,
    reviewCount: 36,
    stock: 18,
    isNew: false,
  },
  {
    id: 6,
    name: "Wireless Charger",
    price: 34.99,
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Features LED indicator and non-slip surface.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Electronics",
    rating: 4.4,
    reviewCount: 53,
    stock: 30,
    isNew: false,
  },
  {
    id: 7,
    name: "Cotton T-Shirt",
    price: 24.99,
    description:
      "Premium cotton t-shirt with a relaxed fit and minimalist design. Soft, breathable, and perfect for everyday wear.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "White", value: "white" },
      { name: "Black", value: "black" },
      { name: "Gray", value: "gray" },
      { name: "Navy", value: "navy" },
    ],
    sizes: [
      { name: "Small", value: "s" },
      { name: "Medium", value: "m" },
      { name: "Large", value: "l" },
      { name: "X-Large", value: "xl" },
    ],
    category: "Clothing",
    rating: 4.5,
    reviewCount: 78,
    stock: 45,
    isNew: false,
  },
  {
    id: 8,
    name: "Minimalist Watch",
    price: 89.99,
    description:
      "Elegant minimalist watch with a stainless steel case, premium leather strap, and Japanese quartz movement.",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    colors: [
      { name: "Silver", value: "silver" },
      { name: "Gold", value: "gold" },
      { name: "Black", value: "black" },
    ],
    sizes: [{ name: "Standard", value: "standard" }],
    category: "Accessories",
    rating: 4.9,
    reviewCount: 62,
    stock: 12,
    isNew: true,
  },
]

export const categories = [
  {
    id: "home",
    name: "Home & Decor",
    description: "Elevate your living space with our minimalist home decor collection.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 42,
  },
  {
    id: "furniture",
    name: "Furniture",
    description: "Functional, beautiful furniture designed for modern living.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 28,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Smart devices with clean design and intuitive functionality.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 35,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Everyday essentials with a touch of elegance.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 64,
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Cookware and utensils that combine form and function.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 31,
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Timeless wardrobe staples crafted from quality materials.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 47,
  },
]

export const featuredProducts = [
  {
    id: 1,
    name: "Headphones Pro",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Smart Watch Elite",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    discount: "New Arrival",
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    discount: "15% OFF",
  },
]

export function getProductById(id: number) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(id: number, limit = 4) {
  return products.filter((product) => product.id !== id).slice(0, limit)
}

export function getProductsByCategory(category: string) {
  if (category === "all") return products
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

