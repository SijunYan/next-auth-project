import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "./actions/services/user"
import { User } from "@prisma/client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    jwt: async({token}) => {
      console.log('JWT Token: ', token)
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      console.log(existingUser)
      if(!existingUser) return token
      token.role = existingUser.role
      return token
    },
    session: async({token, session}) => {
      console.log('Session Token: ', token)
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role
      }
      return session
    },
    signIn: async({ user }) => {
      // const existingUser = await getUserById(user.id!)
      // console.log('login:', existingUser)
      // if (!existingUser || !( existingUser! as User).emailVerified ) {
      //   return false
      // }
      return true
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})