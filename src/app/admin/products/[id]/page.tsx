import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { ProductForm } from "@/components/admin/product-form"
import { getProductById } from "@/lib/admin-data"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Product</h3>
        <p className="text-sm text-muted-foreground">Update product information, images, and inventory.</p>
      </div>
      <Separator />
      <ProductForm product={product} />
    </div>
  )
}

