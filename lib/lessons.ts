// lib/lessons.ts
import { google } from 'googleapis';
import type { Lesson } from '@/types/lesson';

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

export async function getLessons(lessonIds: string[]): Promise<Lesson[]> {
  if (!lessonIds.length) return [];

  const sheets = await getGoogleSheets();

  try {
    const lessons = await Promise.all(
      lessonIds.map(async (lessonId) => {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: `${lessonId}!A2:H2`,
        });

        const row = response.data.values?.[0];
        if (!row) throw new Error(`Lesson ${lessonId} not found`);

        return {
          lessonId,
          lessonNumber: parseInt(row[0]),
          lessonTitle: row[1],
          lessonContentMD: row[2],
          lessonCodePlaceHolder: row[3],
          lessonCodeSolution: row[4],
          xp: parseInt(row[5]),
          lessonConcepts: row[6].split(',').map((c: string) => c.trim()),
        };
      })
    );

    return lessons.sort((a, b) => a.lessonNumber - b.lessonNumber);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
}

export async function getLesson(lessonId: string): Promise<Lesson> {
  const sheets = await getGoogleSheets();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${lessonId}!A2:H2`,
  });

  const row = response.data.values?.[0];
  if (!row) {
    throw new Error(`Lesson ${lessonId} not found`);
  }

  return {
    lessonId,
    lessonNumber: parseInt(row[0]),
    lessonTitle: row[1],
    lessonContentMD: row[2],
    lessonCodePlaceHolder: row[3],
    lessonCodeSolution: row[4],
    xp: parseInt(row[5]),
    lessonConcepts: row[6].split(',').map((c: string) => c.trim()),
  };
}