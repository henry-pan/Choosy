import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

import {
  RECEIVE_GUEST_ERRORS,
  RECEIVE_GUEST,
} from '../actions/guest_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case RECEIVE_GUEST_ERRORS:
      return action.errors;
    case RECEIVE_GUEST:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
