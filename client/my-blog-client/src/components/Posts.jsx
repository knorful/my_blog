import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostsCSS from '../css/Posts.css';
import PostCategories from './PostCategories';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { getPosts } from '../proxies/proxies';
import { Link } from 'react-router-dom';
import { createDate } from '../helpers/helpers'
import { AddPostButton } from './AddPostButton';

export const Posts = (props) => {
    let filteredPosts;

    const [posts, setPosts] = useState();
    const [postCats, setPostCats] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        let postsDB = [];
        let catsDB = [];
        let newPosts = await getPosts()
            .then(posts => {
                let blogPosts = Object.keys(posts);
                let blogCats = Object.values(posts);

                blogPosts.map((bp, i) => {
                    let obj = {};
                    bp = bp.replace('{', '');
                    bp = bp.replace('}', '');

                    var arr = bp.split(',');

                    arr.forEach((item, i) => {
                        var s = item.split('=');
                        obj[s[0]] = s[1];

                    })

                    postsDB.push(JSON.parse(JSON.stringify(obj).replace(/" /g, '"')));
                });

                blogCats.map((bc, i) => {
                    let obj = {};
                    if (bc.length > 1) {
                        let catArr = bc.map(c => c.name)
                        obj[i] = catArr;
                    } else {
                        obj[i] = bc[0].name
                    }
                    catsDB.push(JSON.parse(JSON.stringify(obj)))
                })


                return posts;
            })

        setPosts(postsDB);
        setPostCats(catsDB);
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

    console.log(postCats);

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
                                        <PostCategories idx={i} postCats={postCats} />
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
                                            <PostCategories postCats={postCats} />
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