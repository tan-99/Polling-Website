import React from 'react'
import Poll from '../components/Poll'
import ErrorMessage from '../components/ErrorMessage'
import AuthPage from './AuthPage'
import CreatePollPage from './CreatePollPage'

const TestPage = () => {
  return (
    <>
        <h1>UI Test page</h1>

        <h2>Testing error component</h2>
        <ErrorMessage />
        <hr />

        <h2>Testing Auth Comp</h2>
        <AuthPage />

        <h2>Testing create poll comp</h2>
        <CreatePollPage />
    </>
  )
}

export default TestPage