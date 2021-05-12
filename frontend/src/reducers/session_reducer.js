import { RECEIVE_CURRENT_USER, 
         RECEIVE_USER_LOGOUT, 
         RECEIVE_USER_SIGN_IN } from '../actions/session_actions';

import { RECEIVE_GUESTS, 
         RECEIVE_GUEST, 
         REMOVE_GUEST } from '../actions/guest_actions';


const initialState = {
  isAuthenticated: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true
      }
    case RECEIVE_GUEST:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case REMOVE_GUEST:
      return {
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
}

export default sessionReducer;
