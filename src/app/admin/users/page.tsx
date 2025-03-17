import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"

export default async function UsersPage() {
  // Buscar usuários do banco de dados
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <div className="grid gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{user.name}</span>
                  <Badge variant={user.role === "ADMIN" ? "destructive" : "default"}>{user.role}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Joined on {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No users found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

