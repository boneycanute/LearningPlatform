// app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import type { Course } from '@/types/course';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseName, courseDescription } = body;

    if (!courseName || !courseDescription) {
      return NextResponse.json(
        { error: 'Course name and description are required' },
        { status: 400 }
      );
    }

    const courseId = `COURSE_${Date.now()}`;

    // Append the course data to the Courses sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Courses!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[courseId, courseName, courseDescription, '[]']],
      },
    });

    return NextResponse.json({
      message: 'Course created successfully',
      courseId,
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
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Courses!A2:D', // Skip header row
    });

    const courses: Course[] = (response.data.values || []).map(row => ({
      courseId: row[0],
      courseName: row[1],
      courseDescription: row[2],
      lessonIds: JSON.parse(row[3] || '[]'),
    }));

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}