'use client'

import { useState } from 'react'
import Link from 'next/link'
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
      setError('We could not start Google sign-in. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-svh bg-background px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden min-h-[620px] flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
            <span className="font-mono text-sm font-semibold tracking-[0.2em]">CARBON AUTOPILOT</span>
            <div>
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] opacity-75">Small steps, visible impact</p>
              <h1 className="max-w-md text-balance text-5xl font-semibold leading-tight">Your lighter future starts here.</h1>
              <p className="mt-6 max-w-md text-base leading-7 opacity-80">Understand your footprint, build better habits, and let useful insight guide the way.</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] opacity-60">Measure what matters</p>
          </div>
          <div className="flex min-h-[620px] flex-col justify-center p-8 sm:p-14">
            <Link href="/" className="mb-14 font-mono text-xs tracking-[0.16em] text-muted-foreground lg:hidden">CARBON AUTOPILOT</Link>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-primary">{isSignUp ? 'Begin your journey' : 'Welcome back'}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">{isSignUp ? 'Create your account' : 'Sign in to continue'}</h2>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground">{isSignUp ? 'Join a growing community making sustainability practical.' : 'Pick up where you left off and see your progress.'}</p>
            <div className="mt-10">
              <Button type="button" onClick={handleGoogle} disabled={loading} className="h-12 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90">
                <span className="mr-3 grid h-6 w-6 place-items-center rounded-full bg-background text-sm font-bold text-foreground">G</span>
                {loading ? 'Connecting…' : `Continue with Google`}
              </Button>
              {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">{isSignUp ? 'Already have an account? ' : 'New to Carbon Autopilot? '}<Link href={isSignUp ? '/sign-in' : '/sign-up'} className="font-semibold text-primary hover:underline">{isSignUp ? 'Sign in' : 'Create one'}</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}
