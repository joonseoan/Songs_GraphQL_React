/* 
    Require a number of variables when it mutates data to GraphQL
*/


import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';


class LyricCreate extends Component {

    constructor(props) {

        super(props);

        this.state = { content: ''};

    }

    onSubmit(e) {
        e.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        // Reminding Promise
        // GraphQL returns the right id and lyrics as shown below.
        /* 
            addLyricToSong(content: $content, songId: $songId) {
                id
                lyrics {
                    content
                }
            }

            Therefore, we can use promise again to run another function here.
        */
        }).then(() => { this.setState({content: ''}); })

       // this.setState({content: ''}); 
    }

    render() {

        // console.log(this.state.content)

        console.log('params: ', this.props)

        return(
            <div>
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <label>Add a Lyric</label>
                    <input 
                        value = { this.state.content }
                        onChange = { (e) => { this.setState( {content: e.target.value});} }
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`

    mutation AddLyricToSong ($content: String!, $songId: ID!){
    
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                content
            }
        }
  
    }

`;

export default graphql(mutation)(LyricCreate);