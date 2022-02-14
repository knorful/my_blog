import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF2130'
        }
    }
});

const PostCategories = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
                {props.postCats.map((pc, i) => {
                    if (props.idx === i) {
                        if (Array.isArray(pc[i])) {
                            return pc[i].map(pc => <Button>{pc}</Button>)
                        } else {
                            return <Button>{pc[i]}</Button>
                        }
                    }
                })}
            </ButtonGroup>
        </ThemeProvider>
    )
}

export default PostCategories;