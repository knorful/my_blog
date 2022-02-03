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

export const editPost = async (id, post) => {
    await axios.put(`http://localhost:8080/blog/${id}`, post)
}

export const getCategories = async () => {
    return await axios.get('http://localhost:8080/categories')
        .then(res => res.data);
}

export const addCategories = async (category) => {
    return await axios.post('http://localhost:8080/categories', {name: category})
}

export const addSelectedCategories = async (selected) => {

    console.log("selected => " + selected)
    let payload = {
        selected
    }

    let select = await axios.post('http://localhost:8080/categories/selected', payload);
    console.log(select)
}

export const deleteCategory = async (id) => {
    console.log("deleted id => " + id);
    let deletedCat = await axios.delete(`http://localhost:8080/categories/${id}`);
    console.log(deletedCat);
}