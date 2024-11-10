// app/api/lessons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import type { Lesson } from '@/types/lesson';

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
    const {
      courseId,
      lessonNumber,
      lessonTitle,
      lessonContentMD,
      lessonCodePlaceHolder,
      lessonCodeSolution,
      xp,
      lessonConcepts,
    } = body;

    if (!courseId || !lessonTitle || !lessonContentMD) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const lessonId = `LESSON_${Date.now()}`;

    // Create a new sheet for the lesson
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: lessonId,
            },
          },
        }],
      },
    });

    // Add lesson data to the new sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `${lessonId}!A1:H2`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          ['lessonNumber', 'lessonTitle', 'lessonContentMD', 'lessonCodePlaceHolder', 'lessonCodeSolution', 'xp', 'lessonConcepts', 'lessonId'],
          [
            lessonNumber,
            lessonTitle,
            lessonContentMD,
            lessonCodePlaceHolder || '',
            lessonCodeSolution || '',
            xp,
            lessonConcepts,
            lessonId
          ],
        ],
      },
    });

    // Update the course's lesson list
    const courseResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Courses!A:D',
    });

    const courseRows = courseResponse.data.values || [];
    const courseRowIndex = courseRows.findIndex(row => row[0] === courseId);

    if (courseRowIndex === -1) {
      throw new Error('Course not found');
    }

    const currentLessons = JSON.parse(courseRows[courseRowIndex][3] || '[]');
    currentLessons.push(lessonId);

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Courses!D${courseRowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[JSON.stringify(currentLessons)]],
      },
    });

    return NextResponse.json({
      message: 'Lesson created successfully',
      lessonId,
    });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}