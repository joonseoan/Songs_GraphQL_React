import React, { Component } from 'react';

// to define direct query of GraphQL
import gql from 'graphql-tag';

// to execute query
// With query definition above in front end, 
// 	 	backend (node) executes the query automatically.
// Keep in mind that the query execution is async.
// 		In order to get data, it will take some amount of time.
// Therefore, the react will render twice. 
// 		One : before when it starts to execute the query
//      The second : after it receives the data out of the query
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

class SongList extends Component {

	onSongDelete(id) {

		this.props.mutate({ 
			
			variables: { id }
			
		// It is a different way of  "refetchQueries: [{query}]"
		//		at the "song_create"
		// When the component has "query", that is, graphql(query)(Songlist)
		// 		and "this.props.data" is available,
		//		we can implement the "refetch()".		
		// Otherwise, we must use "refetchQueries: [{query}]"		
		}).then(() => this.props.data.refetch());
	}

	renderSongs() {

		const { songs } = this.props.data;
		
		return songs.map(song => {

			const { id, title } = song;

			// Just bear in mind that "() => this.onSongDelete(id)" is 
			// 	because it needs to get the "id" argument

			return <li 
				className = "collection-item"
				key = { id }>

					<Link to={`songs/${id}`}>
						{ title }
					</Link>

					<i className="material-icons" onClick={ () => this.onSongDelete(id) }>
						delete
					</i>
			
			</li>;

		});

	}

	render() {

		// In order to prevent render before the data are gained
		// at the first rendering 
		if(this.props.data.loading) return<div>Loading...</div>

		return<div>
			
			<ul className="collection">
				
				{ this.renderSongs() }
				
			</ul>
		
			<Link
				to="/songs/new"
				className="btn-floating btn-large red right"
			>
				<i className="material-icons">add</i>
			</Link>
		</div>;	
			

	}
}

// graphql query
/* 

	Apollo's query limitation
	When the query is initialized and the fetching is done,
	basically query does not fetch the data again.

	For instance, after the fetching is done at once,
	new data is not updated
	even though it is added to the database

*/

// dried up at the "queries" directory
// const query = gql`
// 	{
// 		songs {
// 			id
// 			title
// 		}
// 	}
// `;

// "ID" is another '_id''s scalar type of graphQL
//*************************************8888 ID
const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

// 1) query only
// Query bonindg: whenever new data is queried, 
//  react will render the component again.
// The data is overidden on props object
// export default graphql(query)(SongList);

// query + mutation
// This is a way to use query and mutation at the same file.
export default graphql(mutation)(
	graphql(query)(SongList)
);