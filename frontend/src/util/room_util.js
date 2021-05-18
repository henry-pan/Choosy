import axios from 'axios';

export const createRoom = data => {
  return axios.post('/api/rooms/', data)
}

export const updateRoom = data => {
  return axios.patch(`/api/rooms/${data._id}`, data)
}

export const deleteRoom = roomId => {
  return axios.delete(`/api/rooms/${roomId}`)
}

export const getRoom = roomId => {
  return axios.get(`/api/rooms/${roomId}`)
}

export const getRoomByCode = code => {
  return axios.get(`/api/rooms/code/${code}`)
}

export const getUsers = roomId => {
  return axios.get(`/api/rooms/${roomId}/users`)
}

export const getIdeas = roomId => {
  return axios.get(`/api/rooms/${roomId}/ideas`)
}