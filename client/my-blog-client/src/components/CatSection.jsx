import { useState, useEffect } from 'react';
import { getCategories } from '../proxies/proxies';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF2130'
        }
    }
});

const CatSection = (props) => {
    const [cats, setCats] = useState([])

    useEffect(() => {
        getCats();
    }, []);

    const getCats = async () => {
        let allCategories = await getCategories()
            .then(res => res);

        setCats(allCategories);
    }

    return (
        <div id='CatSection'>
            <Typography variant="overline" style={{textAlign: "center"}}>
                <p>All Categories</p>
            </Typography>
            {cats &&
                cats.map(cat => {
                    return (
                        <ThemeProvider theme={theme}>
                            <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" style={{margin: '5px'}} >
                                <Button style={{backgroundColor: 'white'}}>{cat.name}</Button>
                            </ButtonGroup>
                        </ThemeProvider>)
                })
            }
        </div >
    )
}

export default CatSection;