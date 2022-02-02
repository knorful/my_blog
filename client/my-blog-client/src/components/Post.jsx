import React, { useState, useEffect } from 'react';
import { getPostById } from '../proxies/proxies';
import { useParams } from 'react-router-dom';

export const Post = (props) => {
    const [post, setPost] = useState({});
    let params = useParams();

    useEffect(() => {
        console.log("id " + params.id)
        fetchPost(params.id)
    }, []);

    const fetchPost = async (id) => {
        let foundPost = await getPostById(id)
            .then(res => res);
        console.log(foundPost);
        setPost(foundPost);
    }

    return (
        <div>
            {post.title}
        </div>
    )
}