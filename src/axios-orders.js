import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-7a407.firebaseio.com/'
});

export default instance;
