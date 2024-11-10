// types/lesson.ts
export interface Lesson {
  lessonId: string;
  lessonNumber: number;
  lessonTitle: string;
  lessonContentMD: string;
  lessonCodePlaceHolder: string;
  lessonCodeSolution: string;
  xp: number;
  lessonConcepts: string[];
}

export interface LessonFormData {
  courseId: string;
  lessonNumber: number;
  lessonTitle: string;
  lessonContentMD: string;
  lessonCodePlaceHolder: string;
  lessonCodeSolution: string;
  xp: number;
  lessonConcepts: string;
}