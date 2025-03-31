import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export type LoginFormType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {
        message: 'Minimun 6 characters required'
    }),
    name: z.string().min(1, {
        message: 'Name is required'
    })
})

export type RegisterFormType = z.infer<typeof RegisterSchema>