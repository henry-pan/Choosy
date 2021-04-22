import { RECEIVE_GUESTS, RECEIVE_GUEST, REMOVE_GUEST } from '../actions/guest_actions';

const GuestsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GUESTS:
      newState.all = action.guests.data;
      return newState;
    case RECEIVE_GUEST:
      newState.new = action.guest.data
      return newState;
    case REMOVE_GUEST:
      delete newState[action.guestId];
      return newState;
    default:
      return state;
  }
};

export default GuestsReducer;