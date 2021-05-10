import { RECEIVE_IDEAS, RECEIVE_ROOM, RECEIVE_USERS, REMOVE_ROOM } from '../actions/room_actions';
  
  const RoomsReducer = (state = { id: undefined, users: {}, ideas: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_IDEAS:
        newState.ideas.all = action.ideas.data;
        return newState;
      case RECEIVE_USERS:
        newState.users.all = action.users.data;
        return newState;
      case RECEIVE_ROOM:
        newState.id = action.roomId;
        return newState;
      case REMOVE_ROOM:
        newState = undefined;
        return newState;
      default:
        return state;
    }
  };
  
  export default RoomsReducer;
  