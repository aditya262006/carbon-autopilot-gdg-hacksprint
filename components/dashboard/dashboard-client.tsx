'use client'

import { useState, useEffect } from 'react'
import { getCarbonEntries, getUserStats } from '@/app/actions/carbon'
import { getRecommendations, generateAIRecommendations } from '@/app/actions/ai-recommendations'
import EmissionsChart from '@/components/dashboard/emissions-chart'
import CategoryBreakdown from '@/components/dashboard/category-breakdown'
import StatsCard from '@/components/dashboard/stats-card'
import RecommendationsPanel from '@/components/dashboard/recommendations-panel'
import CarbonInputForm from '@/components/dashboard/carbon-input-form'
import Leaderboard from '@/components/dashboard/leaderboard'
import AchievementsBadges from '@/components/dashboard/achievements-badges'
import { motion } from 'framer-motion'

interface CarbonEntry {
  id: number
  category: string
  value: string
  date: Date
  source?: string | null
}

interface UserStat {
  totalEmissions: string
  weeklyEmissions: string
  monthlyEmissions: string
  dailyStreak: number
  points: number
  rank: number | null
}

interface Recommendation {
  id: number
  title: string
  description: string
  impact: number
  difficulty: string
  category: string
}

export default function DashboardClient() {
  const [entries, setEntries] = useState<CarbonEntry[]>([])
  const [stats, setStats] = useState<UserStat | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [entriesData, statsData, recsData] = await Promise.all([
          getCarbonEntries(),
          getUserStats(),
          getRecommendations(),
        ])

        setEntries(entriesData as CarbonEntry[])
        setStats(statsData as UserStat)
        setRecommendations(recsData as Recommendation[])

        // Generate fresh AI recommendations if none exist
        if (recsData.length === 0) {
          const newRecs = await generateAIRecommendations()
          setRecommendations(newRecs as Recommendation[])
        }
      } catch (error) {
        console.error('[v0] Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground text-lg font-medium">Loading your sustainability journey...</p>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-neutral-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Carbon Autopilot</h1>
              <p className="text-neutral-500 mt-1">Your personal sustainability dashboard</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-foreground hover:bg-neutral-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'community'
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-foreground hover:bg-neutral-200'
                }`}
              >
                Community
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Input Form */}
            <motion.div variants={itemVariants}>
              <CarbonInputForm onSuccess={() => location.reload()} />
            </motion.div>

            {/* Stats Overview */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Monthly Emissions"
                  value={`${parseFloat(stats?.monthlyEmissions || '0').toFixed(2)}`}
                  unit="kg CO₂"
                  icon="📊"
                  trend={-5}
                />
                <StatsCard
                  title="Weekly Emissions"
                  value={`${parseFloat(stats?.weeklyEmissions || '0').toFixed(2)}`}
                  unit="kg CO₂"
                  icon="📈"
                  trend={-2}
                />
                <StatsCard
                  title="Daily Streak"
                  value={stats?.dailyStreak || 0}
                  unit="days"
                  icon="🔥"
                  trend={1}
                />
                <StatsCard
                  title="Points"
                  value={stats?.points || 0}
                  unit="total"
                  icon="⭐"
                  trend={10}
                />
              </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-bold text-foreground mb-4">Emissions Over Time</h2>
                <EmissionsChart entries={entries} />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-bold text-foreground mb-4">Category Breakdown</h2>
                <CategoryBreakdown entries={entries} />
              </div>
            </motion.div>

            {/* Recommendations and Achievements */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecommendationsPanel recommendations={recommendations} />
              <AchievementsBadges streak={stats?.dailyStreak || 0} />
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'community' && (
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Leaderboard userRank={stats?.rank || 1} userPoints={stats?.points || 0} />
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
