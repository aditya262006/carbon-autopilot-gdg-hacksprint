import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/dashboard/dashboard-client'

export const metadata = {
  title: 'Dashboard - Carbon Autopilot',
  description: 'Track and reduce your carbon footprint with AI-powered insights',
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')

  return <DashboardClient />
}
