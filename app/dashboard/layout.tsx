"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CatPawLogo } from "@/components/logo/CatPawLogo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  ChevronDown,
  Swords,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const SIDEBAR_WIDTH = "240px";
const COLLAPSED_WIDTH = "80px";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const courses = [
    { name: "Blockchain Basics", href: "/dashboard/courses/blockchain-basics" },
    { name: "Smart Contracts", href: "/dashboard/courses/smart-contracts" },
    { name: "DeFi Fundamentals", href: "/dashboard/courses/defi" },
  ];

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsCoursesOpen(false);
  };

  return (
    <div
      className="relative h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: isExpanded ? SIDEBAR_WIDTH : COLLAPSED_WIDTH,
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header with Logo */}
        <div className="h-16">
          <Link href="/" className="h-full flex items-center w-full relative">
            <div className="absolute left-[7px]">
              <CatPawLogo />
            </div>
            <span
              className="absolute left-20 text-[#cba6f7] text-xl font-bold overflow-hidden whitespace-nowrap transition-all duration-300"
              style={{
                width: isExpanded ? "160px" : "0",
                opacity: isExpanded ? 1 : 0,
              }}
            >
              Catalyze
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1">
            {/* Dashboard */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full h-14 relative flex items-center"
              >
                <div className="absolute left-[20px]">
                  <LayoutDashboard className="h-6 w-6 text-[#fab387]" />
                </div>
                <span
                  className="absolute left-20 flex items-start overflow-hidden whitespace-nowrap transition-all duration-300 pr-4"
                  style={{
                    width: isExpanded ? "calc(100% - 5rem)" : "0", // This ensures text has proper space
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  Dashboard
                </span>
              </Button>
            </Link>

            {/* Courses Section */}
            <Collapsible
              open={isCoursesOpen && isExpanded}
              onOpenChange={setIsCoursesOpen}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full h-14 relative flex items-center"
                >
                  <div className="absolute left-[20px]">
                    <BookOpen className="h-6 w-6 text-[#fab387]" />
                  </div>
                  {isExpanded && (
                    <div className="absolute left-20 flex items-start justify-between w-[160px]">
                      <span>Courses</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          isCoursesOpen && "transform rotate-180"
                        )}
                      />
                    </div>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {courses.map((course) => (
                  <Link key={course.href} href={course.href}>
                    <Button
                      variant="ghost"
                      className="w-full h-12 relative flex items-center pl-20 text-sm hover:bg-[#fab387]/10"
                    >
                      <span className="absolute left-20">{course.name}</span>
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Quests */}
            <Link href="/dashboard/quests">
              <Button
                variant="ghost"
                className="w-full h-14 relative flex items-center"
              >
                <div className="absolute left-[20px]">
                  <Swords className="h-6 w-6 text-[#fab387]" />
                </div>
                <span
                  className="absolute left-20 flex items-start overflow-hidden whitespace-nowrap transition-all duration-300 pr-4"
                  style={{
                    width: isExpanded ? "calc(100% - 5rem)" : "0", // This ensures text has proper space
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  Quests
                </span>
              </Button>
            </Link>

            {/* Achievements */}
            <Link href="/dashboard/achievements">
              <Button
                variant="ghost"
                className="w-full h-14 relative flex items-center"
              >
                <div className="absolute left-[20px]">
                  <Trophy className="h-6 w-6 text-[#fab387]" />
                </div>
                <span
                  className="absolute left-20 flex items-start overflow-hidden whitespace-nowrap transition-all duration-300 pr-4"
                  style={{
                    width: isExpanded ? "calc(100% - 5rem)" : "0", // This ensures text has proper space
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  Achievements
                </span>
              </Button>
            </Link>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="h-16 border-t border-[#fab387]/10 flex items-center relative">
          <div className="absolute left-[20px]">
            <UserButton
              appearance={{
                // baseTheme: {},
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "right-0 mt-2 border-none",
                  userButtonOuterIdentifier: "text-white",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </div>

          {isExpanded && (
            <div className="absolute right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-6 w-6 text-[#fab387]" />
                ) : (
                  <Moon className="h-6 w-6 text-[#fab387]" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1c1c2b] text-white flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
