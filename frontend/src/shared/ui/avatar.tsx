// frontend/src/shared/ui/avatar.tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  src?: string | null
  name?: string
  alt?: string
}

export function Avatar({ src, name, alt, className, ...props }: AvatarProps) {
  const fallback = name ? name.charAt(0).toUpperCase() : "?"

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src || ""}
        alt={alt || name || "avatar"}
        className="aspect-square size-full"
      />
      <AvatarPrimitive.Fallback
        className="bg-muted flex size-full items-center justify-center rounded-full text-sm font-bold text-muted-foreground"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
