import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import Navbar from './Navbar'

import { store } from '../store' //destructuring because not a default export
import { setCurrentUser, addError, setToken } from '../store/actions'

import RouteViews from './RouteViews'

import ErrorMessage from '../components/ErrorMessage';
import AuthComp from '../components/AuthComp';

if(localStorage.jwtToken){
  setToken(localStorage.getItem('jwtToken'))
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (error) {
    store.dispatch(setCurrentUser({}))
    store.dispatch(addError(error))
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <RouteViews />
      </>
    </Router>
  </Provider>
);

export default App

/*<AuthComp authType={'login'}/>
        <ErrorMessage /> */