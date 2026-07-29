'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

interface CarbonEntry {
  id: number
  category: string
  value: string
  date: Date
  source?: string | null
}

export default function EmissionsChart({ entries }: { entries: CarbonEntry[] }) {
  const chartData = useMemo(() => {
    const dailyData: Record<string, { date: string; emissions: number }> = {}

    entries.forEach((entry) => {
      const date = new Date(entry.date)
      const dateKey = date.toISOString().split('T')[0]

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: new Date(dateKey).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          emissions: 0,
        }
      }

      dailyData[dateKey].emissions += parseFloat(entry.value)
    })

    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30)
  }, [entries])

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        <p>No emissions data yet. Add your first entry to see charts!</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#1a1a1a' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="emissions"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 4 }}
          activeDot={{ r: 6 }}
          name="CO₂ Emissions (kg)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
