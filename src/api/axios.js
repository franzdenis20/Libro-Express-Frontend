import axios from 'axios';

const instance =  axios.create({
    withCredentials: true,
    // baseURL: "http://localhost:4000/api"
    baseURL: 'https://libro-express-backend.onrender.com'
    
})
export default instance;