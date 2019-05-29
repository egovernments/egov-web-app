import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import About from './components/About';
import How from './components/How';
import WhatNew from './components/WhatNew';
const menuItems = [
	{ label: 'HOME' },
	{ label: 'ABOUT NUS' },
	{ label: 'CORE COMPONENTS' },
	{ label: 'IMPLEMENATION  PLAN' },
	{ label: 'TESTIMONIALS' },
	{ label: 'NEWS & GALLERY' },
	{ label: 'CASE STUDIES' }
];

class Home extends React.Component {
	render() {
		return (
			<div>
				<Menu menuItems={menuItems} />
				<About />
				<How />
				<WhatNew />
			</div>
		);
	}
}

export default Home;
