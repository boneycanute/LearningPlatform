"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { Course } from "@/types/course";
import type { Lesson } from "@/types/lesson";

interface CourseViewProps {
  course: Course;
  lessons: Lesson[];
}

export default function CourseView({ course, lessons }: CourseViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{course.courseName}</h1>
        <p className="text-muted-foreground mt-2">{course.courseDescription}</p>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Card key={lesson.lessonId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Lesson {lesson.lessonNumber}: {lesson.lessonTitle}
                  </CardTitle>
                  <CardDescription>
                    {lesson.lessonConcepts.join(", ")}
                  </CardDescription>
                </div>
                <div className="text-muted-foreground">{lesson.xp} XP</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {lesson.lessonConcepts.slice(0, 3).map((concept) => (
                    <span
                      key={concept}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <Link href={`/dashboard/lessons/${lesson.lessonId}`}>
                    Start Lesson
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
