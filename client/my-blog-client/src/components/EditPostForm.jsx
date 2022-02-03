import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { editPost, getPostById } from '../proxies/proxies';

const theme = createTheme({
    palette: {
        primary: {
            main: '#009900'
        }
    }
});

export const EditPostForm = (props) => {
    let navigate = useNavigate();
    let params = useParams();
    let paramsId = params.id

    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const [content, setContent] = useState("");
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const [imageURL, setImageURL] = useState("");
    const handleImageURLChange = (e) => {
        setImageURL(e.target.value);
    }

    const [mainContent, setMainContent] = useState("");
    const handleMainContentChange = (e) => {
        setMainContent(e.target.value);
    }

    useEffect(() => getPost(paramsId), [paramsId]);

    const handleSubmit = () => {
        let newPost = {
            title,
            content,
            imageLink: imageURL,
            mainContent,
            datePosted: new Date(),
            dateUpdated: new Date(),
        }
        setTimeout(() => navigate(`/blog/${paramsId}`), 800);
        editPost(paramsId, newPost);
        props.handleLoading();

    }

    const getPost = async (id) => {
        console.log(id);
        let post = await getPostById(id)
            .then(res => res);

        setTitle(post.title);
        setContent(post.content);
        setMainContent(post.mainContent);
        setImageURL(post.imageLink);
    }

    return (
        <Box
            className="add-form"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50%' },
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant='body1'>
                Edit Blog
            </Typography>
            <div className="form-fields">
                <TextField
                    label="Title"
                    id="outlined-size-small"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter Title"
                    size="small"
                />
            </div>
            <div className="form-fields">
                <TextField
                    value={content}
                    onChange={handleContentChange}
                    label="Content" id="outlined-size-normal"
                    placeholder='Content'
                />

            </div>
            <div className="form-fields">
                <TextField
                    label="Image URL"
                    id="outlined-size-normal"
                    placeholder='Image URL'
                    value={imageURL}
                    onChange={handleImageURLChange}
                />
            </div>
            <div className="form-fields">
                <TextField
                    label="Main"
                    id="standard-multiline-flexible"
                    multiline
                    placeholder="What's on your mind?"
                    value={mainContent}
                    onChange={handleMainContentChange}
                />
            </div>
            <ThemeProvider theme={theme} >
                <Button
                    style={{ marginTop: 20 }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Submit
                </Button>
            </ThemeProvider>
        </Box>
    )
}