const axios = require('axios');

export const getPosts = () => {
    return axios.get('http://localhost:8080/blog')
    .then(res => res.data);
}