import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function ProductCard({ product, aspectRatio = "square", width = 300, height = 300 }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={width}
              height={height}
              className={`w-full object-cover transition-transform group-hover:scale-105 ${
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              }`}
            />
            {product.isNew && <Badge className="absolute right-2 top-2">New</Badge>}
          </div>
          <div className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            <div className="mt-2 flex gap-1">
              {product.colors.map((color) => (
                <div
                  key={color.value}
                  className="h-3 w-3 rounded-full border"
                  style={{
                    backgroundColor: color.value,
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

