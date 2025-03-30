import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google'
import React from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '600'
})

interface HeaderProps {
    label: string;
}

function Header({label}: HeaderProps) {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-y-4'>
        <h1 className={cn('text-3xl font-semibold', poppins.className)}>
            Auth
        </h1>
        <p className='text-muted-foreground text-sm'>
            {label}
        </p>
    </div>
  )
}

export default Header