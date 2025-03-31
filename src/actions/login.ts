'use server'

import { LoginFormType, LoginSchema } from "../schemas";

export const login = async(values: LoginFormType) => {
    console.log(values)

    const validateFields = LoginSchema.safeParse(values)

    if(!validateFields.success) {
        return { error: 'Ivalid fields!' }
    }

    return { success: 'Email sent!'}
}