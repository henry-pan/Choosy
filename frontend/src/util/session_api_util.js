import axios from 'axios';

//session web token
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

//sign up route
export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

//sign in route
export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};

