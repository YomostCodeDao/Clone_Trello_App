// frontend/src/pages/DashboardPage/DashboardPage.tsx
"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/features/sidebar/ui"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Separator } from "@/shared/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar"
import { Plus, ChartNoAxesColumn, Users } from "lucide-react"
import { workspaceService } from "@/shared/api/services/workspaceService"
import type { Workspace } from "@/shared/types"

// Nếu backend có boards trong workspace, ta mở rộng type Workspace
interface Board {
  id: string
  name: string
  description?: string | null
  lists?: number
  members?: number
}

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<(Workspace & { boards?: Board[] })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkspaces() {
      try {
        const response = await workspaceService.getAll()
        console.log("Workspaces API response:", response)
        setWorkspaces(response.responseObject ?? [])
      } catch (error) {
        console.error("Failed to fetch workspaces:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkspaces() // gọi hàm async
  }, [])


  if (loading) {
    return <p className="text-center mt-10">Loading workspaces...</p>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        {/* Nội dung chính */}
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Manage your workspaces and boards
              </p>
            </div>
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" />
              New Workspace
            </Button>
          </div>

          {/* Workspaces List */}
          <div className="space-y-8">
            {workspaces.length === 0 ? (
              <p className="text-center text-muted-foreground">No workspaces found</p>
            ) : (
              workspaces.map((workspace) => (
                <div key={workspace.id} className="space-y-4">
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground text-xl">
                        🏢
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {workspace.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {workspace.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {workspace.boards?.length || 0} boards
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Board
                    </Button>
                  </div>

                  {/* Boards Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {workspace.boards?.map((board) => (
                      <Card
                        key={board.id}
                        className="cursor-pointer transition-all hover:shadow-md"
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <ChartNoAxesColumn className="h-5 w-5 text-muted-foreground mt-1" />
                            <div className="flex-1 space-y-1">
                              <CardTitle className="text-lg">
                                {board.name}
                              </CardTitle>
                              <CardDescription>
                                {board.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{board.lists ?? 0} lists</span>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{board.members ?? 0}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
