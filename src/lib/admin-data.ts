"use server"

import { products, categories } from "@/lib/data"

// Mock data for admin dashboard
const mockStoreStats = {
  revenue: 12589.99,
  revenueIncrease: 12,
  orders: 156,
  ordersIncrease: 8,
  products: 48,
  activeProducts: 42,
  customers: 1243,
  customersIncrease: 14,
  recentSales: [
    { customer: "John Doe", email: "john@example.com", amount: 125.99 },
    { customer: "Jane Smith", email: "jane@example.com", amount: 249.99 },
    { customer: "Robert Johnson", email: "robert@example.com", amount: 79.99 },
    { customer: "Emily Davis", email: "emily@example.com", amount: 149.99 },
    { customer: "Michael Brown", email: "michael@example.com", amount: 34.99 },
  ],
  popularProducts: [
    { name: "Minimalist Desk Lamp", category: "Home", sales: 42 },
    { name: "Wireless Earbuds", category: "Electronics", sales: 38 },
    { name: "Ergonomic Chair", category: "Furniture", sales: 27 },
    { name: "Leather Wallet", category: "Accessories", sales: 23 },
    { name: "Cotton T-Shirt", category: "Clothing", sales: 19 },
  ],
}

// Mock banners data
const mockBanners = [
  {
    id: "1",
    title: "Spring Collection",
    description: "Discover our new arrivals with up to 30% off. Limited time offer.",
    image: "/placeholder.svg?height=400&width=400",
    location: "Home Hero",
    isActive: true,
    buttonText: "Shop Now",
    buttonLink: "/shop",
  },
  {
    id: "2",
    title: "Summer Sale",
    description: "Get up to 50% off on selected items.",
    image: "/placeholder.svg?height=400&width=400",
    location: "Shop Page",
    isActive: false,
    buttonText: "View Deals",
    buttonLink: "/shop?category=sale",
  },
]

// Get store statistics
export async function getStoreStats() {
  // In a real app, this would fetch data from a database
  return mockStoreStats
}

// Get all products
export async function getProducts() {
  // In a real app, this would fetch data from a database
  return products.map((product) => ({
    ...product,
    isActive: true,
  }))
}

// Get product by ID
export async function getProductById(id: string) {
  // In a real app, this would fetch data from a database
  const productId = Number.parseInt(id)
  return products.find((product) => product.id === productId)
}

// Get all categories
export async function getCategories() {
  // In a real app, this would fetch data from a database
  return categories
}

// Get category by ID
export async function getCategoryById(id: string) {
  // In a real app, this would fetch data from a database
  return categories.find((category) => category.id === id)
}

// Get all banners
export async function getBanners() {
  // In a real app, this would fetch data from a database
  return mockBanners
}

// Get banner by ID
export async function getBannerById(id: string) {
  // In a real app, this would fetch data from a database
  return mockBanners.find((banner) => banner.id === id)
}

