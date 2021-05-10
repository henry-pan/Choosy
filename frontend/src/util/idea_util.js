import axios from 'axios';

export const getIdeas = () => {
  return axios.get('/api/ideas')
};

export const getUserIdeas = userId => {
  return axios.get(`/api/ideas/user/${userId}`)
};

export const getRoomIdeas = roomId => {
  return axios.get(`/api/ideas/room/${roomId}`)
}

export const getIdea = id => {
  return axios.get(`/api/ideas/${id}`)
};

export const createIdea = data => {
  return axios.post('/api/ideas/', data)
}

export const updateIdea = data => {
  return axios.patch(`/api/ideas/${data._id}`, data)
}

export const deleteIdea = ideaId => {
  return axios.delete(`/api/ideas/${ideaId}`)
}