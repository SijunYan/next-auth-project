import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "./actions/services/user"
import { User } from "@prisma/client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    jwt: async({token}) => {
      // add custom properties
      console.log('JWT Token: ', token)
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      console.log(existingUser)
      if(!existingUser) return token
      token.role = existingUser.role
      return token
    },
    session: async({token, session}) => {
      // add custom properties
      console.log('Session Token: ', token)
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role
      }
      return session
    },
    signIn: async({ user, account }) => {
      if (account?.provider === 'credentials') {
        // block sign in if user is not verified by email
        const existingUser = await getUserById(user.id!)
        if (!existingUser || !( existingUser! as User).emailVerified ) {
          return false
        }

        // TODO: add 2FA check
      }
      return true
    }
  },
  events: {
    async linkAccount({ account, user }) {
      // add emailVerified for Oauth users
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})