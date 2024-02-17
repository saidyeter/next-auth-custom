import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
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