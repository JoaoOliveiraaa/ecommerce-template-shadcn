import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Categories</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Browse our curated collection of minimalist products by category
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.id}`} className="group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-medium">{category.name}</h3>
                      <p className="mt-1 text-sm text-white/80">{category.itemCount} items</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Featured Collections</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/shop?collection=new-arrivals" className="group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="New Arrivals"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-medium">New Arrivals</h3>
                      <p className="mt-2 max-w-md text-white/80">
                        Discover our latest products, fresh from the design studio.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/shop?collection=bestsellers" className="group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      alt="Bestsellers"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-medium">Bestsellers</h3>
                      <p className="mt-2 max-w-md text-white/80">
                        Our most popular products loved by customers worldwide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  )
}