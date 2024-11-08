import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/mavericks',  // Base de la app
  
  //Esto es para el token
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    //Authorization: `Bearer ${localStorage.getItem('access_token')}`,  //Cuando tengamos lo del token
  },
});

export default instance;
