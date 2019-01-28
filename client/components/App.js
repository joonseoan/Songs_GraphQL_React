import React from 'react';

// export default (props) => {
	
	// console.log('props: ', props)

export default ({children}) => {

	console.log('children: ', children)
	
	// "children" passed on props 
	/*
		
		***********************
		"children" is "SongList" of an IndexRoute 
		which is a compoennt in "Route path = '/' "

			<Router history={hashHistory}> 
	  			<Route path='/'component={App}>
	  				<IndexRoute component={SongList}/>
	  			</Route>
	  		</Router>

	*/

	return <div className="container">{children}</div>

}
