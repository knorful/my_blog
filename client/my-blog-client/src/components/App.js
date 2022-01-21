import React from 'react';
import { getPosts } from '../proxies/proxies';
import SearchAppBar from './SearchBar';
import {Posts} from './Posts';

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
            this.setState({posts})
        })
    }

    render() {
        return (
            <div>
                <SearchAppBar />
                <Posts posts={this.state.posts} />
            </div>
        )
    }
}