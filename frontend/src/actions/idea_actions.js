import { getIdeas, getIdea, getUserIdeas, createIdea, deleteIdea } from '../util/idea_util';

export const RECEIVE_IDEAS = "RECEIVE_IDEAS";
export const RECEIVE_USER_IDEAS = "RECEIVE_USER_IDEAS";
export const RECEIVE_IDEA = "RECEIVE_IDEA";
export const REMOVE_IDEA = "REMOVE_IDEA";


export const receiveIdeas = ideas => ({
  type: RECEIVE_IDEAS,
  ideas
});

export const receiveUserIdeas = ideas => ({
  type: RECEIVE_USER_IDEAS,
  ideas
});

export const receiveIdea = idea => ({
  type: RECEIVE_IDEA,
  idea
})

export const removeIdea = ideaId => ({
  type: REMOVE_IDEA,
  ideaId
})

export const fetchIdeas = () => dispatch => (
  getIdeas()
    .then(ideas => dispatch(receiveIdeas(ideas)))
    .catch(err => console.log(err))
);

export const fetchIdea = id => dispatch => (
  getIdea(id)
    .then(idea => dispatch(receiveIdea(idea)))
    .catch(err => console.log(err))
);

export const fetchUserIdeas = userId => dispatch => (
  getUserIdeas(userId)
    .then(ideas => dispatch(receiveUserIdeas(ideas)))
    .catch(err => console.log(err))
);

export const addIdea = data => dispatch => (
  createIdea(data)
    .then(idea => dispatch(receiveIdea(idea)))
    .catch(err => console.log(err))
);

export const destroyIdea = ideaId => dispatch => (
  deleteIdea(ideaId)
    .then(() => dispatch(removeIdea(ideaId)))
    .catch(err => console.log(err))
);