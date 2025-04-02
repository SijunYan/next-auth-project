'use server'

import { db } from "@/lib/db"
import { getVerificationTokenByToken } from "./services/verification-token"
import { getUserByEmail } from "./services/user"

export default async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return {error: "Invalid token"}
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return {error: "Token has expired"}
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingUser) {
    return {error: "User does not exist"}
  }

  await db.user.update({
    where: {
        id: existingUser.id
    },
    data: {
        emailVerified: new Date(),
        // for the user to modify their email address from setting page
        email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: {
        id: existingToken.id
    }
  })

  return {success: "Verification successful"}
}