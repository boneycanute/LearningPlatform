// lib/courses.ts
import { google } from 'googleapis';
import type { Course } from '@/types/course';

async function getGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

export async function getCourses(): Promise<Course[]> {
  const sheets = await getGoogleSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Courses!A2:D',
  });

  const courses = (response.data.values || []).map(row => ({
    courseId: row[0],
    courseName: row[1],
    courseDescription: row[2],
    lessonIds: JSON.parse(row[3] || '[]'),
  }));

  return courses;
}

export async function getCourse(courseId: string): Promise<Course> {
  const sheets = await getGoogleSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Courses!A2:D',
  });

  const courseRow = response.data.values?.find(row => row[0] === courseId);

  if (!courseRow) {
    throw new Error(`Course with ID ${courseId} not found`);
  }

  return {
    courseId: courseRow[0],
    courseName: courseRow[1],
    courseDescription: courseRow[2],
    lessonIds: JSON.parse(courseRow[3] || '[]'),
  };
}