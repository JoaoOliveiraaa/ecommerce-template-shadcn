"use server"

import prisma from "./prisma"

export async function createBanner(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string
    const location = formData.get("location") as string
    const isActive = formData.get("isActive") === "on"
    const buttonText = formData.get("buttonText") as string
    const buttonLink = formData.get("buttonLink") as string

    if (!title || !image) {
      return { success: false, error: "Title and image are required" }
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        description: description || null,
        image,
        location: location || "home",
        isActive,
        buttonText: buttonText || null,
        buttonLink: buttonLink || null,
      },
    })

    return { success: true, banner }
  } catch (error) {
    console.error("Error creating banner:", error)
    return { success: false, error: "Failed to create banner" }
  }
}

export async function getBanners() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, banners }
  } catch (error) {
    console.error("Error fetching banners:", error)
    return { success: false, error: "Failed to fetch banners" }
  }
}

