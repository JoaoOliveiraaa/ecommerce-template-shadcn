import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Tag, ImageIcon, Settings, Users, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { checkAdminAuth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Admin Dashboard - MINISHOP",
  description: "Admin dashboard for MINISHOP e-commerce platform",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar se o usuário está autenticado como administrador
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="font-bold">
              MINISHOP ADMIN
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank">
                View Store
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6">
            <nav className="grid items-start gap-2">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Products
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button variant="ghost" className="w-full justify-start">
                  <Tag className="mr-2 h-4 w-4" />
                  Categories
                </Button>
              </Link>
              <Link href="/admin/banners">
                <Button variant="ghost" className="w-full justify-start">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Banners
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

