import React from 'react'

function AuthLayout({
    children
}: React.PropsWithChildren) {
  return (
    <div className='h-full flex justify-center items-center bg-gradient-to-tr from-violet-600 to-indigo-600'>
        {children}
    </div>
  )
}

export default AuthLayout