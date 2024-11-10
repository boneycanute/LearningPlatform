// lib/google-sheets.ts
import { google } from 'googleapis';

export async function getGoogleSheetsInstance() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw new Error('Failed to initialize Google Sheets');
  }
}

export async function initializeSpreadsheet() {
  const sheets = await getGoogleSheetsInstance();
  
  try {
    // Check if Courses sheet exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    });

    const coursesSheet = response.data.sheets?.find(
      sheet => sheet.properties?.title === 'Courses'
    );

    if (!coursesSheet) {
      // Create Courses sheet with headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Courses',
              },
            },
          }],
        },
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: 'Courses!A1:D1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Course ID', 'Course Name', 'Course Description', 'Lesson IDs']],
        },
      });
    }

    return true;
  } catch (error) {
    console.error('Error initializing spreadsheet:', error);
    throw new Error('Failed to initialize spreadsheet');
  }
}