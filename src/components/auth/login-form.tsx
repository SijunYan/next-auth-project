import React from 'react'
import CardWrapper from './card-wrapper'

function LoginForm() {
  return (
    <CardWrapper
        headLabel='Welcome back'
        backButtonLabel="Don't have an account?"
        backButtonHref='/anth/register'
        showSocial
    >
        LoginForm
    </CardWrapper>
  )
}

export default LoginForm