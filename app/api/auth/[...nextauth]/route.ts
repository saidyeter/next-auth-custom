import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from "next-auth"

declare module "next-auth" {
  interface User {
    // this is for below Session definition and for the CredentialsProvider.authorize method return type
    favouriteFruit: string;
  }
  interface Session {
    // with this we will be able to see all fields from user whenever session required
    user: User
  }
}

export const authOptions: AuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.favouriteFruit = user.favouriteFruit
      }
      return token
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        // retrieve user from db or external api via fetch
        if (credentials?.username == "s@yeter.com" && credentials.password == "p@ssw0rd") {
          return {
            id: "user_id",
            email: "s@yeter.com",
            image: "https://someurl.com/syeter.png",
            name: "Said",
            favouriteFruit: "Grape",
          }
        }
        return null
      }
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import { getServerSession } from "next-auth"
export function auth() {
  return getServerSession(authOptions)
}
