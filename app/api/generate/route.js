import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate educational flashcards that help users learn and retain key concepts. Each flashcard should consist of a question or prompt on the front and a detailed answer or explanation on the back.

1. Keep the questions concise and focused on a single concept.
2. Provide clear and accurate answers, including examples when relevant.
3. Ensure the content is tailored to the user's level of knowledge.
4. Use language that is easy to understand but precise.
5. Include visual aids or hints if necessary, to reinforce learning.
6. The flashcards should be designed for spaced repetition to maximize retention.
7. Categorize the flashcards by topic or subject area.

Your goal is to help users master the material effectively through repeated exposure and review.

Return in the following JSON format 

{
    "flashcards": [
        {
            "front" : str,
            "back": str 
        }
    ]
}
`;

export async function POST(req) {
  const openai = OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completion.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcard);
}
