import { logoutAdmin } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  await logoutAdmin()
  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"))
}

