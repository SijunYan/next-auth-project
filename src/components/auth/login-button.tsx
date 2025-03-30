'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
    mode?: 'modal' | 'redirect',
    asChild?: boolean,
}

function LoginButton({
    mode = 'redirect',
    asChild,
    children
}: React.PropsWithChildren<LoginButtonProps>) {
    const router = useRouter()

    const onClick = () => {
        console.log('login btn')
        router.push('/auth/login')
    }

    return (
        <span 
            className='cursor-pointer'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default LoginButton