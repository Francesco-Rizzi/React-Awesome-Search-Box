import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from './components/Header';
import Search from './components/Search';

import * as actions from './actions/actions';

import './styles/app.css';

class App extends Component {
	
	//This way a can keep the search a DUMB component without the need to connect it to the store.
	
	render(){
		return (<div className="app">
			<Header />
			<Search {...this.props} />
		</div>);
	}
	
}

export default connect(( {loading, users, error} ) =>{
	return {
		loading,
		users,
		error
	};
}, actions)(App);
