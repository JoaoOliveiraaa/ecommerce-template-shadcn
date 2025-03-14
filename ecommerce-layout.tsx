"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Minimalist Desk Lamp",
      price: 49.99,
      image: "/placeholder.svg?height=80&width=80",
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Ceramic Mug Set",
      price: 29.99,
      image: "/placeholder.svg?height=80&width=80",
      color: "White",
      size: "S",
      quantity: 2,
    },
  ])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
                  <Link href="/deals" className="hover:text-foreground/80">
                    Deals
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
              <Link href="/deals" className="font-medium transition-colors hover:text-foreground/80">
                Deals
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
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                    {cartItems.length}
                  </Badge>
                  <span className="sr-only">Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <Badge>{cartItems.length} items</Badge>
                  </div>
                  <Separator className="my-4" />
                  {cartItems.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                      <div className="text-center">
                        <h3 className="text-lg font-medium">Your cart is empty</h3>
                        <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
                      </div>
                      <Button asChild className="mt-4">
                        <Link href="/shop">Browse Products</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto">
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="h-20 w-20 overflow-hidden rounded-md">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col justify-between">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.color} · Size {item.size}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm">
                                    ${item.price.toFixed(2)} × {item.quantity}
                                  </p>
                                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto space-y-4">
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{calculateTotal() > 50 ? "Free" : "$5.99"}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>${(calculateTotal() + (calculateTotal() > 50 ? 0 : 5.99)).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Button asChild>
                            <Link href="/cart">View Cart</Link>
                          </Button>
                          <Button variant="outline">Checkout</Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="container flex md:hidden">
          <div className="flex w-full items-center gap-2 pb-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md border-none bg-muted text-sm"
            />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">MINISHOP</h3>
              <p className="text-sm text-muted-foreground">
                Quality products with minimalist design for your everyday needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Shop</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
                <Link href="/shop?category=new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
                <Link href="/shop?category=bestsellers" className="text-muted-foreground hover:text-foreground">
                  Best Sellers
                </Link>
                <Link href="/shop?category=sale" className="text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Customer Service</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Shipping & Returns
                </Link>
                <Link href="/size-guide" className="text-muted-foreground hover:text-foreground">
                  Size Guide
                </Link>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </nav>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">© 2025 MINISHOP. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

