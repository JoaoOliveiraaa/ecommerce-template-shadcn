"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"
import { products } from "@/lib/data"
import { useState } from "react"

export default function WishlistPage() {
  const { toast } = useToast()
  // In a real app, this would be fetched from an API or database
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4))

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist",
    })
  }

  const handleAddToCart = (id: number) => {
    toast({
      title: "Added to cart",
      description: "The item has been added to your cart",
    })
  }

  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">Products you've saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Save items you love to your wishlist and revisit them anytime.
              </p>
            </div>
            <Button asChild>
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </Link>
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1" size="sm" onClick={() => handleAddToCart(product.id)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleRemoveFromWishlist(product.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </EcommerceLayout>
  )
}

