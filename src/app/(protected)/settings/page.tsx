import { auth } from '@/auth'
import React from 'react'

const SettingsPage = async() => {

  const session = await auth()

  return (
    <div>SettingsPage: {JSON.stringify(session)}</div>
  )
}

export default SettingsPage