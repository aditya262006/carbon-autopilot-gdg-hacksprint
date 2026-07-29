'use client'

import { useState } from 'react'
import { dismissRecommendation, generateAIRecommendations } from '@/app/actions/ai-recommendations'
import { motion, AnimatePresence } from 'framer-motion'

interface Recommendation {
  id: number
  title: string
  description: string
  impact: number
  difficulty: string
  category: string
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[]
}

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
}

const CATEGORY_ICONS = {
  Transport: '🚗',
  Energy: '⚡',
  Food: '🍔',
  Shopping: '🛍️',
  Waste: '♻️',
  Lifestyle: '🌱',
  Other: '📝',
}

export default function RecommendationsPanel({ recommendations: initialRecs }: RecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState(initialRecs)
  const [loading, setLoading] = useState(false)

  const handleDismiss = async (id: number) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id))
    await dismissRecommendation(id)
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const newRecs = await generateAIRecommendations()
      setRecommendations(newRecs as Recommendation[])
    } catch (error) {
      console.error('[v0] Error refreshing recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground">AI-Powered Recommendations</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="text-sm px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {recommendations.length === 0 ? (
            <motion.div
              className="text-center py-8 text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p>No recommendations yet. Click Refresh to generate AI-powered suggestions!</p>
            </motion.div>
          ) : (
            recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                className="p-4 border border-neutral-200 rounded-lg hover:border-primary/50 transition-all group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl mt-1">
                      {CATEGORY_ICONS[rec.category as keyof typeof CATEGORY_ICONS] || '📝'}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{rec.title}</h3>
                      <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(rec.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    {rec.impact} kg CO₂ impact
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      DIFFICULTY_COLORS[rec.difficulty as keyof typeof DIFFICULTY_COLORS]
                    }`}
                  >
                    {rec.difficulty}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
