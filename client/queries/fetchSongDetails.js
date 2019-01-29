import gql from 'graphql-tag';

// must have "!" mark because it is required to find a song.
export default gql`

    query searchSong ($id: ID!) {
        song(id: $id) {
            title
            id
            lyrics {
                id
                content
            }
        }
    } 

`;

