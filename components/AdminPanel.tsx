'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Course, CourseFormData } from "@/types/course";
import type { Lesson, LessonFormData } from "@/types/lesson";

const AdminPanel = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    courseName: '',
    courseDescription: ''
  });

  // Fetch existing courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const data = await response.json();
      toast.success('Course created successfully!');
      
      // Reset form
      setFormData({ courseName: '', courseDescription: '' });
      
      // Refresh courses list
      fetchCourses();
    } catch (error) {
      toast.error('Failed to create course');
      console.error('Error creating course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [lessonFormData, setLessonFormData] = useState<LessonFormData>({
    courseId: '',
    lessonNumber: 1,
    lessonTitle: '',
    lessonContentMD: '',
    lessonCodePlaceHolder: '',
    lessonCodeSolution: '',
    xp: 100,
    lessonConcepts: ''
  });

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to create lesson');
      }

      const data = await response.json();
      toast.success('Lesson created successfully!');
      
      // Reset form
      setLessonFormData(prev => ({
        ...prev,
        lessonTitle: '',
        lessonContentMD: '',
        lessonCodePlaceHolder: '',
        lessonCodeSolution: '',
        lessonConcepts: ''
      }));
      
    } catch (error) {
      toast.error('Failed to create lesson');
      console.error('Error creating lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Platform Admin</CardTitle>
          <CardDescription>Manage courses and lessons</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="courses">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <div className="space-y-6">
                {/* Course Creation Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Create New Course</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        placeholder="Enter course name"
                        value={formData.courseName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          courseName: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="courseDescription">Course Description</Label>
                      <Textarea
                        id="courseDescription"
                        placeholder="Enter course description"
                        value={formData.courseDescription}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          courseDescription: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Course'
                      )}
                    </Button>
                  </form>
                </div>

                {/* Existing Courses List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Existing Courses</h3>
                  <div className="grid gap-4">
                    {courses.map((course) => (
                      <Card key={course.courseId}>
                        <CardHeader>
                          <CardTitle>{course.courseName}</CardTitle>
                          <CardDescription>{course.courseDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Course ID: {course.courseId}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Lessons: {course.lessonIds.length}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    {courses.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        No courses created yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

 <TabsContent value="lessons">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Create New Lesson</h3>
                  <form onSubmit={handleLessonSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseId">Course</Label>
                      <Select
                        value={lessonFormData.courseId}
                        onValueChange={(value) => 
                          setLessonFormData(prev => ({ ...prev, courseId: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.courseId} value={course.courseId}>
                              {course.courseName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lessonNumber">Lesson Number</Label>
                        <Input
                          id="lessonNumber"
                          type="number"
                          min="1"
                          value={lessonFormData.lessonNumber}
                          onChange={(e) => setLessonFormData(prev => ({
                            ...prev,
                            lessonNumber: parseInt(e.target.value)
                          }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="xp">XP Points</Label>
                        <Input
                          id="xp"
                          type="number"
                          min="0"
                          value={lessonFormData.xp}
                          onChange={(e) => setLessonFormData(prev => ({
                            ...prev,
                            xp: parseInt(e.target.value)
                          }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonTitle">Lesson Title</Label>
                      <Input
                        id="lessonTitle"
                        value={lessonFormData.lessonTitle}
                        onChange={(e) => setLessonFormData(prev => ({
                          ...prev,
                          lessonTitle: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonContentMD">Lesson Content (Markdown)</Label>
                      <Textarea
                        id="lessonContentMD"
                        className="min-h-[200px] font-mono"
                        value={lessonFormData.lessonContentMD}
                        onChange={(e) => setLessonFormData(prev => ({
                          ...prev,
                          lessonContentMD: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonCodePlaceHolder">Code Placeholder</Label>
                      <Textarea
                        id="lessonCodePlaceHolder"
                        className="font-mono"
                        value={lessonFormData.lessonCodePlaceHolder}
                        onChange={(e) => setLessonFormData(prev => ({
                          ...prev,
                          lessonCodePlaceHolder: e.target.value
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonCodeSolution">Code Solution</Label>
                      <Textarea
                        id="lessonCodeSolution"
                        className="font-mono"
                        value={lessonFormData.lessonCodeSolution}
                        onChange={(e) => setLessonFormData(prev => ({
                          ...prev,
                          lessonCodeSolution: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lessonConcepts">Concepts (comma-separated)</Label>
                      <Input
                        id="lessonConcepts"
                        placeholder="React, Hooks, State Management"
                        value={lessonFormData.lessonConcepts}
                        onChange={(e) => setLessonFormData(prev => ({
                          ...prev,
                          lessonConcepts: e.target.value
                        }))}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isLoading || !lessonFormData.courseId}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Lesson'
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;