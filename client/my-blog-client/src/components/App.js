import Container from '@mui/material/Container';
import React from 'react';
import { getPosts } from '../proxies/proxies';
import { Posts } from './Posts';
import SearchAppBar from './SearchBar';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        getPosts()
            .then(posts => {
                this.setState({ posts })
            })
    }

    render() {
        return (
            <>
                <SearchAppBar />
                <Container maxWidth="md">
                    <Posts posts={this.state.posts} />
                </Container>
            </>
        )
    }
}