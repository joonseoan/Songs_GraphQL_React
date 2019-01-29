/* 
    Require a number of variables when it queries data to GraphQL
*/

import React,  { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSongDetails from '../queries/fetchSongDetails';
import { Link } from 'react-router';

import LyricCreate from './lyric_create';
import LyricList from './lyric_list';

class SongDetails extends Component {
    render() {

        // console.log(this.props);

        if(this.props.data.loading) return<div />;
        const { title, lyrics } = this.props.data.song;

        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{ title }</h3>
                <LyricList lyrics = { lyrics } />
                <LyricCreate songId = { this.props.params.id }/>
            </div>
        );
    }
}

/* 
    [query with variables]
    query searchSong ($id: ID!) {
        song(id: $id) {
            title
            id
        }
    } 

    variables
    {
        "id": "5c2cf74233b0c43054d7fb41"
    }

*/


// When the query requires a number of variables,
//  it must have the syntax to define varibles as below.

// in this case, we need to define a wild card.
export default graphql(fetchSongDetails, {
    options: (props) => { return {variables: { id: props.params.id }}}
})(SongDetails);