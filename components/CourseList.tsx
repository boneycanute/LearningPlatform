"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import type { Course } from "@/types/course";

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.courseId}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {course.courseName}
              <Book className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>{course.courseDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {course.lessonIds.length} Lessons
              </div>
              <Button asChild>
                <Link href={`/courses/${course.courseId}`}>Start Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {courses.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium">No courses available yet</h3>
          <p className="text-muted-foreground">
            Check back later for new courses
          </p>
        </div>
      )}
    </div>
  );
}
