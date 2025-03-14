import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"

export default function OrderConfirmationPage() {
  // In a real app, you would get the order details from a database or API
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  const orderDate = new Date().toLocaleDateString()

  return (
    <EcommerceLayout>
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">Thank You for Your Order!</h1>
          <p className="mt-4 text-muted-foreground">
            Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium">Order Details</h2>
                    <p className="text-sm text-muted-foreground">Order #{orderNumber}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Placed on {orderDate}</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Order Received</h3>
                      <p className="text-sm text-muted-foreground">
                        Your order has been received and is being processed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Your order will be shipped within 1-2 business days
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">
                    John Doe
                    <br />
                    123 Main Street
                    <br />
                    Anytown, CA 12345
                    <br />
                    United States
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">Credit Card (ending in 1234)</p>
                </div>

                <div className="flex justify-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/account/orders">View Order History</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EcommerceLayout>
  )
}

