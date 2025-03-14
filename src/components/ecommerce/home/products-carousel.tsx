"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ecommerce/product/product-card"
import type { Product } from "@/types"

interface ProductsCarouselProps {
  title: string
  products: Product[]
}

export function ProductsCarousel({ title, products }: ProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = { mobile: 2, desktop: 4 }
  const maxIndex = products.length - itemsPerView.desktop

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <section className="container px-4 py-6 md:px-6 md:py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
      <div className="relative mt-6 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/2 flex-none px-2 md:w-1/4">
              <ProductCard product={product} width={200} height={200} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

