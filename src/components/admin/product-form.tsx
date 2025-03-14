"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2, Upload, Plus, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { saveProduct } from "@/lib/admin-actions"
import { getCategories } from "@/lib/admin-data"

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().nonnegative("Stock must be 0 or positive"),
  isActive: z.boolean().default(true),
  isNew: z.boolean().default(false),
  colors: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .min(1, "At least one color is required"),
  sizes: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .min(1, "At least one size is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: any
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<any[]>([])
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch categories when component mounts
  useState(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  const defaultValues: Partial<ProductFormValues> = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    isActive: product?.isActive ?? true,
    isNew: product?.isNew ?? false,
    colors: product?.colors || [{ name: "Black", value: "black" }],
    sizes: product?.sizes || [{ name: "Medium", value: "m" }],
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)
    try {
      // Combine form data with images
      const productData = {
        ...data,
        images,
        id: product?.id,
      }

      await saveProduct(productData)

      toast({
        title: product ? "Product updated" : "Product created",
        description: product
          ? "The product has been updated successfully."
          : "The new product has been created successfully.",
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // In a real app, you would upload these files to a storage service
    // For this demo, we'll just create URLs for the selected files
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages([...images, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addColor = () => {
    const colors = form.getValues("colors") || []
    form.setValue("colors", [...colors, { name: "", value: "" }])
  }

  const removeColor = (index: number) => {
    const colors = form.getValues("colors") || []
    form.setValue(
      "colors",
      colors.filter((_, i) => i !== index),
    )
  }

  const addSize = () => {
    const sizes = form.getValues("sizes") || []
    form.setValue("sizes", [...sizes, { name: "", value: "" }])
  }

  const removeSize = (index: number) => {
    const sizes = form.getValues("sizes") || []
    form.setValue(
      "sizes",
      sizes.filter((_, i) => i !== index),
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description" className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>This product will appear in the store</FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>New</FormLabel>
                      <FormDescription>Mark as a new product</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="mb-4 font-medium">Product Images</h4>
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed">
                  <Upload className="mb-2 h-6 w-6" />
                  <span className="text-xs">Upload Image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} multiple />
                </label>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium">Colors</h4>
                <Button type="button" variant="outline" size="sm" onClick={addColor}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Color
                </Button>
              </div>

              {form.watch("colors")?.map((_, index) => (
                <div key={index} className="mb-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`colors.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Color Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Color name (e.g. Black)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end gap-2">
                    <FormField
                      control={form.control}
                      name={`colors.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">Color Value</FormLabel>
                          <FormControl>
                            <Input placeholder="Color value (e.g. #000000)" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeColor(index)}
                      disabled={form.watch("colors").length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-medium">Sizes</h4>
                <Button type="button" variant="outline" size="sm" onClick={addSize}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Size
                </Button>
              </div>

              {form.watch("sizes")?.map((_, index) => (
                <div key={index} className="mb-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Size Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Size name (e.g. Medium)" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end gap-2">
                    <FormField
                      control={form.control}
                      name={`sizes.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="sr-only">Size Value</FormLabel>
                          <FormControl>
                            <Input placeholder="Size value (e.g. m)" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSize(index)}
                      disabled={form.watch("sizes").length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

