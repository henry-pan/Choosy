import { RECEIVE_IDEAS, RECEIVE_USER_IDEAS, RECEIVE_ROOM_IDEAS, RECEIVE_IDEA,
  REMOVE_IDEA, REMOVE_USER_IDEAS } from '../actions/idea_actions';
  
const IdeasReducer = (state = { all: {}, user: {}, new: undefined, room: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_IDEAS:
      newState.all = action.ideas.data;
      return newState;
    case RECEIVE_USER_IDEAS:
      action.ideas.data.forEach(idea => {
        newState.user[idea._id] = idea
      });
      return newState;
    case RECEIVE_ROOM_IDEAS:
      action.ideas.data.forEach(idea => {
        newState.room[idea._id] = idea
      });
      return newState;
    case RECEIVE_IDEA:
      newState.user[action.idea.data._id] = action.idea.data;
      newState.room[action.idea.data._id] = action.idea.data;
      return newState;
    case REMOVE_IDEA:
      // only deletes from the front end?/only changes state?
      delete newState.user[action.ideaId];
      delete newState.room[action.ideaId];
      return newState;
    case REMOVE_USER_IDEAS:
      // only deletes from the front end?/only changes state?
      newState.user = {};
      return newState;
    default:
      return state;
  }
};

export default IdeasReducer;
