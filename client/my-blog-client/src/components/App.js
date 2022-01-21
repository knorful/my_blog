import React from 'react';
import { getPosts } from '../proxies/proxies';

export const App = () => {
    let posts = getPosts();
    return <h1>Hello</h1>
}