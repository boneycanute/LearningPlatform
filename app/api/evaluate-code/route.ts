// app/api/evaluate-code/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

// Helper function to extract JSON from Gemini's response
function extractJsonFromResponse(text: string): any {
  try {
    // Find the last occurrence of a JSON-like structure
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    
    // Parse the matched JSON
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error extracting JSON:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { submittedCode, solutionCode, language } = await request.json();

    // Create the prompt for code evaluation
    const prompt = `You are a code evaluation assistant. Compare the following submitted code with the solution code. Focus on functionality rather than exact matching. Respond ONLY with a JSON object in the following format, no additional text or markdown:
{
  "isCorrect": boolean indicating if the code is functionally correct,
  "message": "overall feedback message",
  "lineErrors": [
    {
      "line": line number where error occurs,
      "message": "error or improvement suggestion"
    }
  ]
}

Submitted Code:
${submittedCode}

Solution Code:
${solutionCode}

Evaluate:
1. Functional correctness
2. Identify specific line errors or improvements
3. Provide constructive feedback`;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract and parse the JSON response
    const evaluation = extractJsonFromResponse(text);

    // Validate the response structure
    if (!evaluation || typeof evaluation.isCorrect !== 'boolean' || !evaluation.message) {
      throw new Error('Invalid response format from AI');
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Error evaluating code:", error);
    return NextResponse.json(
      {
        isCorrect: false,
        message: "Failed to evaluate code. Please try again.",
        lineErrors: []
      },
      { status: 500 }
    );
  }
}