"use server"

import prisma from "./prisma"

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const stock = Number.parseInt(formData.get("stock") as string)
    const image = formData.get("image") as string
    const categoryId = formData.get("categoryId") as string

    if (!name || !description || isNaN(price) || isNaN(stock)) {
      return { success: false, error: "Missing required fields" }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image: image || null,
        categoryId: categoryId || null,
      },
    })

    return { success: true, product }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, error: "Failed to create product" }
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, products }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}

export async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!product) {
      return { success: false, error: "Product not found" }
    }

    return { success: true, product }
  } catch (error) {
    console.error("Error fetching product:", error)
    return { success: false, error: "Failed to fetch product" }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const stock = Number.parseInt(formData.get("stock") as string)
    const image = formData.get("image") as string
    const categoryId = formData.get("categoryId") as string

    if (!name || !description || isNaN(price) || isNaN(stock)) {
      return { success: false, error: "Missing required fields" }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        image: image || null,
        categoryId: categoryId || null,
      },
    })

    return { success: true, product }
  } catch (error) {
    console.error("Error updating product:", error)
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: "Failed to delete product" }
  }
}

