import axios from 'axios';


export const getGuests = () => {
  return axios.get('/api/guests')
};

export const getGuest = id => {
  return axios.get(`/api/guests/${id}`)
};

export const createGuest = data => {
  return axios.post('/api/guests/', data)
}

export const deleteGuest = guestId => {
  return axios.delete(`/api/guests/${guestId}`)
}
