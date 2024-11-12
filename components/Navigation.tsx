// components/Navigation.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Learning Platform
        </Link>
        <div className="space-x-4">
          <Button variant={isAdmin ? "default" : "outline"} asChild>
            <Link href="/admin">Admin Panel</Link>
          </Button>
          <Button variant={!isAdmin ? "default" : "outline"} asChild>
            <Link href="/">Learning Interface</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/courses">Courses</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
