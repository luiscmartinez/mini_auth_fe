import axios from 'axios'

//* Configures axios for our backend
export default axios.create({
  baseURL: 'http://localhost:8000/auth',
  withCredentials: true,
})
