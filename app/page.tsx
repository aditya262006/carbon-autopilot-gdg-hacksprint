import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

  return (
    <main className="min-h-svh bg-background px-6 py-8 text-foreground">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-widest text-primary">CARBON AUTOPILOT</Link>
        <Link href="/sign-in" className="rounded-full border border-border px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary">Sign in</Link>
      </nav>
      <section className="mx-auto flex min-h-[78svh] max-w-6xl items-center py-20">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.25em] text-primary">A clearer way to live lighter</p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Make every choice count.</h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">Carbon Autopilot turns everyday activity into simple, actionable insight so your progress feels visible, personal, and achievable.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/sign-up" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Start tracking</Link>
            <Link href="/sign-in" className="rounded-full border border-border px-7 py-3 font-semibold transition hover:border-primary hover:text-primary">I have an account</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
