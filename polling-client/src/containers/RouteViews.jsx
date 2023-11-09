import React from 'react'
import {connect, useDispatch} from 'react-redux'
import {Routes, Route, useParams} from 'react-router-dom'

import { getCurrentPoll } from '../store/actions';

import AuthPage from '../pages/AuthPage'
import TestPage from '../pages/TestPage'
import HomePage from '../pages/HomePage';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';

const RouteViews = ({ auth, getCurrentPoll }) => {

  return (
    <>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<AuthPage authType="login" isAuthenticated={auth.isAuthenticated} />}/>
            <Route exact path="/register" element={<AuthPage authType="register" isAuthenticated={auth.isAuthenticated} />}/>
            <Route exact path="/test" element={ <TestPage />}/>
            <Route exact path="/poll/:id" element={<PollPage getPoll={(id) => getCurrentPoll(id)} />} />
            <Route exact path="/poll/new" element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />} />
        </Routes>
    </>
  )
}

export default connect(store => ({ auth: store.auth }), { getCurrentPoll })(RouteViews)