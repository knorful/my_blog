import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { editPost } from '../proxies/proxies';
import { Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1261A0'
        }
    }
});

export const EditPostButton = (props) => {
    let navigate = useNavigate();

    const editPostById = async (id) => {
        console.log("id => ", id)
        let editedPost = await editPost(id, props.post)
            .then(res => res);
        console.log(editedPost)
        setTimeout(() => navigate(`/blog/edit/${id}`), 800);

    }

    return (
        <ThemeProvider theme={theme} >
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Button
                    id="edit-button"
                    style={{ marginBottom: '50px', color: '#1261A0' }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                        editPostById(props.post.id);
                    }}
                >
                    Edit Post
                </Button>
            </div>
        </ThemeProvider>
    )
}