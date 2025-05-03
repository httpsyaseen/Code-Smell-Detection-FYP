"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="grid place-items-center">
        <button className="md:hover:bg-secondary/10 p-0 size-auto md:size-8 hover:bg-transparent active:bg-transparent focus-within:bg-transparent rounded-lg">
          <Sun
            className="h-6 w-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 duration-200"
            color="white"
            fill="white"
          />
          <Moon
            className="absolute h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 duration-200"
            color="black"
            fill="black"
          />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[99]">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
