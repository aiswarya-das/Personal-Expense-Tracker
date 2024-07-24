import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = 'http://localhost:5002';
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
