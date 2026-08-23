'use client'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()
  const [commute, setCommute] = useState(10)
  const [electricity, setElectricity] = useState(200)
  const [meals, setMeals] = useState(5)
  const [carbon, setCarbon] = useState<number | null>(null)
  const [insight, setInsight] = useState('')
  const [reducedCarbon, setReducedCarbon] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const calculateCarbon = async () => {
    setLoading(true)
    const result =
      commute * 0.21 +
      electricity * 0.82 +
      meals * 2.5

    const finalValue = Number(result.toFixed(2))
    setCarbon(finalValue)

    const optimized = Number((finalValue * 0.85).toFixed(2))
    setReducedCarbon(optimized)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carbon: finalValue, commute, electricity, meals })
      })
      const data = await response.json()
      setInsight(data.insight || 'Unable to generate AI insight at this time.')
    } catch (error) {
      console.error('Error fetching AI insight:', error)
      setInsight('Unable to generate AI insight at this time.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Carbon Autopilot
            </h1>
            <p className="text-gray-600">
              Sign in to track your carbon footprint
            </p>
          </div>
          <a
            href="/auth/signin"
            className="block w-full bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3 h-12 text-base font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </a>
        </div>
      </div>
    )
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded-full border text-sm hover:opacity-80"
            >
              {darkMode ? '☀ Light' : '🌙 Dark'}
            </button>
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Sign out
              </button>
            </div>
          </div>
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
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                  <p className="text-sm">Generating AI insight...</p>
                </div>
              ) : (
                <p className="text-sm">{insight}</p>
              )}
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
