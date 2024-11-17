import { getLesson } from "@/lib/lessons";
import LessonViewer from "@/components/LessonViewer";
import { notFound } from "next/navigation";

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  try {
    const lesson = await getLesson(params.lessonId);
    return (
      <div className="container mx-auto p-6">
        <LessonViewer lesson={lesson} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
