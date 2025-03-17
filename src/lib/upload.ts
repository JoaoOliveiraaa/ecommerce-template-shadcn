"use server"

import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function uploadFile(formData: FormData): Promise<{ success: boolean; filePath?: string; error?: string }> {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file uploaded" }
    }

    // Verificar o tipo de arquivo
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "Only image files are allowed" }
    }

    // Gerar um nome de arquivo único
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`

    // Criar o diretório de uploads se não existir
    const uploadsDir = join(process.cwd(), "public", "uploads")

    try {
      // Ler o arquivo como um array de bytes
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Salvar o arquivo no diretório de uploads
      const filePath = join(uploadsDir, fileName)
      await writeFile(filePath, buffer)

      // Retornar o caminho do arquivo
      return { success: true, filePath: `/uploads/${fileName}` }
    } catch (error) {
      console.error("Error saving file:", error)
      return { success: false, error: "Failed to save file" }
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}

