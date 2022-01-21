import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import PostsCSS from '../css/Posts.css';

export const Posts = (props) => {

    return (
        <Box component="div" sx={{ marginTop: '50px', height: '400px', borderRadius: '5px' }}>
            <article style={PostsCSS}>
                {props.posts.map((p, i) => {
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const d = new Date(p.datePosted);
                    const date = d.getDate();
                    const month = months[d.getMonth()];
                    const day = days[d.getDay()];
                    const year = d.getFullYear();

                    return (
                        <div id="post-container">
                            <img src={p.imageLink} />
                            <div id="post-content">
                                <Typography style={{ marginTop: '25px', textAlign: 'center' }} variant='h2' key={p + i}>
                                    {p.title}
                                </Typography>
                                <Typography style={{ margin: '25px' }} variant='body1' gutterBottom>
                                    {p.content}
                                </Typography>
                                <Typography id="datePosted" variant='body1'>
                                    {`${date} ${month} ${year}`}
                                </Typography>
                            </div>
                        </div>
                    )
                })}
            </article>
        </Box>
    )
}