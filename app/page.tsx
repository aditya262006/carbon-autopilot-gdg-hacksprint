import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Carbon Autopilot - Track & Reduce Your Carbon Footprint',
  description:
    'AI-powered sustainability dashboard to track emissions and get personalized recommendations for reducing your carbon footprint.',
}

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-neutral-200 sticky top-0 z-40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">🌱 Carbon Autopilot</div>
          <Link
            href="/sign-in"
            className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Track. Reduce. Thrive.
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Carbon Autopilot combines AI insights with community engagement to help you understand and reduce your carbon footprint—one sustainable choice at a time.
            </p>
            <div className="flex gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📊</span>
                <div>
                  <h3 className="font-bold text-foreground">Real-time Analytics</h3>
                  <p className="text-sm text-neutral-600">Track emissions across 6 categories</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl">🤖</span>
                <div>
                  <h3 className="font-bold text-foreground">AI Recommendations</h3>
                  <p className="text-sm text-neutral-600">Powered by Google Gemini 2.0</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl">👥</span>
                <div>
                  <h3 className="font-bold text-foreground">Community Challenges</h3>
                  <p className="text-sm text-neutral-600">Compete with global peers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <h3 className="font-bold text-foreground">Gamification</h3>
                  <p className="text-sm text-neutral-600">Earn badges and streaks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-200">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '📈',
              title: 'Dashboard',
              description:
                'Visualize your emissions with interactive charts and detailed breakdowns by category.',
            },
            {
              icon: '💡',
              title: 'Smart Recommendations',
              description:
                'AI generates personalized optimization strategies ranked by impact and feasibility.',
            },
            {
              icon: '🔥',
              title: 'Streak Tracking',
              description:
                'Maintain daily logging streaks and unlock achievements as you reach milestones.',
            },
            {
              icon: '🌍',
              title: 'Global Leaderboard',
              description:
                'Compare your progress with others and inspire action in the sustainability community.',
            },
            {
              icon: '🎯',
              title: 'Weekly Challenges',
              description:
                'Participate in community challenges and earn rewards for meeting reduction targets.',
            },
            {
              icon: '⭐',
              title: 'Points & Badges',
              description:
                'Unlock achievements like Eco Warrior and 7-Day Tracker as you build sustainable habits.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-neutral-200 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-200">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border border-primary/20 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join thousands of sustainability enthusiasts tracking and reducing their carbon footprint with
            AI-powered insights.
          </p>
          <Link
            href="/sign-up"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-colors"
          >
            Start Your Sustainability Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-neutral-600">
          <p>
            🌱 Carbon Autopilot • Making sustainability accessible through technology • Built for impact
          </p>
        </div>
      </footer>
    </div>
  )
}
