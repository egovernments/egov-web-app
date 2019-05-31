import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes, menuItems } = this.props;
		const { value } = this.state;

		return (
			<Grid item xs={12}>
				<AppBar className={classes.root} position="static">
					<Tabs value={value} indicatorColor="primary" onChange={this.handleChange}>
						{menuItems.map((item) => {
							return <Tab label={item.label} />;
						})}
					</Tabs>
				</AppBar>
			</Grid>
		);
	}
}

Menu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
