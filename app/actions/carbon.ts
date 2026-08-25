'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { carbonEntries, userStats, achievements } from '@/lib/db/schema'
import { eq, desc, and, gte, lte } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')
  return session.user.id
}

export async function addCarbonEntry(data: {
  category: string
  value: number
  source?: string
  notes?: string
  date: Date
}) {
  const userId = await getUserId()

  const entry = await db
    .insert(carbonEntries)
    .values({
      userId,
      category: data.category,
      value: data.value.toString(),
      source: data.source,
      notes: data.notes,
      date: data.date,
    })
    .returning()

  // Update user stats
  await updateUserStats(userId)

  // Check for achievements
  await checkAchievements(userId)

  revalidatePath('/dashboard')
  return entry
}

export async function getCarbonEntries(
  startDate?: Date,
  endDate?: Date
) {
  const userId = await getUserId()

  const conditions = [eq(carbonEntries.userId, userId)]
  
  if (startDate && endDate) {
    conditions.push(gte(carbonEntries.date, startDate))
    conditions.push(lte(carbonEntries.date, endDate))
  }

  return db
    .select()
    .from(carbonEntries)
    .where(and(...conditions))
    .orderBy(desc(carbonEntries.date))
}

export async function deleteCarbonEntry(id: number) {
  const userId = await getUserId()

  await db
    .delete(carbonEntries)
    .where(and(eq(carbonEntries.id, id), eq(carbonEntries.userId, userId)))

  await updateUserStats(userId)
  revalidatePath('/dashboard')
}

export async function updateUserStats(userId: string) {
  const entries = await db
    .select()
    .from(carbonEntries)
    .where(eq(carbonEntries.userId, userId))

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const totalEmissions = entries.reduce(
    (sum, entry) => sum + parseFloat(entry.value),
    0
  )
  const weeklyEmissions = entries
    .filter((entry) => entry.date >= weekAgo)
    .reduce((sum, entry) => sum + parseFloat(entry.value), 0)
  const monthlyEmissions = entries
    .filter((entry) => entry.date >= monthAgo)
    .reduce((sum, entry) => sum + parseFloat(entry.value), 0)

  const existingStats = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1)

  if (existingStats.length > 0) {
    await db
      .update(userStats)
      .set({
        totalEmissions: totalEmissions.toString(),
        weeklyEmissions: weeklyEmissions.toString(),
        monthlyEmissions: monthlyEmissions.toString(),
      })
      .where(eq(userStats.userId, userId))
  } else {
    await db.insert(userStats).values({
      userId,
      totalEmissions: totalEmissions.toString(),
      weeklyEmissions: weeklyEmissions.toString(),
      monthlyEmissions: monthlyEmissions.toString(),
    })
  }
}

export async function getUserStats() {
  const userId = await getUserId()

  let stats = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1)

  if (stats.length === 0) {
    await db.insert(userStats).values({ userId })
    stats = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1)
  }

  return stats[0]
}

async function checkAchievements(userId: string) {
  const stats = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1)

  if (stats.length === 0) return

  const stat = stats[0]
  const existingAchievements = await db
    .select()
    .from(achievements)
    .where(eq(achievements.userId, userId))

  const achievementNames = existingAchievements.map((a) => a.achievement)

  // Check for 50% reduction milestone
  if (
    parseFloat(stat.monthlyEmissions) <= 50 &&
    !achievementNames.includes('fifty_percent_reduction')
  ) {
    await db.insert(achievements).values({
      userId,
      achievement: 'fifty_percent_reduction',
      description: 'Reduced monthly emissions by 50%',
    })
  }

  // Check for 7-day streak
  if (
    parseInt(stat.dailyStreak.toString()) >= 7 &&
    !achievementNames.includes('seven_day_streak')
  ) {
    await db.insert(achievements).values({
      userId,
      achievement: 'seven_day_streak',
      description: 'Maintained a 7-day tracking streak',
    })
  }
}
