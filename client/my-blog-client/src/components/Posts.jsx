import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostsCSS from '../css/Posts.css';
import { getPosts } from '../proxies/proxies';
import { Link } from 'react-router-dom';

export const Posts = (props) => {
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        let newPosts = await getPosts()
            .then(posts => {
                return posts;
            })
        setPosts(newPosts);
        setIsLoading(false);
    }

    return (
        <Box style={PostsCSS} component="div" sx={{ marginTop: '50px', height: '400px', borderRadius: '5px' }}>
            <article className='post-wrapper'>
                {isLoading ? <p>Loading...</p> :
                    posts.map((p, i) => {
                        const d = new Date(p.datePosted);
                        const date = d.getDate();
                        const month = d.getMonth();
                        const year = d.getFullYear();

                        return (
                            <div id="post-container" key={p.title}>
                                <Link
                                    to={`/blog/${p.id}`}
                                    className='title-link'
                                >
                                    <Typography style={{ marginTop: '25px', fontWeight: '300'}} variant='h5' key={p + i}>
                                        {p.title}
                                    </Typography>
                                </Link>
                                <div id="date-and-content">
                                    <Typography style={{ margin: '25px', fontWeight: '200' }} variant='body2'>
                                        {p.content}
                                    </Typography>
                                    <Typography id="datePosted" variant='subtitle1' style={{fontWeight: '400', fontSize: '.9rem'}}>
                                        {`${month}.${date}.${year.toString().split('').slice(2).join('')}`}
                                    </Typography>

                                </div>
                                <img src={p.imageLink} alt={p.title} />
                            </div>
                        )
                    })}
            </article>
        </Box>
    )
}