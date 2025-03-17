import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function BannersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Banners</h2>
        <Button asChild>
          <Link href="/admin/banners/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Banner
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-full text-center">
          <p className="text-muted-foreground">No banners found. Add your first banner!</p>
        </div>
      </div>
    </div>
  )
}

