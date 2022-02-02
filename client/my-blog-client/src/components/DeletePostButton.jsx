import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deletePost } from '../proxies/proxies';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F900000'
        }
    }
});

export const DeletePostButton = (props) => {
    let navigate = useNavigate();

    const deletePostById = async (id) => {
        console.log("id => ", id)
        let deletedPost = await deletePost(id)
            .then(res => res);
        setTimeout(() => navigate("/blog"), 800);
    }

    return (
        <ThemeProvider theme={theme} >
            <div style={{ width: '100%', textAlign: 'center' }}>
                    <Button
                        id="delete-button"
                        style={{ marginBottom: '50px', color: 'red' }}
                        color="primary"
                        variant="outlined"
                        onClick={() => deletePostById(props.postid)}
                    >
                        Delete Post
                    </Button>
            </div>
        </ThemeProvider>
    )
}