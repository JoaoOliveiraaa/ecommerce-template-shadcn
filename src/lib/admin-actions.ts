"use server"

import { revalidatePath } from "next/cache"
import prisma from "./prisma"

// Save product (create or update)
export async function saveProduct(productData: any): Promise<void> {
  try {
    const { id, ...data } = productData

    // Converter arrays e objetos para strings JSON para armazenamento
    const productToSave = {
      ...data,
      images: JSON.stringify(data.images),
      colors: JSON.stringify(data.colors),
      sizes: JSON.stringify(data.sizes),
    }

    if (id) {
      // Atualizar produto existente
      await prisma.product.update({
        where: { id },
        data: productToSave,
      })
    } else {
      // Criar novo produto
      await prisma.product.create({
        data: productToSave,
      })
    }

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/products")
    revalidatePath("/shop")
    revalidatePath("/product/[id]")
  } catch (error) {
    console.error("Error saving product:", error)
    throw new Error("Failed to save product")
  }
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  try {
    await prisma.product.delete({
      where: { id },
    })

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/products")
    revalidatePath("/shop")
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw new Error("Failed to delete product")
  }
}

// Save category (create or update)
export async function saveCategory(categoryData: any): Promise<void> {
  try {
    const { id, ...data } = categoryData

    if (id) {
      // Atualizar categoria existente
      await prisma.category.update({
        where: { id },
        data,
      })
    } else {
      // Criar nova categoria
      await prisma.category.create({
        data,
      })
    }

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/categories")
    revalidatePath("/categories")
  } catch (error) {
    console.error("Error saving category:", error)
    throw new Error("Failed to save category")
  }
}

// Delete category
export async function deleteCategory(id: string): Promise<void> {
  try {
    await prisma.category.delete({
      where: { id },
    })

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/categories")
    revalidatePath("/categories")
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error)
    throw new Error("Failed to delete category")
  }
}

// Save banner (create or update)
export async function saveBanner(bannerData: any): Promise<void> {
  try {
    const { id, ...data } = bannerData

    if (id) {
      // Atualizar banner existente
      await prisma.banner.update({
        where: { id },
        data,
      })
    } else {
      // Criar novo banner
      await prisma.banner.create({
        data,
      })
    }

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/banners")
    revalidatePath("/")
  } catch (error) {
    console.error("Error saving banner:", error)
    throw new Error("Failed to save banner")
  }
}

// Delete banner
export async function deleteBanner(id: string): Promise<void> {
  try {
    await prisma.banner.delete({
      where: { id },
    })

    // Revalidar páginas para refletir mudanças
    revalidatePath("/admin/banners")
    revalidatePath("/")
  } catch (error) {
    console.error(`Error deleting banner ${id}:`, error)
    throw new Error("Failed to delete banner")
  }
}

