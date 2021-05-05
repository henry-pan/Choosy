import {
  RECEIVE_ROOM,
  RECEIVE_ROOM_ERRORS
} from '../actions/room_actions';

const _nullErrors = [];

const RoomErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ROOM_ERRORS:
      return action.errors;
    case RECEIVE_ROOM:
      return _nullErrors;
    default:
      return state; 
  }
};

export default RoomErrorsReducer;