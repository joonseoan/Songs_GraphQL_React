import gql from 'graphql-tag';

// must have "!" mark because it is required to find a song.
export default gql`

    query searchSong ($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    } 

`;

