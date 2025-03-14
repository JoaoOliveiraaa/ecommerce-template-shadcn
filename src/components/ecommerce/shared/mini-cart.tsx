"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"

export function MiniCart() {
  const { items, getSubtotal } = useCart()

  const calculateShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99
  }

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between">
        <Badge>{items.length} items</Badge>
      </div>
      <Separator className="my-4" />
      {items.length === 0 ? (
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
              {items.map((item) => (
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
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(getSubtotal() + calculateShipping()).toFixed(2)}</span>
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
  )
}

