import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#505050'
        }
    }
});

export const AddPostButton = () => {
    return (
        <ThemeProvider theme={theme} >
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Link to="/blog/add" id="add-button">
                    <Button style={{marginBottom: '50px'}} color="primary" variant="outlined">Add Post</Button>
                </Link>
            </div>
        </ThemeProvider>
    )
}