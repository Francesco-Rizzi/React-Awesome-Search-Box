import React from 'react';
import {shallow} from 'enzyme';

import Header from './components/Header';
import Search from './components/Search';
import SearchItem from './components/SearchItem';

const apiMock = {
	items : [ {
		"login"      : "as",
		"id"         : 8127015,
		"html_url"   : "https://github.com/as",
		"avatar_url" : "https://avatars2.githubusercontent.com/u/8127015?v=4",
	}, {
		"login"      : "astaxie",
		"id"         : 233907,
		"html_url"   : "https://github.com/astaxie",
		"avatar_url" : "https://avatars3.githubusercontent.com/u/233907?v=4",
	} ]
};

it('The Header has an h1 and an h2.', () =>{
	
	const component = shallow(<Header />);
	
	expect(component.find('h1')).toHaveLength(1);
	expect(component.find('h2')).toHaveLength(1);
	
});

it('The SearchItem has a URL, and Image and a Name referred to the user.', () =>{

	const user = apiMock['items'][0];
	
	const component = shallow(<SearchItem user={user} highlightedByKeyboard={false} highlighted={false} onHover={() => {}} adjustScroll={() => {}} />);
	
	expect(component.find('.app-search-item-image').prop('style')).toEqual({"backgroundImage" : "url('" + user.avatar_url + "')"});
	expect(component.find('.app-search-item-name').text()).toEqual(user.login);
	expect(component.prop('href')).toEqual(user.html_url);

});

it('The SearchItem displays if it is highlighted or not.', () =>{

	const user = apiMock['items'][0];
	
	const component = shallow(<SearchItem user={user} highlightedByKeyboard={false} highlighted={true} onHover={() => {}} adjustScroll={() => {}} />);
	expect(component.prop('className')).toContain('is-highlighted');
	
	component.setProps({highlighted : false});
	expect(component.prop('className')).not.toContain('is-highlighted');

});

it('The Search handles loading case.', () =>{

	const component = shallow(<Search loading={true} users={[]} />);
	expect(component.find('.app-search-results-box-info').text()).toContain('Loading');
	
});

it('The Search handles no-users-found case.', () =>{

	const component = shallow(<Search loading={false} users={[]} />);
	expect(component.find('.app-search-results-box-info').text()).toContain('Try typing your username');
	
});

it('The Search handles x-users-found case.', () =>{

	const component = shallow(<Search loading={false} users={apiMock.items} />);
	component.setState({query: 'as'});
	expect(component.find('.app-search-results-box-info').text()).toContain('2 users');
	
});

it('The Search shows the list of users found.', () =>{

	const component = shallow(<Search loading={false} users={apiMock.items} />);
	component.setState({query: 'as'});
	expect(component.find('.app-search-results-box-users-wrapper')).toHaveLength(1);
	expect(component.find(SearchItem)).toHaveLength(2);
	
	component.setProps({users : []});
	expect(component.find('.app-search-results-box-users-wrapper')).toHaveLength(0);
	expect(component.find(SearchItem)).toHaveLength(0);
	
});

it('The Search shows errors.', () =>{

	const component = shallow(<Search loading={false} users={apiMock.items} error="Error!" />);
	
	expect(component.find('.app-search-error')).toHaveLength(1);
	expect(component.find('.app-search-error').text()).toEqual('Error!');
	
});