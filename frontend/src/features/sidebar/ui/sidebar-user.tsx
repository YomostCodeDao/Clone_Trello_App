// frontend/src/features/sidebar/ui/sidebar-user.tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { Avatar } from "@/shared/ui/avatar";
import { useNavigate } from "react-router-dom";
import { tokenStorage } from "@/shared/utils/tokenStorage";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar?: string // fix theo kiểu optional, có cũng được, không cũng được
  };
}

export function NavUser({ user }: NavUserProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted w-full">
          <Avatar src={user.avatar} name={user.name} />
          <div className="flex flex-col text-left">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            tokenStorage.clearTokens();
            navigate("/login");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
