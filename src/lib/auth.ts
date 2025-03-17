"use server"

import { compare, hash } from "bcrypt"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import prisma from "./prisma"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const COOKIE_NAME = "admin_token"

// Login admin user
export async function loginAdmin(email: string, password: string): Promise<boolean> {
  try {
    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Se o usuário não existir ou não for admin, retornar falso
    if (!user || user.role !== "ADMIN") {
      return false
    }

    // Verificar senha
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return false
    }

    // Criar token JWT
    const secretKey = new TextEncoder().encode(JWT_SECRET)
    const token = await new SignJWT({ id: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secretKey)

    // Definir cookie
    cookies().set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    })

    return true
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

// Logout admin user
export async function logoutAdmin(): Promise<void> {
  cookies().delete(COOKIE_NAME)
}

// Seed admin user (para primeira execução)
export async function seedAdminUser(): Promise<void> {
  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    })

    if (existingAdmin) {
      return // Admin já existe
    }

    // Criar admin padrão
    const hashedPassword = await hash("admin123", 10)
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
        name: "Admin User",
        role: "ADMIN",
      },
    })

    console.log("Admin user created successfully")
  } catch (error) {
    console.error("Error seeding admin user:", error)
  }
}

