import axios from 'axios';

export const createRoom = data => {
  return axios.post('/api/rooms/', data)
}

export const deleteRoom = ideaId => {
  return axios.delete(`/api/rooms/${ideaId}`)
}
