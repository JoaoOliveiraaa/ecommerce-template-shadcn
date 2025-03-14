import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function EcommerceFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">MINISHOP</h3>
            <p className="text-sm text-muted-foreground">
              Quality products with minimalist design for your everyday needs.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shop</h3>
            <nav className="grid gap-2 text-sm">
              <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                All Products
              </Link>
              <Link href="/shop?category=new" className="text-muted-foreground hover:text-foreground">
                New Arrivals
              </Link>
              <Link href="/shop?category=bestsellers" className="text-muted-foreground hover:text-foreground">
                Best Sellers
              </Link>
              <Link href="/shop?category=sale" className="text-muted-foreground hover:text-foreground">
                Sale
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="grid gap-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customer Service</h3>
            <nav className="grid gap-2 text-sm">
              <Link href="/help" className="text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                Shipping & Returns
              </Link>
              <Link href="/size-guide" className="text-muted-foreground hover:text-foreground">
                Size Guide
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQs
              </Link>
            </nav>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2025 MINISHOP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
