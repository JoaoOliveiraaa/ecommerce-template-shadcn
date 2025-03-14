"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { QuantitySelector } from "@/components/ecommerce/cart/quantity-selector"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

export default function CartPage() {
  const { toast } = useToast()
  const { items, removeItem, updateQuantity, getSubtotal } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const handleRemoveItem = (id: number) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setIsPromoApplied(true)
      toast({
        title: "Promo code applied",
        description: "20% discount has been applied to your order",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code",
        variant: "destructive",
      })
    }
  }

  const calculateDiscount = () => {
    return isPromoApplied ? getSubtotal() * 0.2 : 0
  }

  const calculateShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99
  }

  const calculateTotal = () => {
    return getSubtotal() - calculateDiscount() + calculateShipping()
  }

  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Link
            href="/shop"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Button asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-lg border">
                <div className="p-4">
                  <div className="hidden md:grid md:grid-cols-6 md:gap-4 md:px-4 md:py-2">
                    <div className="col-span-3 font-medium">Product</div>
                    <div className="font-medium">Price</div>
                    <div className="font-medium">Quantity</div>
                    <div className="font-medium">Total</div>
                  </div>
                  <Separator className="my-4 hidden md:block" />
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-center">
                        <div className="col-span-3 flex items-center gap-4">
                          <div className="h-20 w-20 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="mt-1 text-sm text-muted-foreground">
                              <span>{item.color}</span>
                              <span className="mx-1">·</span>
                              <span>Size {item.size}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-auto p-0 text-sm text-muted-foreground hover:text-destructive md:hidden"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="md:text-center">${item.price.toFixed(2)}</div>
                        <div>
                          <QuantitySelector
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.id, "increase")}
                            onDecrease={() => updateQuantity(item.id, "decrease")}
                          />
                        </div>
                        <div className="flex items-center justify-between md:justify-center">
                          <span className="md:hidden">Total:</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:inline-flex"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <Separator className="col-span-6 my-2 md:hidden" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {isPromoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{calculateShipping() === 0 ? "Free" : `$${calculateShipping().toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo-code"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isPromoApplied}
                      />
                      <Button variant="outline" onClick={handleApplyPromo} disabled={isPromoApplied || !promoCode}>
                        Apply
                      </Button>
                    </div>
                    {isPromoApplied && <p className="text-xs text-green-600">Promo code applied successfully!</p>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </EcommerceLayout>
  )
}

