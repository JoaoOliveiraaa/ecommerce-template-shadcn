"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ColorOption {
  name: string
  value: string
}

interface SizeOption {
  name: string
  value: string
}

interface ProductVariantsProps {
  colors: ColorOption[]
  sizes: SizeOption[]
  selectedColor: string
  selectedSize: string
  onColorChange: (value: string) => void
  onSizeChange: (value: string) => void
}

export function ProductVariants({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: ProductVariantsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium">Color</h3>
        <RadioGroup value={selectedColor} onValueChange={onColorChange} className="flex gap-2">
          {colors.map((color) => (
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
        <RadioGroup value={selectedSize} onValueChange={onSizeChange} className="flex gap-2">
          {sizes.map((size) => (
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
    </div>
  )
}

