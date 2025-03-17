"use server"

import prisma from "./prisma"

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string

    if (!name) {
      return { success: false, error: "Category name is required" }
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    })

    return { success: true, category }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: "Failed to create category" }
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return { success: true, categories }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { success: false, error: "Failed to fetch categories" }
  }
}

