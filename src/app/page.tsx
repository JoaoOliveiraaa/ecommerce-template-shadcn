import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"
import { HeroBanner } from "@/components/ecommerce/home/hero-banner"
import { FeaturedCarousel } from "@/components/ecommerce/home/featured-carousel"
import { ProductsCarousel } from "@/components/ecommerce/home/products-carousel"
import { featuredProducts, products } from "@/lib/data"

export default function Home() {
  return (
    <EcommerceLayout>
      <HeroBanner />
      <FeaturedCarousel title="Featured Products" products={featuredProducts} />
      <ProductsCarousel title="Popular Products" products={products.slice(0, 6)} />

      {/* Stylish Section */}
      <section className="container px-4 py-6 md:px-6 md:py-12">
        <div className="rounded-xl bg-muted p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Our Design Philosophy</h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  We believe in creating products that combine functionality with aesthetic appeal. Each item is
                  carefully crafted with attention to detail and quality materials.
                </p>
              </div>
              <div>
                <button className="rounded-full border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                  Learn About Our Process
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Design Process"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Materials"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Craftsmanship"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Final Product"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </EcommerceLayout>
  )
}