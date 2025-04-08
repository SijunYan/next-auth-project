'use client'

// import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const SettingsPage = () => {

  // const session = await auth()
  const session = useSession()

  console.log('session', session)

  return (
    <div className='w-screen space-y-4'>
      SettingsPage: {JSON.stringify(session)}
      <form 
        action={() => {
          signOut()
        }}
      >
        <Button
          type='submit'
          size='lg'
        >
          Sign out
        </Button>
      </form>
      <h1>Pages:</h1>
      <Button
        variant="link"
      >
        <Link href='/admin'>Admin</Link>
      </Button>
    </div>
  )
}

export default SettingsPage