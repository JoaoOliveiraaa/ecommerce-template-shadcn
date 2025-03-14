export type Product = {
    id: number
    name: string
    price: number
    description: string
    images: string[]
    colors: { name: string; value: string }[]
    sizes: { name: string; value: string }[]
    category: string
    rating: number
    reviewCount: number
    stock: number
    isNew: boolean
  }
  
  export type Category = {
    id: string
    name: string
    description: string
    image: string
    itemCount: number
  }
  
  export type FeaturedProduct = {
    id: number
    name: string
    price: number
    image: string
    discount: string
  }
  