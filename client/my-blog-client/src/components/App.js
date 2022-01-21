import React from 'react';
import { getPosts } from '../proxies/proxies';
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
            this.setState({posts})
        })
    }

    render() {
        return (
            <div>
                <SearchAppBar />
                {this.state.posts.map((p, i) => <p key={p + i}>{`${p.content}`}</p>)}
            </div>
        )
    }
}