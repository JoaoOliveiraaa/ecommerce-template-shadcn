import { NextResponse } from "next/server"
import { seedAdminUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Criar usuário admin
    await seedAdminUser()

    // Criar categorias
    const categories = await prisma.category.findMany()
    if (categories.length === 0) {
      await prisma.category.createMany({
        data: [
          { name: "Electronics" },
          { name: "Clothing" },
          { name: "Home & Kitchen" },
          { name: "Books" },
          { name: "Toys" },
        ],
      })
      console.log("Categories created successfully")
    }

    // Criar produtos de exemplo
    const products = await prisma.product.findMany()
    if (products.length === 0) {
      const electronics = await prisma.category.findFirst({
        where: { name: "Electronics" },
      })

      const clothing = await prisma.category.findFirst({
        where: { name: "Clothing" },
      })

      if (electronics && clothing) {
        await prisma.product.createMany({
          data: [
            {
              name: "Smartphone XYZ",
              description: "Latest smartphone with amazing features",
              price: 1299.99,
              stock: 50,
              image: "https://placehold.co/600x400?text=Smartphone",
              categoryId: electronics.id,
            },
            {
              name: "Laptop Pro",
              description: "Powerful laptop for professionals",
              price: 2499.99,
              stock: 20,
              image: "https://placehold.co/600x400?text=Laptop",
              categoryId: electronics.id,
            },
            {
              name: "T-shirt Basic",
              description: "Comfortable cotton t-shirt",
              price: 29.99,
              stock: 100,
              image: "https://placehold.co/600x400?text=T-shirt",
              categoryId: clothing.id,
            },
          ],
        })
        console.log("Products created successfully")
      }
    }

    // Criar banners
    const banners = await prisma.banner.findMany()
    if (banners.length === 0) {
      await prisma.banner.createMany({
        data: [
          {
            title: "Summer Sale",
            description: "Up to 50% off on summer collection",
            image: "https://placehold.co/1200x400?text=Summer+Sale",
            location: "home",
            isActive: true,
            buttonText: "Shop Now",
            buttonLink: "/products?category=clothing",
          },
          {
            title: "New Electronics",
            description: "Check out our latest electronic products",
            image: "https://placehold.co/1200x400?text=New+Electronics",
            location: "home",
            isActive: true,
            buttonText: "Explore",
            buttonLink: "/products?category=electronics",
          },
          {
            title: "Special Offers",
            description: "Limited time offers on selected items",
            image: "https://placehold.co/1200x400?text=Special+Offers",
            location: "home",
            isActive: true,
            buttonText: "View Offers",
            buttonLink: "/products?sale=true",
          },
        ],
      })
      console.log("Banners created successfully")
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}

