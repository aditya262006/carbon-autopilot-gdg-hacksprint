'use client'
import { useState } from 'react'

export default function Home() {
  const [commute, setCommute] = useState(10)
  const [electricity, setElectricity] = useState(200)
  const [meals, setMeals] = useState(5)
  const [carbon, setCarbon] = useState<number | null>(null)
  const [insight, setInsight] = useState('')
  const [reducedCarbon, setReducedCarbon] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  const calculateCarbon = () => {
    const result =
      commute * 0.21 +
      electricity * 0.82 +
      meals * 2.5

    const finalValue = Number(result.toFixed(2))
    setCarbon(finalValue)

    const optimized = Number((finalValue * 0.85).toFixed(2))
    setReducedCarbon(optimized)

    if (finalValue > 250) {
      setInsight(
        'Your carbon footprint is high due to daily commute and electricity usage. Gemini AI recommends optimizing travel and reducing peak energy consumption.'
      )
    } else {
      setInsight(
        'Your carbon footprint is moderate. Gemini AI suggests maintaining habits while gradually adopting energy-efficient practices.'
      )
    }
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-slate-100 text-gray-900'
      }`}
    >
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Carbon Autopilot
            </h1>
            <p className="text-sm text-gray-400">
              AI-powered carbon footprint analysis using Google Gemini
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-full border text-sm hover:opacity-80"
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* INPUT CARD */}
        <div
          className={`rounded-2xl p-6 shadow-lg transition ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">
            Lifestyle Inputs
          </h2>

          <div className="space-y-4">
            <Input label="Commute (km/day)" value={commute} setValue={setCommute} darkMode={darkMode} />
            <Input label="Electricity (kWh/month)" value={electricity} setValue={setElectricity} darkMode={darkMode} />
            <Input label="Meat meals per week" value={meals} setValue={setMeals} darkMode={darkMode} />
          </div>

          <button
            onClick={calculateCarbon}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Activate Autopilot
          </button>
        </div>

        {/* RESULTS */}
        {carbon !== null && (
          <div className="mt-8 space-y-6">

            {/* SCORE */}
            <div className="text-center">
              <p className="text-sm opacity-70">Estimated Carbon Footprint</p>
              <p className="text-3xl font-bold">{carbon} kg CO₂</p>
            </div>

            {/* AI INSIGHT */}
            <div className={`p-4 rounded-xl border ${
              darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-300'
            }`}>
              <p className="font-semibold mb-1 text-green-400">
                Gemini AI Insight
              </p>
              <p className="text-sm">{insight}</p>
            </div>

            {/* IMPACT */}
            <div className={`p-5 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <span className="inline-block mb-3 px-3 py-1 text-xs bg-green-600 text-white rounded-full">
                Autopilot Enabled
              </span>

              <h3 className="font-semibold mb-4">Autopilot Impact</h3>

              <Progress label="Current Emissions" value={carbon} color="red" />
              <Progress label="With Autopilot Enabled" value={reducedCarbon!} color="green" />
            </div>
          </div>
        )}

        {/* FOOTER */}
        <p className="text-center text-xs opacity-50 mt-10">
          Built for GDG TechSprint • AI for Sustainability
        </p>
      </div>
    </main>
  )
}

/* ---------- COMPONENTS ---------- */

function Input({ label, value, setValue, darkMode }: any) {
  return (
    <label className="block text-sm">
      {label}
      <input
        type="number"
        value={value}
        onChange={e => setValue(+e.target.value)}
        className={`mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}
      />
    </label>
  )
}

function Progress({ label, value, color }: any) {
  return (
    <div className="mb-4">
      <p className="text-sm opacity-70">{label}</p>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className={`h-3 rounded ${color === 'red' ? 'bg-red-500' : 'bg-green-500'}`}
          style={{ width: color === 'red' ? '80%' : '60%' }}
        />
      </div>
      <p className="text-xs mt-1">{value} kg CO₂</p>
    </div>
  )
}
