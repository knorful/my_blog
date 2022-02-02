const axios = require('axios');

export const getPosts = () => {
    return axios.get('http://localhost:8080/blog')
        .then(res => res.data);
}

export const getPostById = (id) => {
    return axios.get(`http://localhost:8080/blog/${id}`)
        .then(res => res.data);
}

export const addPost = (post) => {
    console.log("this is the post => " + post.name);
    return axios.post('http://localhost:8080/blog', post)
        .then(res => console.log(res))
}

export const deletePost = async (id) => {
    await axios.delete(`http://localhost:8080/blog/${id}`);
}