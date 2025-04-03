'use server'

import { db } from "@/lib/db"
import { getUserByEmail } from "./services/user"
import { NewPasswordFormSchema, NewPasswordFormType } from "@/schemas"
import { getPasswordResetTokenByToken } from "./services/password-reset-token"
import bcrypt from "bcryptjs"

/**
 * 
 * @description Update password.
 */
export default async function newPassword(values: NewPasswordFormType, token: string | null) {
  if (!token) {
    return {error: "Missing token"}
  }

  const validateFields = NewPasswordFormSchema.safeParse(values)

  if(!validateFields.success) {
    return {error: 'Invalid fields'}
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return {error: "Invalid token"}
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return {error: "Token has expired"}
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingUser) {
    return {error: "Email does not exist"}
  }

  const hashedPassword = await bcrypt.hash(values.password, 10)

  await db.user.update({
    where: {
        id: existingUser.id
    },
    data: {
        password: hashedPassword,
    }
  })

  await db.passwordResetToken.delete({
    where: {
        id: existingToken.id
    }
  })

  return {success: "Password updated"}
}