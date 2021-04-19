import { RECEIVE_IDEAS, RECEIVE_USER_IDEAS, RECEIVE_IDEA, REMOVE_IDEA } from '../actions/room_actions';
  
  const RoomsReducer = (state = { user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_IDEA:
        newState.new = action.room.data
        return newState;
      case REMOVE_IDEA:
        newState.new = undefined
        return newState;
      default:
        return state;
    }
  };
  
  export default RoomsReducer;
  