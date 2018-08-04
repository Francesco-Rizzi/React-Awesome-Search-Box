import React, {Component} from 'react';

export default class SearchItem extends Component {
	
	constructor( props ){
		super(props);
		this.elementRef = React.createRef();
	}
	
	render(){
		
		const {highlighted, user} = this.props;
		
		this.scrollToView();
		
		return (
			<a href={user.html_url} target='_blank' className={`app-search-item ${highlighted ? 'is-highlighted' : ''}`} onMouseOver={this.props.onHover} ref={this.elementRef}>
				<div className="app-search-item-image" style={{backgroundImage : `url('${user.avatar_url}')`}}></div>
				<div className="app-search-item-name">{user.login}</div>
			</a>);
	}
	
	scrollToView(){
		
		const {highlighted, highlightedByKeyboard, adjustScroll} = this.props;
		
		if ( highlighted && highlightedByKeyboard ) {
			
			const node = this.elementRef.current;
			
			const nodeHeight    = node.offsetHeight;
			const distanceToTop = node.offsetTop;
			
			adjustScroll(nodeHeight, distanceToTop);
			
		}
	}
	
}
