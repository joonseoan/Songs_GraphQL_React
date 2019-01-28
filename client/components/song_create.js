import React, { Component } from 'react';

// In order to get a value from component to mutation variable down below
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {

	constructor(props) {
		super(props);

		this.state = { title: ''}
	}

	onSubmit (e) {
		e.preventDefault();

		//console.log(this.state.title)

		// run "mutations" down below.
		// mutate is a property of this.props.
		// Because we import "mutation" of "gql" down below.
		this.props.mutate({
			variables : {
				title: this.state.title // it goes to '$title' down below
			},

			/* 

				Apollo's query limitation
				When the query is initialized and the fetching is done,
				basically query does not fetch the data again.

				For instance, after the fetching is done at once,
				new data is not updated
				even though it is added to the database

				In order to get the new data in the query,
				we must use 'refetchQueries'.

			*/
			// when we need to put arguments for querying the data
			// refetchQueries: [{query, variables}] 
			
			refetchQueries: [{query}]

		// hashHistory.push('route') => back to a partuclar route
		}).then(() => hashHistory.push('/'))
	}
	
	render() {

		console.log('this.props at song_create: ', this.props);

		return <div>

			<Link to="/">Back</Link>
			<h3>Create a New Song</h3>
			<form onSubmit={this.onSubmit.bind(this)}>
				<label>Song Title</label>
				<input 
					type='text' 
					onChange = { e => {this.setState({title: e.target.value})}}
					value = {this.state.title}
				/>				
			</form>

		</div>;
	}
}

// mutation location by convention

/*

[In graphiQL]

mutation AddSong ($title: String) {
  addSong(title: $title) {
    id
    title
  }
}

In Query Variable space
// No $ sign in "title"
{
  
  	"title": "Sprite vs Coke"
  
}

*/

const mutation = gql`
	mutation AddSong ($title: String) {
  		addSong(title: $title) {
    	title
  	}
}
`;

// export default SongCreate;
export default graphql(mutation)(SongCreate);