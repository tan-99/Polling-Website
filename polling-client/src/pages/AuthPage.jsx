import React from 'react'
import { Navigate } from 'react-router-dom'

import ErrorMessage from '../components/ErrorMessage'
import AuthComp from '../components/AuthComp'

const AuthPage = ({ authType, isAuthenticated }) => {

    // if (isAuthenticated) return <Navigate to="/" />

  return (
    <div>
        <ErrorMessage />
        <AuthComp authType={authType} />
    </div>
  )
}

export default AuthPage