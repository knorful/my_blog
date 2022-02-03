import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPostById } from '../proxies/proxies';
import { useParams } from 'react-router-dom';
import { createDate } from '../helpers/helpers'
import { DeletePostButton } from './DeletePostButton';
import { EditPostButton } from './EditPostButton';

export const Post = (props) => {
    const [post, setPost] = useState({});
    let params = useParams();

    useEffect(() => {
        fetchPost(params.id)
    }, [params.id]);

    const fetchPost = async (id) => {
        let foundPost = await getPostById(id)
            .then(res => res);
        console.log(foundPost);
        setPost(foundPost);
    }

    let date = createDate(post.datePosted)

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>
                <Box component="div" sx={{ marginTop: '125px', height: '400px', borderRadius: '5px', width: 400 }}>
                    {`${date.month}. ${date.date}. ${date.year.toString().split('').slice(2).join('')}`}
                    <Typography variant="h2" mb={2}>
                        {post.title}
                    </Typography>
                    <Typography mb={2} variant="h5" style={{ fontWeight: '300' }}>
                        {post.content}
                    </Typography>
                    <img src={post.imageLink} alt={post.title} />
                    <Typography mb={2} variant="caption" display="block">
                        Kristopher Norful, Software Engineering Apprentice
                    </Typography>
                    <div className='Post-buttons'>
                        <DeletePostButton postid={params.id} />
                        <EditPostButton
                            post={post}
                        />
                    </div>
                </Box>
                <hr id="Post-divider"></hr>
                <Box component="div" sx={{ marginTop: '150px', height: '400px', borderRadius: '5px', width: 400 }}>
                    <Typography variant="body1">
                        {post.mainContent}
                    </Typography>
                </Box>
            </div>
        </>
    )
}