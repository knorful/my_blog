import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Posts } from './Posts';
import { Post } from './Post';
import SearchAppBar from './SearchBar';

export const App = () => {
    return (
        <>
            <SearchAppBar />
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/blog" element={<Posts />} />
                    <Route path="/blog/:id" element={<Post />} />
                </Routes>
            </Container>
        </>
    )
}