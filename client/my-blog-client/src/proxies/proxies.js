const axios = require('axios');

export const getPosts = () => {
    return axios.get('http://localhost:8080/blog')
    .then(res => res.data);
}

export const getPostById = (id) => {
    return axios.get(`http://localhost:8080/blog/${id}`)
    .then(res => res.data);
}