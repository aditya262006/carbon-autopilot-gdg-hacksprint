import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: string | number
  unit: string
  icon: string
  trend?: number
}

export default function StatsCard({ title, value, unit, icon, trend }: StatsCardProps) {
  const isPositive = (trend ?? 0) > 0
  const isTrendGood = title.includes('Emissions') ? !isPositive : isPositive

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
      whileHover={{ translateY: -4 }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-3xl">{icon}</span>
        {trend !== undefined && (
          <span
            className={`text-sm font-semibold ${
              isTrendGood ? 'text-primary' : 'text-red-500'
            }`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-neutral-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span className="text-neutral-500 text-sm">{unit}</span>
      </div>
    </motion.div>
  )
}
