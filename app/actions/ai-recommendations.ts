'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { recommendations, carbonEntries, userStats } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

interface RecommendationData {
  title: string
  description: string
  impact: number
  difficulty: string
  category: string
}

export async function generateAIRecommendations() {
  const userId = await getUserId()

  // Get user's recent carbon entries
  const recentEntries = await db
    .select()
    .from(carbonEntries)
    .where(eq(carbonEntries.userId, userId))
    .orderBy(desc(carbonEntries.date))
    .limit(30)

  const userStat = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1)

  // Prepare data for AI analysis
  const categoryBreakdown: Record<string, number> = {}
  recentEntries.forEach((entry) => {
    categoryBreakdown[entry.category] =
      (categoryBreakdown[entry.category] || 0) + parseFloat(entry.value)
  })

  const prompt = `You are a sustainability expert. Based on the following carbon emissions data, provide 5 specific, actionable recommendations to reduce carbon footprint.

User's Monthly Emissions by Category:
${Object.entries(categoryBreakdown)
  .map(([category, value]) => `- ${category}: ${value.toFixed(2)} kg CO2`)
  .join('\n')}

Total Monthly Emissions: ${userStat?.[0] ? parseFloat(userStat[0].monthlyEmissions).toFixed(2) : 0} kg CO2

Provide recommendations in JSON format with this exact structure (return ONLY valid JSON, no markdown):
[
  {
    "title": "Specific action title",
    "description": "Why this matters and how to implement it",
    "impact": 10,
    "difficulty": "Easy",
    "category": "Transport|Energy|Food|Lifestyle|Other"
  }
]

Make recommendations:
- Specific to the user's highest emission categories
- Realistic and actionable within 30 days
- Ranked by potential impact
- Include impact score (1-50 kg CO2 reduction potential)
- Mark difficulty as Easy, Medium, or Hard`

  try {
    const { text: responseText } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt,
      temperature: 0.7,
    })

    // Parse the AI response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('Invalid AI response format')
    }

    const parsedRecommendations: RecommendationData[] = JSON.parse(
      jsonMatch[0]
    )

    // Clear old recommendations
    await db.delete(recommendations).where(eq(recommendations.userId, userId))

    // Insert new recommendations
    for (const rec of parsedRecommendations) {
      await db.insert(recommendations).values({
        userId,
        title: rec.title,
        description: rec.description,
        impact: rec.impact,
        difficulty: rec.difficulty,
        category: rec.category,
      })
    }

    revalidatePath('/dashboard')
    return parsedRecommendations
  } catch (error) {
    console.error('Error generating recommendations:', error)
    // Return default recommendations as fallback
    return getDefaultRecommendations(categoryBreakdown)
  }
}

function getDefaultRecommendations(
  categoryBreakdown: Record<string, number>
): RecommendationData[] {
  const recommendations: RecommendationData[] = []

  if ((categoryBreakdown['Transport'] || 0) > 50) {
    recommendations.push({
      title: 'Switch to Public Transportation',
      description:
        'Using public transit 2-3 days per week can reduce transport emissions by up to 40%',
      impact: 25,
      difficulty: 'Medium',
      category: 'Transport',
    })
  }

  if ((categoryBreakdown['Energy'] || 0) > 40) {
    recommendations.push({
      title: 'Install LED Lighting',
      description:
        'Replace incandescent bulbs with LED to reduce energy consumption by 75%',
      impact: 15,
      difficulty: 'Easy',
      category: 'Energy',
    })
  }

  if ((categoryBreakdown['Food'] || 0) > 30) {
    recommendations.push({
      title: 'Adopt Meatless Mondays',
      description:
        'Reducing meat consumption one day per week cuts food-related emissions by ~14%',
      impact: 20,
      difficulty: 'Easy',
      category: 'Food',
    })
  }

  recommendations.push({
    title: 'Track Daily Emissions',
    description: 'Awareness is the first step - daily tracking helps identify patterns',
    impact: 5,
    difficulty: 'Easy',
    category: 'Lifestyle',
  })

  recommendations.push({
    title: 'Set Personal Reduction Goals',
    description:
      'Aim for 10% monthly reduction in emissions through behavior changes',
    impact: 10,
    difficulty: 'Medium',
    category: 'Lifestyle',
  })

  return recommendations
}

export async function getRecommendations() {
  const userId = await getUserId()

  const userRecommendations = await db
    .select()
    .from(recommendations)
    .where(eq(recommendations.userId, userId))
    .orderBy(desc(recommendations.impact))

  return userRecommendations
}

export async function dismissRecommendation(id: number) {
  const userId = await getUserId()

  await db
    .delete(recommendations)
    .where(
      eq(recommendations.id, id) && eq(recommendations.userId, userId)
    )

  revalidatePath('/dashboard')
}
