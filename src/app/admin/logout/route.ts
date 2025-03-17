import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  // Limpar o cookie
  cookies().delete("admin_token")

  // Redirecionar para a página de login
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"))
}

