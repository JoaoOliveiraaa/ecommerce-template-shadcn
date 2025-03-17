import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Obter os modelos disponíveis
    const models = Object.keys(prisma).filter(
      (key) => !key.startsWith("_") && typeof prisma[key as keyof typeof prisma] === "object",
    )

    // Verificar se os modelos existem
    const modelExists = {
      user: models.includes("user"),
      product: models.includes("product"),
      category: models.includes("category"),
      banner: models.includes("banner"),
    }

    return NextResponse.json({
      models,
      modelExists,
      message: "Schema check completed",
    })
  } catch (error) {
    console.error("Error checking schema:", error)
    return NextResponse.json({ error: "Failed to check schema" }, { status: 500 })
  }
}

