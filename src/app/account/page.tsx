"use client"

import { useState } from "react"
import { CreditCard, Heart, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and view orders</p>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-4">
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-9">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="(123) 456-7890"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                      <div key={order} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order #{order * 1000}</p>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(Date.now() - order * 86400000).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(order * 50).toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              {order === 1 ? "Delivered" : order === 2 ? "Shipped" : "Processing"}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>Products you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="rounded-lg border p-2">
                        <div className="aspect-square w-full bg-muted"></div>
                        <div className="p-2">
                          <h3 className="font-medium">Product Name {item}</h3>
                          <p className="text-sm text-muted-foreground">${(item * 25).toFixed(2)}</p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" className="w-full">
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CreditCard className="h-8 w-8" />
                          <div>
                            <p className="font-medium">Visa ending in 1234</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button>Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                      <div className="h-4 w-4 translate-x-5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Preferences</p>
                      <p className="text-sm text-muted-foreground">Receive marketing emails about new products</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-muted p-1">
                      <div className="h-4 w-4 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                  <Separator />
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </EcommerceLayout>
  )
}

