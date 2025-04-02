'use server'

import { signIn } from "@/auth";
import { LoginFormType, LoginSchema } from "../schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./services/user";
import { generateVerificationToken } from "@/lib/email-tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async(values: LoginFormType) => {

    const validateFields = LoginSchema.safeParse(values)

    if(!validateFields.success) {
        return { error: 'Invalid fields!' }
    }

    const {email, password} = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return {error: 'User not found!'}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(existingUser.email, verificationToken.token)
        return {success: 'Please verify your email first! Comfirmation email sent!'}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            console.log(error.type)
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: 'Invalid credentials!'}
                case 'AccessDenied':
                    return {error: 'Access denied!'}
                default:
                    return {error: 'Something went wrong! Please try again later'}
            }
        }
        throw error
    }
}