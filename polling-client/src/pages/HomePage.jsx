import React from 'react'
import Polls from '../components/Polls'
import ErrorMessage from '../components/ErrorMessage'

const HomePage = (props) => {
  return (
    <>
        {console.log('Im in homepge')}
        <ErrorMessage />
        <Polls />
    </> 
  )
}

export default HomePage