import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = ({ error }) => {

  return (
    <>
        {console.log(error.message)}
        {error.message && <div className="error">{error.message.message}</div>}
        {/* {error.message && <div className='error'>{error.message.message}</div>} */}
    </>
  )
}

export default connect(store => ({ error: store.error }))(ErrorMessage);
