import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'

import { authUser, logout } from '../store/actions'

const AuthComp = ({ authType }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const handleSubmit= (e) => {
        e.preventDefault()
        console.log(username, password)
        dispatch(authUser(authType || 'login', {username, password} ));
    }

  return (
    <div>
        <form action="" className='form' onSubmit={handleSubmit}>
            <label htmlFor="username" className='form-label'>Username</label>
            <input className="form-input" type="text" value={username} name='username' onChange={ (e) => { setUsername(e.target.value)} } />

            <label htmlFor="password" className='form-label'>Password</label>
            <input className="form-input" type="password" value={password} name="password" onChange={ (e) => { setPassword(e.target.value) }} />

            <div className="button_center">
              <button className="button" type='submit'>
                  Submit
              </button>
            </div>
        </form>
    </div>
  )
}

export default connect(
    () => ({}), 
    { authUser, logout }
  )(AuthComp);