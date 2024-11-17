// app/dashboard/page.tsx
import CourseList from "@/components/CourseList";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
}
