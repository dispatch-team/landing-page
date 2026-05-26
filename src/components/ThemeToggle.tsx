"use client";

/**
 * components/ThemeToggle.tsx
 *
 * Dark/light mode toggle. Theme labels stay in English regardless of app language.
 */

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/intl";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useI18n("common");

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div
        className={`flex items-center gap-1 ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  const ModeIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            title={t("theme")}
          >
            <ModeIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            {t("theme")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={theme === "light" ? "text-primary" : ""}
          >
            <Sun className="h-3.5 w-3.5 mr-2" />
            {t("lightMode")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "text-primary" : ""}
          >
            <Moon className="h-3.5 w-3.5 mr-2" />
            {t("darkMode")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={theme === "system" ? "text-primary" : ""}
          >
            <Monitor className="h-3.5 w-3.5 mr-2" />
            {t("systemMode")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
