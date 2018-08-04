import React, {Component} from 'react';

export default class Header extends Component {
	
	render(){
		return (<header className="app-header">
			<h1><span role='img' aria-label="emojis">⚛</span> React Awesome Search Box <span role='img' aria-label="emojis">🔍</span></h1>
			<h2 className='app-subtitle'>A React based, interactive, keyboard accessible and well-designed search box.</h2>
		</header>);
	}
	
}
