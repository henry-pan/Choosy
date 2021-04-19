import axios from 'axios';

export const getIdeas = () => {
  return axios.get('/api/ideas')
};

export const getUserIdeas = roomId => {
  return axios.get(`/api/ideas/room/${roomId}`)
};

export const createIdea = data => {
  return axios.post('/api/ideas/', data)
}

export const deleteIdea = ideaId => {
  return axios.delete(`/api/ideas/${ideaId}`)
}