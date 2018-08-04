import React from 'react';
import {shallow} from 'enzyme';

import Header from './components/header';
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

it('the header has an h1 and an h2', () =>{
	
	const component = shallow(<Header />);
	
	expect(component.find('h1')).toHaveLength(1);
	expect(component.find('h2')).toHaveLength(1);
	
});
//
//it('the list handles empty case', () =>{
//
//	const component = shallow(<List onToggleBookmark={() =>{
//	}} heroes={{}} loading={false} />);
//
//	expect(component.find('.app-empty')).toHaveLength(1);
//	expect(component.find('.app-loader')).toHaveLength(0);
//	expect(component.find('.app-heroes-list')).toHaveLength(0);
//
//});
//
//
//it('the list handles loading case', () =>{
//
//	const component = shallow(<List onToggleBookmark={() =>{
//	}} heroes={heroMock} loading={true} />);
//
//	expect(component.find('.app-empty')).toHaveLength(0);
//	expect(component.find('.app-loader')).toHaveLength(1);
//	expect(component.find('.app-heroes-list')).toHaveLength(0);
//
//});
//
//it('the list renders the heroes', () =>{
//
//	const component = shallow(<List onToggleBookmark={() =>{
//	}} heroes={heroMock} loading={false} />);
//
//	expect(component.find('.app-empty')).toHaveLength(0);
//	expect(component.find('.app-loader')).toHaveLength(0);
//	expect(component.find('.app-heroes-list')).toHaveLength(1);
//	expect(component.find('.app-heroes-list').find(Card)).toHaveLength(1);
//
//});
//
//it('the card has an image, a name and a bookmarked state', () =>{
//
//	const hero      = heroMock[ 1009157 ];
//	const component = shallow(<Card hero={hero} onToggleBookmark={() =>{
//	}} />);
//
//	expect(component.find('.app-heroes-card-image').prop('style')).toEqual({"backgroundImage" : "url('" + hero.thumbnail.path + "." + hero.thumbnail.extension + "')"});
//	expect(component.find('.app-heroes-card-title').text()).toEqual(hero.name);
//	expect(component.find('.app-heroes-card-saved img').prop('src')).toEqual("/bookmarked.svg");
//
//});