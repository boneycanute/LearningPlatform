// components/ThemeToggle.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    latte: <Sun className="h-4 w-4" />,
    frappe: <Sunrise className="h-4 w-4" />,
    macchiato: <Sunset className="h-4 w-4" />,
    mocha: <Moon className="h-4 w-4" />,
  };

  const themeNames = {
    latte: "Latte",
    frappe: "Frappé",
    macchiato: "Macchiato",
    mocha: "Mocha",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-14 relative flex items-center group"
        >
          <span className="absolute left-20 flex items-start overflow-hidden whitespace-nowrap transition-all duration-300">
            Appearance
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="py-2 px-4 bg-background ml-4"
        style={{ minWidth: "200px" }}
      >
        <DropdownMenuItem onClick={() => setTheme("latte")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Latte</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("frappe")}>
          <Sunrise className="mr-2 h-4 w-4" />
          <span>Frappé</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("macchiato")}>
          <Sunset className="mr-2 h-4 w-4" />
          <span>Macchiato</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("mocha")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Mocha</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
