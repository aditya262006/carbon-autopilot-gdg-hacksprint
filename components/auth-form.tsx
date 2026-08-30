'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  async function handleGoogle() {
    setLoading(true)
    setError(null)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch {
      setError('Google sign-in could not start. Check the OAuth settings and try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-svh bg-background px-4 py-4 text-foreground sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)] lg:min-h-[680px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative hidden overflow-hidden lg:block">
            <Image src="/carbon-forest.png" alt="A young sapling growing from the soil" fill priority className="object-cover" sizes="55vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,35,27,0.16),rgba(12,35,27,0.9))]" />
            <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
              <Link href="/" className="font-mono text-sm font-semibold tracking-[0.2em]">CARBON AUTOPILOT</Link>
              <div className="max-w-md">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Small steps, visible impact</p>
                <h1 className="text-balance text-5xl font-semibold leading-[1.05]">Make your footprint feel actionable.</h1>
                <p className="mt-6 max-w-sm text-base leading-7 text-primary-foreground/75">Track the choices that shape your impact, then turn better data into lighter habits.</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground/60">Measure what matters</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-14 lg:p-16">
            <Link href="/" className="mb-12 font-mono text-xs tracking-[0.16em] text-muted-foreground lg:hidden">CARBON AUTOPILOT</Link>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{isSignUp ? 'Begin your journey' : 'Welcome back'}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance">{isSignUp ? 'Create your account' : 'Sign in to continue'}</h2>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground">{isSignUp ? 'A clearer way to understand your impact starts with one account.' : 'Pick up where you left off and see your progress.'}</p>
            <div className="mt-10">
              <Button type="button" onClick={handleGoogle} disabled={loading} className="h-13 w-full rounded-xl bg-foreground text-background shadow-sm transition-transform hover:bg-foreground/90 hover:-translate-y-0.5">
                <span className="mr-3 grid h-7 w-7 place-items-center rounded-full bg-background text-sm font-bold text-foreground">G</span>
                {loading ? 'Connecting…' : 'Continue with Google'}
              </Button>
              {error && <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">{isSignUp ? 'Already have an account? ' : 'New to Carbon Autopilot? '}<Link href={isSignUp ? '/sign-in' : '/sign-up'} className="font-semibold text-primary hover:underline">{isSignUp ? 'Sign in' : 'Create one'}</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}
