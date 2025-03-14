import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BannersTable } from "@/components/admin/banners-table"
import { getBanners } from "@/lib/admin-data"

export default async function BannersPage() {
  const banners = await getBanners()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Banners</h3>
          <p className="text-sm text-muted-foreground">Manage promotional banners and hero sections.</p>
        </div>
        <Button asChild>
          <Link href="/admin/banners/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Banner
          </Link>
        </Button>
      </div>
      <Separator />
      <BannersTable banners={banners} />
    </div>
  )
}

