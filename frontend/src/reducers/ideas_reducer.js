import { RECEIVE_IDEAS, RECEIVE_USER_IDEAS, RECEIVE_ROOM_IDEAS, RECEIVE_IDEA, REMOVE_IDEA } from '../actions/idea_actions';
  
const IdeasReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
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
      newState.user[action.idea.data._id] = action.idea.data
      return newState;
    case REMOVE_IDEA:
      delete newState.user[action.ideaId];
      return newState;
    default:
      return state;
  }
};

export default IdeasReducer;
