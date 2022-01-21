const axios = require('axios');

export const getPosts = () => {
    let posts = axios.get('http://localhost:8080/blog')
        .then(res => res.data);
    console.log("posts => ", posts);
    return posts;
}