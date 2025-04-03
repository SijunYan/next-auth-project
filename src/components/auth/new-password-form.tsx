'use client'

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import FormSuccess from './form-success'
import FormError from './form-error'
import { useForm } from 'react-hook-form'
import { NewPasswordFormSchema, NewPasswordFormType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSearchParams } from 'next/navigation'
import newPassword from '@/actions/new-password'

const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<NewPasswordFormType>({
        resolver: zodResolver(NewPasswordFormSchema),
        defaultValues: {
            password: '',
        }
    })

    const onSubmit = (values: NewPasswordFormType) => {
        setError('')
        setSuccess('')
        
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setSuccess(data.success)
                    setError(data.error)
                })
        })
    }

    return (
        <CardWrapper
            headLabel='Enter a new password'
            backButtonLabel="Back to login"
            backButtonHref='/auth/login'
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'
                >
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full'
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default NewPasswordForm