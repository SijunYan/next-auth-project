'use server'

import { db } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ResetFormSchema, ResetFormType } from "@/schemas"

/**
 * 
 * @description Sends a password reset email to the user's email address.
 * @param values 
 * @returns 
 */

export default async function reset(values: ResetFormType) {
   try {
        // Validate data
        const validateFields = ResetFormSchema.safeParse(values)

        if(!validateFields.success) {
            return { error: 'Invalid email!' }
        }

        const { email } = validateFields.data

        const existingUser = await db.user.findUnique({
            where: { 
                email
            },
        })

        if (!existingUser) {
            return { error: 'Email not found!'}
        }

        const passwordResetToken = await generatePasswordResetToken(email)

        await sendPasswordResetEmail(email, passwordResetToken.token)

        return { success: 'Reset email sent!'}
    } catch (error) {
        return { error: 'Internal error!'}
    }
}