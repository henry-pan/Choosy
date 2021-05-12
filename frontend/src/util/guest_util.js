import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getGuests = () => {
  return axios.get('/api/guests')
};

export const getGuest = id => {
  return axios.get(`/api/guests/${id}`)
};

export const signup = userData => {
  return axios.post('/api/guests/register', userData)
}

export const deleteGuest = guestId => {
  return axios.delete(`/api/guests/${guestId}`)
}
