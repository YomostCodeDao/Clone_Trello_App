import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "./input";

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        const [show, setShow] = React.useState(false);

        return (
            <div className="relative w-full">
                <Input
                    ref={ref}
                    type={show ? "text" : "password"}
                    className={cn("pr-10", className)} // chừa chỗ cho nút con mắt
                    {...props}
                />
                <button
                    type="button"
                    aria-label={show ? "Hide password" : "Show password"}
                    onClick={() => setShow((s) => !s)}
                    className="absolute inset-y-0 right-2 grid place-items-center text-neutral-400 hover:text-neutral-200"
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";
