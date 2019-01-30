import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/song_list';
import SongCreate from './components/song_create';
import SongDetails from './components/song_details';

// console.log('hashHistory', hashHistory, 'IndexRoute: ', IndexRoute)

// 1) Apollo Client Libary Setup
// In this case, Apollo has no way to aware of which properties/fields thye are fetching.
// Apollo notice a number of fields/properties they need to fetch but does not know what properties/fields they fetch.
// const client = new ApolloClient({});

// 2) Add an object, in order to inform Apollo which component of data Apollo need to fetch
// 	Then, it can fetch data more accurately and concisely

// Whenever fetch data, Apollo returns its id
const client = new ApolloClient({
	dataIdFromObject: o => o.id
});

const Root = () => {
  return (
  	<ApolloProvider client={client}>
  		{/* routing....v3 : Rourter, Route, IndexRoute, and hashHistory --> like history and location*/}
  		<Router history={hashHistory}> 
  			<Route path='/' component={App}>
  				<IndexRoute component={SongList}/>
					<Route path='songs/new' component={SongCreate} />
					{/* Please, remind that wild card */}
					<Route path='songs/:id' component={SongDetails} />
  			</Route>
  		</Router>	
  	</ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);