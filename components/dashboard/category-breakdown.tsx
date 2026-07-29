'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useMemo } from 'react'

interface CarbonEntry {
  id: number
  category: string
  value: string
  date: Date
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function CategoryBreakdown({ entries }: { entries: CarbonEntry[] }) {
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {}

    entries.forEach((entry) => {
      categories[entry.category] = (categories[entry.category] || 0) + parseFloat(entry.value)
    })

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value)
  }, [entries])

  if (categoryData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        <p>No data to display</p>
      </div>
    )
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}kg`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} kg CO₂`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {categoryData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-neutral-600">
              {item.name}: <span className="font-semibold">{item.value}kg</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
