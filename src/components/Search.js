import React, {Component} from 'react';

import magnifier from '../assets/magnifier.svg';
import SearchItem from './SearchItem';

export default class App extends Component {
	
	constructor( props ){
		super(props);
		this.state           = {
			query                 : '',
			highlighted           : 0,
			highlightedByKeyboard : false,
			timer                 : null
		};
		this.scrollRef       = React.createRef();
		this.searchStatusRef = React.createRef();
	}
	
	render(){
		
		return (<div className="app-search" onKeyUp={this.handleKeyboard.bind(this)}>
			{this.renderError()}
			<div className="app-search-input-wrapper">
				<img className='app-search-icon' src={magnifier} alt='icon' />
				<input className='app-search-input' placeholder='Username' type='text' value={this.state.query} onChange={this.handleChange.bind(this)} />
				<div className="app-search-results-box">
					{this.renderSearchStatus()}
					{this.renderUsersBox()}
				</div>
			</div>
		</div>);
		
	}
	
	handleChange( e ){
		
		const query = e.target.value;
		this.setState({query : query});
		
		//Debounce
		clearTimeout(this.state.timer);
		if ( query ) {
			this.setState({
				timer : setTimeout(() =>{
					this.props.clearError();
					this.props.fetchUsersByQuery(query);
					//Reset highlighted one.
					this.highlight(0);
				}, 500)
			});
		} else {
			this.props.clearSearch();
		}
		
	}
	
	highlight( index, highlightedByKeyboard ){
		this.setState({
			highlighted           : index,
			highlightedByKeyboard : highlightedByKeyboard
		});
	}
	
	adjustScroll( nodeHeight, distanceToTop ){
		
		const viewNode   = this.scrollRef.current;
		const scrollTop  = viewNode.scrollTop;
		const viewHeight = viewNode.offsetHeight;
		
		const searchStatusNodeHeight = this.searchStatusRef.current.offsetHeight;
		
		if ( scrollTop > distanceToTop - searchStatusNodeHeight ) {
			//Is above.
			viewNode.scrollTop = distanceToTop - searchStatusNodeHeight;
		} else if ( scrollTop < distanceToTop + nodeHeight - viewHeight - searchStatusNodeHeight ) {
			//Is below.
			viewNode.scrollTop = distanceToTop + nodeHeight - viewHeight - searchStatusNodeHeight;
		}
		
	}
	
	renderUsersBox(){
		
		const {users}                              = this.props;
		const {highlightedByKeyboard, highlighted} = this.state;
		
		if ( users.length ) {
			return (<div className="app-search-results-box-users-wrapper" ref={this.scrollRef}>
				<div className="app-search-results-box-users">
					{users.map(( user, i ) =>
						<SearchItem key={user.id} user={user} highlightedByKeyboard={highlightedByKeyboard} highlighted={highlighted === i} onHover={this.highlight.bind(this, i, false)} adjustScroll={this.adjustScroll.bind(this)} />)}
				</div>
			</div>);
		}
		
	}
	
	handleKeyboard( e ){
		
		const {users}     = this.props;
		let {highlighted} = this.state;
		
		if ( e.keyCode === 38 && highlighted > 0 ) {
			//Arrow up.
			this.highlight(--highlighted, true);
		} else if ( e.keyCode === 40 && highlighted < users.length - 1 ) {
			//Arrow down.
			this.highlight(++highlighted, true);
		} else if ( e.keyCode === 13 ) {
			//Enter.
			window.open(users[ highlighted ].html_url, "_blank");
		}
		
	}
	
	renderSearchStatus(){
		
		let text;
		
		if ( this.props.loading ) {
			text = '🔥 Loading...';
		} else if ( this.state.query === '' ) {
			text = 'Try typing your username. 😉';
		} else {
			
			const usersNumber = this.props.users.length;
			text              = usersNumber > 0 ? `${usersNumber} user${usersNumber > 1 ? 's' : ''} found! 👇` : `No user found. 😕`;
			
		}
		
		return (<div className="app-search-results-box-info" ref={this.searchStatusRef}>{text}</div>);
		
	}
	
	renderError(){
		
		const {error} = this.props;
		
		if ( error ) {
			return (<div>
				<div className="app-search-error">{error}</div>
			</div>);
		}
		
	}
	
}
