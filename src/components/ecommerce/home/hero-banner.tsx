import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <section className="container px-4 py-6 md:px-6 md:py-12">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 p-6 md:p-10">
        <div className="grid gap-2 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Spring Collection</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Discover our new arrivals with up to 30% off. Limited time offer.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=400&width=400"
              width={400}
              height={400}
              alt="Banner Image"
              className="mx-auto aspect-square rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
