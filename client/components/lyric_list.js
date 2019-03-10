import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class LyricList extends Component {


    onLike(id, likes) {
        //console.log(id);

        this.props.mutate({
            variables : {id},
            // The one down below, it must be same format as data from network console.
            optimisticResponse: {
                __typename: 'Mutation',
                
                // likeLyric: {id: "5c50abd715aba84a24c523c0", likes: 4, __typename: "LyricType"}
                // id: "5c50abd715aba84a24c523c0"
                // likes: 4
                // __typename: "LyricType"

                likeLyric: {
                    id,
                    // We must accurately guess what will happen
                    // when the user clicks the button
                    //  Therefore, the rendering will make out first,
                    //      and then the data will change afterward.
                    //  This is an optimistic response.
                    likes: likes + 1,
                    __typename: 'LyricType'

                }

            }
        });

    }

    renderLyrics() {

        // Everything is ok. However, the response speed is not quite instant.
        // It is slower because of short response period out of the mutation in Apollo.
        //  When the user clicks a button and something is required to happen immediately,
        //  the slow response is inappropriate.
        // In order to edit the slow response, we are reuired to take an advantage of optimisticResponse as show above.
        return this.props.lyrics.map(({ content, id, likes }) => {

            return (<li key={ id } className="collection-item">
                { content }
                <div className="vote-box">
                    <i 
                        className = "material-icons"
                        onClick={ () => { this.onLike(id, likes) } }> 
                        thumb_up
                    </i>
                    { likes }
                </div>
            </li>);

        });
    }

    render() {
        return(
            <ul className="collection" >
                { this.renderLyrics() }
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id: $id) {
            id
            likes
        }
    }

`;

export default graphql(mutation)(LyricList);