// app/courses/[courseId]/page.tsx
import { getCourse } from "@/lib/courses";
import { getLessons } from "@/lib/lessons";
import CourseView from "@/components/CourseView";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  try {
    const course = await getCourse(params.courseId);
    const lessons = await getLessons(course.lessonIds);

    return (
      <div className="container mx-auto p-6">
        <CourseView course={course} lessons={lessons} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
