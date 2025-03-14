"use client"

import Image from "next/image"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QuantitySelector } from "./quantity-selector"
import type { CartItem } from "@/hooks/use-cart"

interface CartItemProps {
  item: CartItem
  onRemove: (id: number) => void
  onUpdateQuantity: (id: number, type: "increase" | "decrease") => void
  showSeparator?: boolean
}

export function CartItemComponent({ item, onRemove, onUpdateQuantity, showSeparator = true }: CartItemProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:items-center">
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
              onClick={() => onRemove(item.id)}
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
            onIncrease={() => onUpdateQuantity(item.id, "increase")}
            onDecrease={() => onUpdateQuantity(item.id, "decrease")}
          />
        </div>
        <div className="flex items-center justify-between md:justify-center">
          <span className="md:hidden">Total:</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => onRemove(item.id)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      {showSeparator && <Separator className="col-span-6 my-2 md:hidden" />}
    </>
  )
}

