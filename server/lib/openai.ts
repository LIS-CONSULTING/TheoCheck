import OpenAI from 'openai';
import { SERMON_ANALYSIS_PROMPT } from '@shared/constants/analysis-prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeSermon(sermonText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SERMON_ANALYSIS_PROMPT
        },
        {
          role: "user",
          content: sermonText
        }
      ],
      temperature: 0.1, // Faible température pour des résultats cohérents
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erreur lors de l'analyse du sermon:", error);
    throw new Error("Une erreur est survenue lors de l'analyse du sermon");
  }
}

export default openai;
