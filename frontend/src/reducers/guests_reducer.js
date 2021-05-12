import { RECEIVE_GUESTS } from '../actions/guest_actions';

const GuestsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GUESTS:
      newState.all = action.guests.data;
      return newState;
    default:
      return state;
  }
};

export default GuestsReducer;