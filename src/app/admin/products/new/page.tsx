import { Separator } from "@/components/ui/separator"
import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add New Product</h3>
        <p className="text-sm text-muted-foreground">
          Create a new product with details, images, and inventory information.
        </p>
      </div>
      <Separator />
      <ProductForm />
    </div>
  )
}

