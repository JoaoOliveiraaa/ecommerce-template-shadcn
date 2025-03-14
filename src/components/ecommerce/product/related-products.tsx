import type { Product } from "@/types"
import { ProductCard } from "./product-card"

interface RelatedProductsProps {
  title: string
  products: Product[]
}

export function RelatedProducts({ title, products }: RelatedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

