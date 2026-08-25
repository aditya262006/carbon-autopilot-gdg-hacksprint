import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { mongoClient, mongoDb } from '@/lib/mongodb'

const googleClientId = process.env.GOOGLE_CLIENT_ID_2 ?? process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET_2 ?? process.env.GOOGLE_CLIENT_SECRET

if (!googleClientId || !googleClientSecret) {
  console.warn('[v0] Google OAuth environment variables are not configured')
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
