"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  maxQuantity?: number
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = Number.POSITIVE_INFINITY,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" onClick={onDecrease} disabled={quantity <= 1}>
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span className="w-12 text-center">{quantity}</span>
      <Button variant="outline" size="icon" onClick={onIncrease} disabled={quantity >= maxQuantity}>
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
      {maxQuantity < Number.POSITIVE_INFINITY && (
        <span className="ml-4 text-sm text-muted-foreground">{maxQuantity} available</span>
      )}
    </div>
  )
}

