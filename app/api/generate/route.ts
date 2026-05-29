import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, length, contentType } = await request.json();

    const lengthGuide = {
      short: "50-100 words",
      medium: "150-250 words",
      long: "300-500 words",
    };

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert copywriter and content strategist with years of experience writing compelling content for businesses and individuals. 
          You write clean, engaging, and effective content tailored to the user's needs.
          Always write in the requested tone and stay within the requested length.
          Never add meta-commentary like "Here is your content:" — just write the content directly.`,
        },
        {
          role: "user",
          content: `Write a ${contentType} about: "${topic}"
          
            Tone: ${tone}
            Length: ${lengthGuide[length as keyof typeof lengthGuide]}

            Write it directly without any introduction or explanation.`,
        },
      ],
    });

    const content = completion.choices[0].message.content;
    return NextResponse.json({ content });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { content: "Error generating content. Please try again." },
      { status: 500 }
    );
  }
}