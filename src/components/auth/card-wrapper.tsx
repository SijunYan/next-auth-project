'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Header from './header'
import Social from './social'
import BackButton from './back-button'

interface CardWrapperProps {
    headLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean,
}

function CardWrapper({
    headLabel,
    backButtonHref,
    backButtonLabel,
    showSocial,
    children
}: React.PropsWithChildren<CardWrapperProps>) {
  return (
    <Card className='w-[400]'>
        <CardHeader>
            <Header label={headLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        </CardFooter>
    </Card>
  )
}

export default CardWrapper