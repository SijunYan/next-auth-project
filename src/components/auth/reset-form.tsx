'use client'

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { ResetFormSchema, ResetFormType } from '../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from './form-error'
import FormSuccess from './form-success'
import reset from '@/actions/reset'

function ResetForm() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<ResetFormType>({
        resolver: zodResolver(ResetFormSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = (values: ResetFormType) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            reset(values)
                .then((data) => {
                    // TODO: Add when we add 2FA
                    setSuccess(data?.success)
                    setError(data?.error)
            })
        })
    }

    return (
        <CardWrapper
            headLabel='Forgot your password?'
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
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="name@exampble.com"
                                            type='email'
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
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm