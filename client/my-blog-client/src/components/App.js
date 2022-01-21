import React from 'react';
import { getPosts } from '../proxies/proxies';

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
                {this.state.posts.map(p => <p>{`${p.content}`}</p>)}
            </div>
        )
    }
}