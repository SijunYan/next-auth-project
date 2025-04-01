'use server'

import { signIn } from "@/auth";
import { LoginFormType, LoginSchema } from "../schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async(values: LoginFormType) => {

    const validateFields = LoginSchema.safeParse(values)

    if(!validateFields.success) {
        return { error: 'Invalid fields!' }
    }

    const {email, password} = validateFields.data
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