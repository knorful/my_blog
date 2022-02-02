import Container from '@mui/material/Container';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from './Posts';
import { Post } from './Post';
import { AddPostForm } from './AddPostForm';
import SearchAppBar from './SearchBar';


export const App = () => {
    return (
        <>
            <SearchAppBar />
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/blog" />}  />
                    <Route path="/blog" element={<Posts />} />
                    <Route path="/blog/:id" element={<Post />} />
                    <Route path="/blog/add" element={<AddPostForm />} />
                </Routes>
            </Container>
        </>
    )
}