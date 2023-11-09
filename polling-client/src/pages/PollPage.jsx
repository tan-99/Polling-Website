import React from 'react'
import { useMatch, useParams } from 'react-router-dom'
import Poll from '../components/Poll'
import ErrorMessage from '../components/ErrorMessage'

const PollPage = ({ getPoll }) => {

    const { id } = useParams()
    console.log(id)
    getPoll(id)

  return (
    <div>
        {console.log('Im in PollPage')}
        <ErrorMessage />
        <Poll />
    </div>
  )
}

export default PollPage