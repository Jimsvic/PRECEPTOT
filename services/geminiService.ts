
import { GoogleGenAI } from "@google/genai";
import type { User } from '../types';

const API_KEY = process.env.API_KEY;

// Fix: Conditionally initialize the GoogleGenAI client only if the API key is present
// to avoid runtime errors when the key is missing.
let ai: GoogleGenAI | undefined;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

export const generateBio = async (user: User): Promise<string> => {
  // Fix: The check should be against the initialized 'ai' instance, not just the API key.
  if (!ai) {
    return Promise.resolve("API key not configured. Please set the API_KEY environment variable.");
  }
  
  const prompt = `
    Generate a professional, third-person academic biography (around 80-100 words) for the following researcher.
    Highlight their affiliation and key research interests.

    **Researcher Details:**
    - **Name:** ${user.name}
    - **Affiliation(s):** ${user.affiliations.join(', ')}
    - **Research Interests:** ${user.researchInterests?.join(', ') || 'Not specified'}

    **Example Output:**
    Dr. Evelyn Reed is a distinguished researcher at the University of Fictional Science, specializing in Artificial Intelligence, Natural Language Processing, and Computational Linguistics. Their work focuses on developing novel architectures for large language models and exploring their applications in accelerating scientific discovery. Dr. Reed is a strong advocate for open-source research and collaborative innovation within the AI community.

    Generate a new biography based on the provided details.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating bio with Gemini API:", error);
    return "An error occurred while generating the biography. Please try again later.";
  }
};
