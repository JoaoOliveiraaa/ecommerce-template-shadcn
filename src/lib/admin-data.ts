"use server"

import prisma from "./prisma"

// Get store statistics
export async function getStoreStats() {
  // Em uma aplicação real, você buscaria esses dados do banco de dados
  // Por enquanto, vamos retornar dados mockados
  return {
    revenue: 12589.99,
    revenueIncrease: 12,
    orders: 156,
    ordersIncrease: 8,
    products: await prisma.product.count(),
    activeProducts: await prisma.product.count({ where: { isActive: true } }),
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
}

// Get all products
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })

    // Converter strings JSON para objetos
    return products.map((product) => ({
      ...product,
      images: JSON.parse(product.images),
      colors: JSON.parse(product.colors),
      sizes: JSON.parse(product.sizes),
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Get product by ID
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) return null

    // Converter strings JSON para objetos
    return {
      ...product,
      images: JSON.parse(product.images),
      colors: JSON.parse(product.colors),
      sizes: JSON.parse(product.sizes),
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

// Get all categories
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Get category by ID
export async function getCategoryById(id: string) {
  try {
    return await prisma.category.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error)
    return null
  }
}

// Get all banners
export async function getBanners() {
  try {
    return await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error fetching banners:", error)
    return []
  }
}

// Get banner by ID
export async function getBannerById(id: string) {
  try {
    return await prisma.banner.findUnique({
      where: { id },
    })
  } catch (error) {
    console.error(`Error fetching banner ${id}:`, error)
    return null
  }
}

