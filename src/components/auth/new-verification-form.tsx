'use client'

import React, { useCallback, useEffect } from 'react'
import CardWrapper from './card-wrapper'
import {BeatLoader} from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import newVerification from '@/actions/new-verification'
import FormSuccess from './form-success'
import FormError from './form-error'

const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = React.useState<string | undefined>()
    const [success, setSuccess] = React.useState<string | undefined>()

    const onSubmit = useCallback(() => {
        setSuccess('')
        setError('')

        if(!token){
            setError('Token is missing')
            return
        }
        newVerification(token)
            .then(data => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError('Something went wrong')
            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper
            headLabel='Conforming your verification'
            backButtonHref='/auth/login'
            backButtonLabel='Back to login'
        >
            <div className='flex items-center w-full justify-center'>
                {!success && !error && <BeatLoader />} 
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>
    )
}

export default NewVerificationForm