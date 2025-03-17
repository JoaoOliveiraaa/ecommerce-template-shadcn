import { NextResponse } from "next/server"
import { mkdir } from "fs/promises"
import { join } from "path"
import { uploadFile } from "@/lib/upload"

// Garantir que o diretório de uploads exista
async function ensureUploadsDir() {
  const uploadsDir = join(process.cwd(), "public", "uploads")
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    console.error("Error creating uploads directory:", error)
  }
}

export async function POST(request: Request) {
  try {
    // Garantir que o diretório de uploads exista
    await ensureUploadsDir()

    // Processar o upload
    const formData = await request.formData()
    const result = await uploadFile(formData)

    if (result.success) {
      return NextResponse.json({ success: true, filePath: result.filePath })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error handling upload:", error)
    return NextResponse.json({ success: false, error: "Failed to process upload" }, { status: 500 })
  }
}

