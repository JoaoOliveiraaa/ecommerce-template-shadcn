import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// Rotas que não precisam de autenticação
const publicRoutes = ["/admin/login"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Se não for uma rota administrativa, permita o acesso
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Se for uma rota pública administrativa, permita o acesso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Verificar o token de autenticação
  const token = request.cookies.get("admin_token")?.value

  if (!token) {
    // Redirecionar para a página de login se não houver token
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    // Verificar se o token é válido
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
    const decoded = verify(token, JWT_SECRET) as { id: string; role: string }

    if (decoded.role !== "ADMIN") {
      // Redirecionar para a página de login se o usuário não for admin
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    // Permitir o acesso se o token for válido e o usuário for admin
    return NextResponse.next()
  } catch (error) {
    // Redirecionar para a página de login se o token for inválido
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

// Configurar o middleware para ser executado apenas nas rotas administrativas
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
}

