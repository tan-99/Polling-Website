import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ErrorMessage from '../components/ErrorMessage'
import CreatePoll from '../components/CreatePoll'

const CreatePollPage = ({ isAuthenticated }) => {

    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuthenticated){
        navigate('/login')
      }
    }, [isAuthenticated])
    

  return (
    <div>
        <ErrorMessage />
        <CreatePoll />
    </div>
  )
}

export default CreatePollPage