import { SET_POLLS, SET_CURRENT_POLL } from "../actionTypes";
import { addError, removeError } from "./error";
import api from '../../services/api'

export const setPolls = polls => ({
    type: SET_POLLS,
    polls
})

export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll
})

//create thunks/ action creators

export const getPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls')
            console.log(polls)
            dispatch(setPolls(polls))
            dispatch(removeError())
        } catch (error) {
            console.log(error.response.data.message)
            const { err } = error.response.data.message
            dispatch(addError(err))
        }
    }
}

export const getUserPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get', 'polls/user')
            dispatch(setPolls(polls))
        } catch (error) {
            console.log(error.response.data.message)
            const { err } = error.response.data.message
            dispatch(addError(err))
        }
    }
}

export const createPoll = data => {
    return async dispatch => {
        try {
            const poll = await api.call('post', 'polls', data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            console.log(error.response.data.message)
            const { err } = error.response.data.message
            dispatch(addError(err))
        }
    }
}

// path is nothing but the id

export const getCurrentPoll = path => {
    return async dispatch => {
        try {
            const poll = await api.call('get', `polls/${path}`)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            console.log(error.response.data.message)
            const { err } = error.response.data.message
            dispatch(addError(err))
        }
    }
}

export const vote = (path, data) => {
    return async dispatch => {
        try {
            const poll = await api.call('post', `polls/${path}`, data)
            dispatch(setCurrentPoll(poll))
            dispatch(removeError())
        } catch (error) {
            console.log(error.response.data.message)
            const { err } = error.response.data.message
            dispatch(addError(err))
        }
    }
}