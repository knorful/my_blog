import React from 'react';

export const Posts = (props) => {
    return (
        <>
            {props.posts.map((p, i) => <p key={p + i}>{`${p.content}`}</p>)}
        </>
    )
}