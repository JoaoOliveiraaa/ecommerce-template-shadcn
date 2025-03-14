"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface CartSummaryProps {
  subtotal: number
  onCheckout: () => void
}

export function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

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
    return isPromoApplied ? subtotal * 0.2 : 0
  }

  const calculateShipping = () => {
    return subtotal > 50 ? 0 : 5.99
  }

  const calculateTotal = () => {
    return subtotal - calculateDiscount() + calculateShipping()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
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
        <Button className="w-full" onClick={onCheckout}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

