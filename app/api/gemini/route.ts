import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { carbon, commute, electricity, meals } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an environmental sustainability expert. Analyze the following carbon footprint data and provide actionable insights:

Current carbon footprint: ${carbon} kg CO₂
Daily commute: ${commute} km
Monthly electricity usage: ${electricity} kWh
Meat meals per week: ${meals}

Provide a concise, practical insight (2-3 sentences) about how to reduce this carbon footprint. Focus on the most impactful changes based on their data. Be encouraging and specific.`

    const result = await model.generateContent(prompt)
    const insight = result.response.text()

    return NextResponse.json({ insight })
  } catch (error) {
    console.error("Gemini API error:", error)
    return NextResponse.json(
      { error: "Failed to generate AI insight" },
      { status: 500 }
    )
  }
}