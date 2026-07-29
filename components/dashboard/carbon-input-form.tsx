'use client'

import { useState } from 'react'
import { addCarbonEntry } from '@/app/actions/carbon'
import { motion } from 'framer-motion'

interface CarbonInputFormProps {
  onSuccess?: () => void
}

const CATEGORIES = [
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Energy', label: '⚡ Energy' },
  { value: 'Food', label: '🍔 Food' },
  { value: 'Shopping', label: '🛍️ Shopping' },
  { value: 'Waste', label: '♻️ Waste' },
  { value: 'Other', label: '📝 Other' },
]

export default function CarbonInputForm({ onSuccess }: CarbonInputFormProps) {
  const [category, setCategory] = useState('Transport')
  const [value, setValue] = useState('')
  const [source, setSource] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value) return

    setLoading(true)
    try {
      await addCarbonEntry({
        category,
        value: parseFloat(value),
        source: source || undefined,
        notes: notes || undefined,
        date: new Date(),
      })

      setCategory('Transport')
      setValue('')
      setSource('')
      setNotes('')

      onSuccess?.()
    } catch (error) {
      console.error('[v0] Error adding entry:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">Log Your Carbon Footprint</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all border ${
                    category === cat.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-foreground border-neutral-200 hover:border-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Emissions (kg CO₂)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., 25.5"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 bg-white text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Source and Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (optional)"
            className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading || !value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Log Emissions'}
        </motion.button>
      </form>
    </motion.div>
  )
}
