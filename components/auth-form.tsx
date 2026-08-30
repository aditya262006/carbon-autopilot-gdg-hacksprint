'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  async function handleGoogle() {
    setLoading(true)
    setError(null)
    const result = await signIn('google', { callbackUrl: '/dashboard', redirect: false })
    if (result?.error) {
      setError('Google sign-in is not configured yet. Please check the OAuth credentials in your project variables.')
      setLoading(false)
      return
    }
    if (result?.url) window.location.assign(result.url)
  }

  return (
    <main className="min-h-svh bg-background px-4 py-4 text-foreground sm:px-6 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-2rem)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_-24px_hsl(var(--foreground)/.35)] lg:grid-cols-[1.05fr_.95fr]">
          <section className="relative hidden min-h-[680px] overflow-hidden lg:block" aria-label="Carbon Autopilot story">
            <Image src="/auth-forest.png" alt="Sunlight through a green forest" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/.12),hsl(var(--foreground)/.78))]" />
            <div className="relative z-10 flex min-h-[680px] flex-col justify-between p-12 text-background">
              <div className="flex items-center gap-3 font-mono text-xs font-bold tracking-[.2em]"><span className="grid size-9 place-items-center rounded-full bg-background/15 backdrop-blur"><Leaf className="size-4" /></span>CARBON AUTOPILOT</div>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[.2em] text-background/70">Small steps, visible impact</p>
                <h1 className="max-w-lg text-balance text-5xl font-semibold leading-[1.05] tracking-tight">Make room for a lighter way to live.</h1>
                <p className="mt-6 max-w-md text-base leading-7 text-background/75">Turn everyday choices into a clearer picture of your footprint—and a practical plan to improve it.</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.15em] text-background/65"><Sparkles className="size-4" /> Thoughtful data. Better habits.</div>
            </div>
          </section>
          <section className="flex min-h-[680px] flex-col justify-center p-7 sm:p-14">
            <Link href="/" className="mb-16 flex items-center gap-2 font-mono text-xs font-bold tracking-[.16em] text-muted-foreground lg:hidden"><Leaf className="size-4 text-primary" /> CARBON AUTOPILOT</Link>
            <div className="max-w-md">
              <p className="font-mono text-xs uppercase tracking-[.18em] text-primary">{isSignUp ? 'Begin your journey' : 'Welcome back'}</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{isSignUp ? 'Create your account' : 'Sign in to continue'}</h2>
              <p className="mt-5 leading-7 text-muted-foreground">{isSignUp ? 'Join a growing community making sustainability practical.' : 'Pick up where you left off and see your progress.'}</p>
              <div className="mt-10 flex flex-col gap-4">
                <Button type="button" onClick={handleGoogle} disabled={loading} className="h-13 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90">
                  <span className="mr-3 grid size-6 place-items-center rounded-full bg-background text-sm font-bold text-foreground">G</span>
                  {loading ? 'Opening Google…' : 'Continue with Google'}
                </Button>
                {error && <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm leading-6 text-destructive" role="alert">{error}</p>}
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Secure sign-in. Your data stays yours.</div>
              <p className="mt-10 text-center text-sm text-muted-foreground">{isSignUp ? 'Already have an account? ' : 'New to Carbon Autopilot? '}<Link href={isSignUp ? '/sign-in' : '/sign-up'} className="font-semibold text-primary hover:underline">{isSignUp ? 'Sign in' : 'Create one'}</Link></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
