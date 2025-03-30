'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className='w-full flex items-center gap-x-2'>
        <Button
            size='lg'
            variant='outline'
            className='w-full shrink'
            onClick={()=>{}}
        >
            <FcGoogle className='h-5 w-5' />
        </Button>
        <Button
            size='lg'
            variant='outline'
            className='w-full shrink'
            onClick={()=>{}}
        >
            <FaGithub  className='h-5 w-5' />
        </Button>
    </div>
  )
}

export default Social