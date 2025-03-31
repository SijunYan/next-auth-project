'use server'

import bcrypt from 'bcrypt'
import { RegisterFormType, RegisterSchema } from "../schemas";
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const register = async(values: RegisterFormType) => {
    try {
        console.log(values)

        // Validate data
        const validateFields = RegisterSchema.safeParse(values)

        if(!validateFields.success) {
            return { error: 'Ivalid fields!' }
        }

        const { email, password, name } = validateFields.data

        // Valid email if unique (it can be done by database)
        // const existingUser = await db.user.findUnique({
        //     where: { 
        //         email
        //     },
        // })
        // if (existingUser) {
        //     return { error: 'Email already in use!'}
        // }

        // Hash password
        const hassedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                name,
                email,
                password: hassedPassword
            }
        })

        // TODO: send valification token email

        return { success: 'User created!'}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("Known Error: ", error.code, error.meta, error.message)
            if (error.code === 'P2002') {
                return { error: 'Email already in use!'}
            }
        }

        console.log("Unknown Error: ", error)
        return { error: 'Unexpected error! please try again'}
    }
    

    
}