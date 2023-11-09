import SET_HISTORY from '../actions/history'

const initialState = {
    history: null,
  };
  
export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
};
  