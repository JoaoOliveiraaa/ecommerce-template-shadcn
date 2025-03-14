import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EcommerceLayout from "@/components/ecommerce/layout/ecommerce-layout"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Alex founded MINISHOP with a vision to create beautiful, functional products that enhance everyday life.",
    },
    {
      name: "Sam Rivera",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sam leads our design team, ensuring every product meets our high standards for aesthetics and usability.",
    },
    {
      name: "Taylor Kim",
      role: "Product Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Taylor oversees product development, from initial concept to final production and quality control.",
    },
    {
      name: "Jordan Lee",
      role: "Customer Experience",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Jordan ensures our customers have the best possible experience with our products and services.",
    },
  ]

  return (
    <EcommerceLayout>
      <div className="container px-4 py-6 md:px-6 md:py-12">
        {/* Hero Section */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Story</h1>
            <p className="mt-4 text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              MINISHOP was founded in 2020 with a simple mission: to create beautiful, functional products that enhance
              everyday life. We believe that good design should be accessible to everyone, and that quality doesn't have
              to come with a premium price tag.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Our team of designers and craftspeople work together to create products that are both aesthetically
              pleasing and practical. We source sustainable materials whenever possible and ensure that our
              manufacturing processes are ethical and environmentally responsible.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="About MINISHOP"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Our Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 3 3 7-7" />
                  </svg>
                </div>
                <h3 className="mt-4 font-medium">Quality</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We never compromise on quality. Every product is designed to last and bring joy for years to come.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a1.93 1.93 0 0 0-.97 1.68v4.8a1.93 1.93 0 0 0 .97 1.68l3.65 1.9" />
                    <path d="m22 17.5-9.54 5.01a.98.98 0 0 1-.91 0l-9.54-5.01a.95.95 0 0 1 0-1.67L12 10.5l1.6.84" />
                    <path d="m20 11.5 2 1v-4.67a1.96 1.96 0 0 0-1-1.7l-3.38-1.9" />
                  </svg>
                </div>
                <h3 className="mt-4 font-medium">Sustainability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We're committed to sustainable practices, from material sourcing to packaging and shipping.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 10-4 4-4-4" />
                  </svg>
                </div>
                <h3 className="mt-4 font-medium">Simplicity</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We believe in the power of simplicity. Our designs are clean, functional, and timeless.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Our Team</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="mt-2 text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-lg bg-muted p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-2xl font-bold">Join Our Community</h2>
              <p className="mt-4 text-muted-foreground">
                Subscribe to our newsletter to stay updated on new products, special offers, and design inspiration.
              </p>
            </div>
            <div className="flex items-center">
              <Button asChild className="w-full md:w-auto">
                <Link href="/shop">Shop Our Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  )
}

