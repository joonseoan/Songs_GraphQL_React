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

// Apollo Client Libary Setup
const client = new ApolloClient({});

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