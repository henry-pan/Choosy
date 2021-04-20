import { RECEIVE_IDEAS, RECEIVE_USER_IDEAS, RECEIVE_IDEA, REMOVE_IDEA } from '../actions/idea_actions';
  
const IdeasReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_IDEAS:
      newState.all = action.ideas.data;
      return newState;
    case RECEIVE_USER_IDEAS:
      newState.user = action.ideas.data;
      return newState;
    case RECEIVE_IDEA:
      newState.new = action.idea.data
      return newState;
    case REMOVE_IDEA:
      delete newState[action.ideaId];
      return newState;
    default:
      return state;
  }
};

export default IdeasReducer;
