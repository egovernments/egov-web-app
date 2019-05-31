import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
		flexGrow: 1,
		backgroundColor: '#4A90E2',
		color: 'white'
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
			<div>
				<AppBar className={classes.root} position="static">
					<Tabs
						value={value}
						indicatorColor="primary"
						onChange={this.handleChange}
					>
						{menuItems.map((item) => {
							//console.log(item.label);

							return <Tab label={item.label} />;
						})}
					</Tabs>
				</AppBar>
			</div>
		);
	}
}

Menu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
