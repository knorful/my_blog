import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from './Posts';
import { Post } from './Post';
import { AddPostForm } from './AddPostForm';
import SearchAppBar from './SearchBar';
import { EditPostForm } from './EditPostForm';
import { Footer } from './Footer';


export const App = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    }

    return (
        <>
            <SearchAppBar handleSearchChange={handleSearchChange}  />
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/blog" />} />
                    <Route path="/blog" element={<Posts searchTerm={searchTerm} />} />
                    <Route path="/blog/:id" element={<Post />} />
                    <Route path="/blog/add" element={<AddPostForm />} />
                    <Route path="/blog/edit/:id" element={<EditPostForm />} />
                </Routes>
            </Container>
            <Footer />
        </>
    )
}