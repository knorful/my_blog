import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostsCSS from '../css/Posts.css';
import { getPosts } from '../proxies/proxies';
import { Link } from 'react-router-dom';
import { createDate } from '../helpers/helpers'
import { AddPostButton } from './AddPostButton';

export const Posts = (props) => {
    let filteredPosts;

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

    const handleLoading = () => {
        setIsLoading(true);
    }


    if (props.searchTerm) {
        filteredPosts = posts.filter((post) => {
            let postNameLowerCased = post.title.toLowerCase();
            let searchTermLowerCased = props.searchTerm.toLowerCase();

            return postNameLowerCased.includes(searchTermLowerCased)
        });

    }

    return (
        <>
            <Box style={PostsCSS} component="div" sx={{ marginTop: '50px', height: '400px', borderRadius: '5px' }}>
                {!filteredPosts ? (
                    <article className='post-wrapper'>
                        {isLoading ? <p>Loading...</p> :
                            posts.map((p, i) => {
                                const date = createDate(p.datePosted);
                                return (
                                    <div id="post-container" key={p.title}>
                                        <Link
                                            to={`/blog/${p.id}`}
                                            className='title-link'
                                        >
                                            <Typography style={{ marginTop: '25px', fontWeight: '200' }} variant='h5' key={p + i}>
                                                {p.title}
                                            </Typography>
                                        </Link>
                                        <div id="date-and-content">
                                            <Typography id="datePosted" variant='subtitle1' style={{ fontWeight: '400', fontSize: '.9rem' }}>
                                                {`${date.month + 1}. ${date.date}. ${date.year.toString().split('').slice(2).join('')}`}
                                            </Typography>
                                            <Typography style={{ margin: '25px', fontWeight: '200', width: '70%' }} variant='body2'>
                                                {p.content}
                                            </Typography>

                                        </div>
                                        <img src={p.imageLink} alt={p.title} />
                                    </div>
                                )
                            })}
                    </article>
                )
                    : (
                        <article className='post-wrapper'>
                            {isLoading ? <p>Loading...</p> :
                                filteredPosts.map((p, i) => {
                                    const date = createDate(p.datePosted);
                                    return (
                                        <div id="post-container" key={p.title}>
                                            <Link
                                                to={`/blog/${p.id}`}
                                                className='title-link'
                                            >
                                                <Typography style={{ marginTop: '25px', fontWeight: '200' }} variant='h5' key={p + i}>
                                                    {p.title}
                                                </Typography>
                                            </Link>
                                            <div id="date-and-content">
                                                <Typography id="datePosted" variant='subtitle1' style={{ fontWeight: '400', fontSize: '.9rem' }}>
                                                    {`${date.month + 1}. ${date.date}. ${date.year.toString().split('').slice(2).join('')}`}
                                                </Typography>
                                                <Typography style={{ margin: '25px', fontWeight: '200', width: '70%' }} variant='body2'>
                                                    {p.content}
                                                </Typography>

                                            </div>
                                            <img src={p.imageLink} alt={p.title} />
                                        </div>
                                    )
                                })}
                        </article>
                    )
                }
                <AddPostButton loading={handleLoading} />
            </Box>
        </>
    )
}