// frontend/src/features/sidebar/ui/sidebar.tsx
"use client"

import { Kanban, LayoutDashboard } from "lucide-react"
import { NavMain } from "./sidebar-main"
import { NavUser } from "./sidebar-user"
import { TeamSwitcher } from "./sidebar-switcher"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,
} from "@/shared/ui/sidebar"

import type { Workspace } from "@/shared/types"
import { useEffect, useState } from "react"
import { workspaceService } from "@/shared/api/services/workspaceService"
import { tokenStorage } from "@/shared/utils/tokenStorage"

interface WorkspaceWithLogo extends Workspace {
  logo: React.ElementType
}

const navMain = [
  {
    title: "All Boards",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [workspaces, setWorkspaces] = useState<WorkspaceWithLogo[]>([])
  const user = tokenStorage.getUser()

  useEffect(() => {
    let isMounted = true

    const fetchWorkspaces = async () => {
      try {
        const response = await workspaceService.getAll()
        console.log("Workspaces API response:", response)

        const raw = response?.responseObject
        if (isMounted && Array.isArray(raw)) {
          const workspacesData = raw.map((workspace) => ({
            ...workspace,
            logo: Kanban,
          }))
          setWorkspaces(workspacesData)
        } else {
          console.warn("Workspaces response is not an array:", raw)
        }
      } catch (error) {
        console.error("Failed to fetch workspaces:", error)
      }
    }

    fetchWorkspaces()

    return () => {
      isMounted = false
    }
  }, [])


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={workspaces} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              avatar: user.avatarUrl || "/avatars/default.jpg",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

