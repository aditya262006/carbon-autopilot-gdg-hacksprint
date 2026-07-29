'use client'

import { motion } from 'framer-motion'

interface LeaderboardProps {
  userRank: number
  userPoints: number
}

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  streak: number
  isUser: boolean
}

export default function Leaderboard({ userRank, userPoints }: LeaderboardProps) {
  // Mock leaderboard data for demonstration
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'Alex Green', points: 2500, streak: 45, isUser: false },
    { rank: 2, name: 'Jordan Eco', points: 2350, streak: 38, isUser: false },
    { rank: 3, name: 'Casey Nature', points: 2100, streak: 32, isUser: false },
    { rank: 4, name: 'Morgan Sustainable', points: 1950, streak: 28, isUser: false },
    { rank: 5, name: 'Riley Carbon', points: 1800, streak: 25, isUser: false },
    { rank: userRank, name: 'You', points: userPoints, streak: 7, isUser: true },
  ]

  const medals = ['🥇', '🥈', '🥉']

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">Global Leaderboard</h2>

      <div className="space-y-2">
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={entry.rank}
            className={`p-4 rounded-lg border-2 transition-all ${
              entry.isUser
                ? 'bg-primary/10 border-primary'
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ translateX: 4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold w-8 text-center">
                  {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
                </div>
                <div>
                  <h3
                    className={`font-bold ${
                      entry.isUser ? 'text-primary text-lg' : 'text-foreground'
                    }`}
                  >
                    {entry.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    🔥 {entry.streak}-day streak
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{entry.points}</p>
                <p className="text-xs text-neutral-500">points</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Challenge Section */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg border border-accent/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-foreground mb-3">🎯 This Week's Challenge</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">
              Reduce Transport Emissions by 20%
            </p>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ delay: 0.5, duration: 1 }}
              ></motion.div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">1,250 participants • 250 points reward</p>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            Join Challenge
          </button>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        className="mt-6 grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-neutral-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">15,420</p>
          <p className="text-xs text-neutral-500 mt-1">Total CO₂ Prevented</p>
        </div>
        <div className="bg-neutral-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">4,321</p>
          <p className="text-xs text-neutral-500 mt-1">Active Members</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
