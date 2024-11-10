export default function NotFound() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
      <p className="text-muted-foreground">
        The lesson you're looking for doesn't exist or has been removed.
      </p>
    </div>
  );
}
