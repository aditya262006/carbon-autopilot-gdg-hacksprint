import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { mongoClient, mongoDb } from '@/lib/mongodb'

function envValue(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim()
    if (value && !value.startsWith('process.env.')) return value
  }
  return undefined
}

const googleClientId = envValue('GOOGLE_CLIENT_ID_2', 'GOOGLE_CLIENT_ID')
const googleClientSecret = envValue('GOOGLE_CLIENT_SECRET_2', 'GOOGLE_CLIENT_SECRET')
const nextAuthSecret = envValue('NEXTAUTH_SECRET_2', 'NEXTAUTH_SECRET')
const nextAuthUrl = envValue('NEXTAUTH_URL_2', 'NEXTAUTH_URL')

if (!googleClientId || !googleClientSecret || !nextAuthSecret) {
  console.warn('[v0] Auth configuration is incomplete. Set real Google OAuth credentials and NEXTAUTH_SECRET_2.')
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(mongoClient, { databaseName: 'carbon-autopilot' }),
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  secret: nextAuthSecret,
  session: { strategy: 'database' },
  pages: { signIn: '/sign-in' },
  trustHost: true,
  ...(nextAuthUrl ? { redirectProxyUrl: nextAuthUrl } : {}),
})

export { mongoDb }

export function hasGoogleConfiguration() {
  return Boolean(googleClientId && googleClientSecret && nextAuthSecret)
}
