import type React from "react"
import { EcommerceHeader } from "./ecommerce-header"
import { EcommerceFooter } from "./ecommerce-footer"

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <EcommerceHeader />
      <main className="flex-1">{children}</main>
      <EcommerceFooter />
    </div>
  )
}

