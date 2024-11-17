"use client";
import { ReactNode, useState, useEffect } from "react";
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
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";

const SIDEBAR_WIDTH = "240px";
const COLLAPSED_WIDTH = "80px";

type Course = {
  courseId: string;
  courseName: string;
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

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
          <div className="flex flex-col gap-1 flex-1">
            {/* Dashboard */}
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full h-14 relative flex items-center group"
              >
                <div className="absolute left-[20px]">
                  <LayoutDashboard className="h-8 w-8 text-[#fab387] group-hover:text-black" />
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
                  className="w-full h-14 relative flex items-center group"
                >
                  <div className="absolute left-[20px]">
                    <BookOpen className="h-6 w-6 text-[#fab387] group-hover:text-black" />
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
                  <Link
                    key={course.courseId}
                    href={`/dashboard/courses/${course.courseId}`}
                  >
                    <Button
                      variant="ghost"
                      className="w-full h-12 relative flex items-center pl-20 text-sm hover:bg-[#fab387]/10"
                    >
                      <span className="absolute left-20">
                        {course.courseName}
                      </span>
                    </Button>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Quests */}
            <Link href="/dashboard/quests">
              <Button
                variant="ghost"
                className="w-full h-14 relative flex items-center group"
              >
                <div className="absolute left-[20px]">
                  <Swords className="h-6 w-6 text-[#fab387] group-hover:text-black" />
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
                className="w-full h-14 relative flex items-center group"
              >
                <div className="absolute left-[20px]">
                  <Trophy className="h-6 w-6 text-[#fab387] group-hover:text-black" />
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

          {/* Theme Toggle */}
          <div className="w-full h-14 relative flex items-center">
            <div className="absolute left-[14px]">
              <Palette className="h-5 w-5 text-[#fab387] group-hover:text-black" />
            </div>
            <div className="absolute w-full">
              <ThemeToggle />
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="h-16 border-t border-[#fab387]/10 flex items-center px-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "right-0 mt-2 border-none",
                userButtonOuterIdentifier: "text-white",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
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
