"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { Lesson } from "@/types/lesson";
import ReactMarkdown from "react-markdown";

interface LessonViewerProps {
  lesson: Lesson;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  const [code, setCode] = useState(lesson.lessonCodePlaceHolder);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Add code evaluation logic
      toast.success("Code submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Lesson {lesson.lessonNumber}: {lesson.lessonTitle}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{lesson.xp} XP</span>
          {lesson.lessonConcepts.map((concept) => (
            <span
              key={concept}
              className="hidden md:inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      <Card className="h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-lg border"
        >
          {/* Content Panel */}
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="h-full p-6">
              <ReactMarkdown className="prose dark:prose-invert">
                {lesson.lessonContentMD}
              </ReactMarkdown>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          {/* Code Editor Panel */}
          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col">
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm bg-muted rounded-md resize-none"
                  spellCheck="false"
                />
              </div>
              <div className="p-4 border-t bg-muted">
                <div className="flex justify-between items-center">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Lesson
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Code"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
}
