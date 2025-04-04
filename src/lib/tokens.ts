
import { getVerificationTokenByEmail } from '@/actions/services/verification-token'
import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import { getPasswordResetTokenByEmail } from '@/actions/services/password-reset-token'

export const generateVerificationToken = async(email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hour

    const existingToken = await getVerificationTokenByEmail(email)

    // Delete the existing token, then create a new one 
    if (existingToken) {
        await db.verificationToken.delete({ 
            where: { 
                id: existingToken.id 
            } 
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificationToken
}

export const generatePasswordResetToken = async(email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hour

    const existingToken = await getPasswordResetTokenByEmail(email)

    // Delete the existing token, then create a new one 
    if (existingToken) {
        await db.passwordResetToken.delete({ 
            where: { 
                id: existingToken.id 
            } 
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return passwordResetToken
}
