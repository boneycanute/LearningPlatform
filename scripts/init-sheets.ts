// scripts/init-sheets.ts
import { google, sheets_v4 } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface GoogleSheetCredentials {
  client_email: string | undefined;
  private_key: string | undefined;
}

async function getGoogleSheetsInstance(): Promise<sheets_v4.Sheets> {
  try {
    const credentials: GoogleSheetCredentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google Sheets credentials in environment variables');
    }

    console.log('🔑 Using service account:', credentials.client_email);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw new Error('Failed to initialize Google Sheets');
  }
}

async function initializeSpreadsheet(): Promise<boolean> {
  console.log('🚀 Initializing spreadsheet...');
  
  const sheets = await getGoogleSheetsInstance();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!spreadsheetId) {
    throw new Error('Missing GOOGLE_SHEETS_ID in environment variables');
  }

  console.log('📝 Using spreadsheet ID:', spreadsheetId);
  
  try {
    // Check if Courses sheet exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    console.log('📊 Found spreadsheet:', response.data.properties?.title);

    const coursesSheet = response.data.sheets?.find(
      (sheet: sheets_v4.Schema$Sheet) => sheet.properties?.title === 'Courses'
    );

    if (!coursesSheet) {
      console.log('➕ Creating new Courses sheet...');
      
      // Create Courses sheet with headers
      const addSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Courses',
                gridProperties: {
                  rowCount: 1000,
                  columnCount: 4,
                },
              },
            },
          }],
        },
      });

      console.log('📑 Sheet created:', addSheetResponse.data.replies?.[0].addSheet?.properties?.title);

      // Add headers with formatting
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              updateCells: {
                range: {
                  sheetId: addSheetResponse.data.replies?.[0].addSheet?.properties?.sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                rows: [{
                  values: [
                    { userEnteredValue: { stringValue: 'Course ID' }, userEnteredFormat: { textFormat: { bold: true } } },
                    { userEnteredValue: { stringValue: 'Course Name' }, userEnteredFormat: { textFormat: { bold: true } } },
                    { userEnteredValue: { stringValue: 'Course Description' }, userEnteredFormat: { textFormat: { bold: true } } },
                    { userEnteredValue: { stringValue: 'Lesson IDs' }, userEnteredFormat: { textFormat: { bold: true } } },
                  ],
                }],
                fields: 'userEnteredValue,userEnteredFormat.textFormat.bold',
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: addSheetResponse.data.replies?.[0].addSheet?.properties?.sheetId,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      });

      // Resize columns to fit content
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            autoResizeDimensions: {
              dimensions: {
                sheetId: addSheetResponse.data.replies?.[0].addSheet?.properties?.sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: 4,
              },
            },
          }],
        },
      });

      console.log('✅ Headers added and formatted');
    } else {
      console.log('ℹ️ Courses sheet already exists');
      
      // Verify headers
      const headers = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Courses!A1:D1',
      });

      console.log('📋 Current headers:', headers.data.values?.[0]);
    }

    // Verify final state
    const finalCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Courses!A1:D1',
    });

    console.log('✨ Final sheet headers:', finalCheck.data.values?.[0]);

    return true;
  } catch (error) {
    console.error('❌ Error initializing spreadsheet:', error);
    throw error;
  }
}

async function init(): Promise<void> {
  console.log('🔄 Starting initialization process...');
  
  try {
    await initializeSpreadsheet();
    console.log('🎉 Spreadsheet initialization completed successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
    } else {
      console.error('❌ An unknown error occurred');
    }
    process.exit(1);
  }
}

init().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});