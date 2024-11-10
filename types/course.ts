// types/course.ts
export interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
  lessonIds: string[];
}

export interface CourseFormData {
  courseName: string;
  courseDescription: string;
}