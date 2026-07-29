'use client'

import { motion } from 'framer-motion'

interface AchievementsBadgesProps {
  streak: number
}

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  unlocked: boolean
  requirement?: string
}

export default function AchievementsBadges({ streak }: AchievementsBadgesProps) {
  const badges: Badge[] = [
    {
      id: 'seven_day_streak',
      name: '7-Day Tracker',
      icon: '🔥',
      description: 'Log emissions for 7 consecutive days',
      unlocked: streak >= 7,
    },
    {
      id: 'thirty_day_streak',
      name: '30-Day Champion',
      icon: '⭐',
      description: 'Log emissions for 30 consecutive days',
      unlocked: streak >= 30,
    },
    {
      id: 'fifty_percent_reduction',
      name: 'Eco Warrior',
      icon: '🌱',
      description: 'Reduce monthly emissions by 50%',
      unlocked: false,
    },
    {
      id: 'social_butterfly',
      name: 'Community Lover',
      icon: '👥',
      description: 'Join a community challenge',
      unlocked: false,
    },
    {
      id: 'data_detective',
      name: 'Data Detective',
      icon: '🔍',
      description: 'Log 100 emissions entries',
      unlocked: false,
    },
    {
      id: 'carbon_ninja',
      name: 'Carbon Ninja',
      icon: '🥋',
      description: 'Reach top 10 on leaderboard',
      unlocked: false,
    },
  ]

  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Achievements</h2>
        <p className="text-sm text-neutral-500 mt-1">
          {unlockedCount} of {badges.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              badge.unlocked
                ? 'bg-primary/10 border-primary'
                : 'bg-neutral-50 border-neutral-200'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={badge.unlocked ? { scale: 1.05 } : {}}
          >
            <div className="text-center">
              <div className={`text-3xl mb-2 ${badge.unlocked ? '' : 'opacity-40 grayscale'}`}>
                {badge.icon}
              </div>
              <h3
                className={`text-xs font-bold mb-1 ${
                  badge.unlocked ? 'text-foreground' : 'text-neutral-400'
                }`}
              >
                {badge.name}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-primary font-semibold">🔥 Current Streak: {streak} days</p>
      </motion.div>
    </motion.div>
  )
}
