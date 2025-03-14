import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${category.id}`} className="group">
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
  )
}

