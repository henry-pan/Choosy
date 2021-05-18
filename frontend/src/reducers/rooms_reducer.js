import { 
  RECEIVE_ROOM, 
  REMOVE_ROOM 
} from '../actions/room_actions';
  
  const RoomsReducer = (state = { id: undefined, users: {}, ideas: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
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
  