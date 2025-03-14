"use client"

import { useState } from "react"

import { use } from "react"
import Link from "next/link"
import { ChevronLeft, Heart, Share2, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ProductGallery } from "@/components/ecommerce/product/product-gallery"
import { QuantitySelector } from "@/components/ecommerce/cart/quantity-selector"
import { ProductCard } from "@/components/ecommerce/product/product-card"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"

export default function ProductDetail({ params }: { params: { id: string } }) {
  // Use React.use to unwrap params
  const unwrappedParams = use(params)
  const productId = Number.parseInt(unwrappedParams.id)
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId, 4)

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.value || "black")
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.value || "m")
  const [quantity, setQuantity] = useState(1)

  const { toast } = useToast()
  const { addItem } = useCart()

  if (!product) {
    return (
      <EcommerceLayout>
        <div className="container flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
      </EcommerceLayout>
    )
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => Math.min(prev + 1, product.stock))
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1))
    }
  }

  const handleAddToCart = () => {
    const selectedColorName = product.colors.find((c) => c.value === selectedColor)?.name || ""
    const selectedSizeName = product.sizes.find((s) => s.value === selectedSize)?.name || ""

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColorName,
      size: selectedSizeName,
      quantity: quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedColorName}, ${selectedSizeName})`,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
  }

  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <Link
          href="/shop"
          className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
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

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Color</h3>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
                  {product.colors.map((color) => (
                    <div key={color.value} className="flex items-center space-x-2">
                      <RadioGroupItem id={`color-${color.value}`} value={color.value} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color.value}`}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 peer-data-[state=checked]:border-primary"
                      >
                        <span className="h-8 w-8 rounded-full" style={{ backgroundColor: color.value }} />
                        <span className="sr-only">{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Size</h3>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex gap-2">
                  {product.sizes.map((size) => (
                    <div key={size.value} className="flex items-center space-x-2">
                      <RadioGroupItem id={`size-${size.value}`} value={size.value} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size.value}`}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-2 peer-data-[state=checked]:border-primary"
                      >
                        {size.name.charAt(0).toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => handleQuantityChange("increase")}
                  onDecrease={() => handleQuantityChange("decrease")}
                  maxQuantity={product.stock}
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="flex-1" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={handleAddToWishlist}>
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
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-4 space-y-4">
              <ul className="grid gap-2 md:grid-cols-2">
                {[
                  "Adjustable arm for versatile positioning",
                  "Energy-efficient LED light",
                  "Touch-sensitive controls",
                  "USB charging port",
                  "5-year warranty",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
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
                      className="h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <div className="grid gap-2">
                {Object.entries({
                  Dimensions: "12 x 6 x 18 inches",
                  Weight: "2.5 lbs",
                  Material: "Aluminum and plastic",
                  "Color Temperature": "3000K-6000K (adjustable)",
                  "Power Source": "AC adapter (included)",
                  Wattage: "9W",
                }).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-2 border-b py-2">
                    <div className="font-medium">{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
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
                    <span className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>
              <Separator />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${j < 5 - i ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm">
                      {i === 0
                        ? "This lamp is perfect for my workspace. The adjustable arm allows me to position the light exactly where I need it, and the touch controls are very responsive."
                        : i === 1
                          ? "Great design and functionality. The USB port is a nice bonus feature that I use all the time."
                          : "Good quality for the price. Shipping was fast and the lamp was easy to set up."}
                    </p>
                    <Separator />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </EcommerceLayout>
  )
}

