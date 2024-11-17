import { getCourses } from "@/lib/courses";
import CourseList from "@/components/CourseList";

export default async function CoursesPage() {
  const courses = await getCourses();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
}