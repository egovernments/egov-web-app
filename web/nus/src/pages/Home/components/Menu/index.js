import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Banner from '../Banner';
import About from '../About';
import Explore from '../Explore';
import How from '../How';
import Testimonials from '../Testimonials';
import WhatNew from '../WhatNew';
import Footer from '../Footer';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const styles = (theme) => ({
	root: {
		backgroundColor: '#4A90E2',
		color: 'FFFFFF'
	}
});

class Menu extends React.Component {
	state = {
		value: 0
	};

	ScrollableTabsButtonAuto() {
		const classes = withStyles();
		const [ value, setValue ] = React.useState(0);
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes, menuItems } = this.props;
		const { value } = this.state;

		return (
			<Grid item md={12} xs={12}>
				<AppBar className={classes.root} position="static">
					<Tabs
						value={value}
						indicatorColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						onChange={this.handleChange}
					>
						{menuItems.map((item) => {
							return <Tab label={item.label} />;
						})}
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer>{Banner}</TabContainer>}
				{value === 1 && <TabContainer>{About}</TabContainer>}
				{value === 2 && <TabContainer>{Explore}</TabContainer>}
				{value === 3 && <TabContainer>{How}</TabContainer>}
				{value === 4 && <TabContainer>{Testimonials}</TabContainer>}
				{value === 5 && <TabContainer>{WhatNew}</TabContainer>}
				{value === 6 && <TabContainer>{Footer}</TabContainer>}
			</Grid>
		);
	}
}

Menu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
