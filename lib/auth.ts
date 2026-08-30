import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { mongoClient, mongoDb } from '@/lib/mongodb'

function readEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim()
    if (value && !value.startsWith('process.env.') && value !== 'undefined') return value
  }
  return undefined
}

const googleClientId = readEnv('GOOGLE_CLIENT_ID_2', 'GOOGLE_CLIENT_ID')
const googleClientSecret = readEnv('GOOGLE_CLIENT_SECRET_2', 'GOOGLE_CLIENT_SECRET')

if (!googleClientId || !googleClientSecret) {
  console.warn('[v0] Google OAuth is not configured with real credential values')
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(mongoClient, { databaseName: 'carbon-autopilot' }),
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  session: { strategy: 'database' },
  pages: { signIn: '/sign-in' },
  trustHost: true,
})

export { mongoDb }
