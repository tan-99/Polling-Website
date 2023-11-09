import { SET_CURRENT_POLL, SET_POLLS } from '../actionTypes'

// default state - [], all the polls will be living in an array so it is going to be an empty array initially
export const polls = (state = [], action) => {
    switch(action.type){
        case SET_POLLS:
            return action.polls
        default:
            return state
    }
}

// default state - {}, a poll will be an object
export const currentPoll = (state = {}, action) => {
    switch(action.type){
        case SET_CURRENT_POLL:
            return action.poll
        default:
            return state
    }
}