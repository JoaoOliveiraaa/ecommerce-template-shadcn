"use client"

import { Heart, Share2, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantitySelector } from "@/components/ecommerce/cart/quantity-selector"
import { ProductVariants } from "@/components/ecommerce/product/product-variants"
import type { Product } from "@/types"

interface ProductInfoProps {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
  onColorChange: (value: string) => void
  onSizeChange: (value: string) => void
  onQuantityChange: (type: "increase" | "decrease") => void
  onAddToCart: () => void
  onAddToWishlist: () => void
}

export function ProductInfo({
  product,
  quantity,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onQuantityChange,
  onAddToCart,
  onAddToWishlist,
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : i < product.rating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
        <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      <ProductVariants
        colors={product.colors}
        sizes={product.sizes}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
      />

      <div>
        <h3 className="mb-2 font-medium">Quantity</h3>
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => onQuantityChange("increase")}
          onDecrease={() => onQuantityChange("decrease")}
          maxQuantity={product.stock}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="flex-1" onClick={onAddToCart}>
          Add to Cart
        </Button>
        <Button variant="outline" onClick={onAddToWishlist}>
          <Heart className="mr-2 h-4 w-4" />
          Add to Wishlist
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4" />
          <span>Free shipping on orders over $50</span>
        </div>
      </div>
    </div>
  )
}

