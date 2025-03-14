"use client"
import Link from "next/link"
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { MiniCart } from "@/components/ecommerce/shared/mini-cart"
import { useCart } from "@/hooks/use-cart"

export function EcommerceHeader() {
  const cartItemsCount = useCart((state) => state.getItemsCount())

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="hover:text-foreground/80">
                  Home
                </Link>
                <Link href="/shop" className="hover:text-foreground/80">
                  Shop
                </Link>
                <Link href="/categories" className="hover:text-foreground/80">
                  Categories
                </Link>
                <Link href="/about" className="hover:text-foreground/80">
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">MINISHOP</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-10">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="/shop" className="font-medium transition-colors hover:text-foreground/80">
              Shop
            </Link>
            <Link href="/categories" className="font-medium transition-colors hover:text-foreground/80">
              Categories
            </Link>
            <Link href="/about" className="font-medium transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:w-60 md:items-center md:gap-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md border-none bg-muted text-sm"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{cartItemsCount}</Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <MiniCart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="container flex md:hidden">
        <div className="flex w-full items-center gap-2 pb-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="h-9 w-full rounded-md border-none bg-muted text-sm" />
        </div>
      </div>
    </header>
  )
}

