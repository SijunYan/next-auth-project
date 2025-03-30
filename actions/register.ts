'use server'

import { RegisterFormType, RegisterSchema } from "../schemas";

export const register = async(values: RegisterFormType) => {
    console.log(values)

    const validateFields = RegisterSchema.safeParse(values)

    if(!validateFields.success) {
        return { error: 'Ivalid fields!' }
    }

    return { success: 'Email sent!'}
}