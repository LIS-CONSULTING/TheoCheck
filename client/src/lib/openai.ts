import { apiRequest } from "./queryClient";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const ANALYSIS_PROMPT = `Analyze the following sermon and provide feedback in JSON format with the following structure:
{
  "structure": number (1-10),
  "theology": number (1-10),
  "relevance": number (1-10),
  "engagement": number (1-10),
  "overallScore": number (1-10),
  "strengths": string[],
  "improvements": string[],
  "summary": string
}`;

export async function analyzeSermon(content: string) {
  const response = await apiRequest("POST", "/api/analyze", { content });
  return response.json();
}
