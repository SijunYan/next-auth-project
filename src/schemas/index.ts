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

export const ResetFormSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
})

export type ResetFormType = z.infer<typeof ResetFormSchema>

export const NewPasswordFormSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimun 6 characters required'
    }),
})

export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>