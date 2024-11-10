// app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseName, courseDescription } = body;

    // TODO: Add Google Sheets integration here
    // For now, just return success response
    console.log('Course to create:', { courseName, courseDescription });

    return NextResponse.json({ 
      message: 'Course created successfully',
      courseId: `COURSE_${Date.now()}` 
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Add Google Sheets integration here
    // For now, return empty array
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}