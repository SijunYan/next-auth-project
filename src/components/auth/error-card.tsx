import React from 'react'
import CardWrapper from './card-wrapper'

const ErrorCard = () => {
  return (
    <CardWrapper
        headLabel='Oops! Something went wrong!'
        backButtonLabel='Back to login'
        backButtonHref='/auth/login'
    >
    </CardWrapper>
    
  )
}

export default ErrorCard