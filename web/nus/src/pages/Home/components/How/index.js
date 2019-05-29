import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = (theme) => ({
	root: {
		width: '90%'
	},
	button: {
		//marginRight: theme.spacing(1)
	},
	backButton: {
		// marginRight: theme.spacing(1)
	},
	completed: {
		display: 'inline-block'
	},
	instructions: {
		// marginTop: theme.spacing(1),
		// marginBottom: theme.spacing(1)
	},
	icon: {
		height: '30px',
		width: '30px'
	}
});

const newobj = [
	{
		header: 'Initiate',
		subheader: 'State-on-Boarding',
		icon: <Icon color="primary">add_circle</Icon>
	},
	{
		header: 'Define',
		subheader: 'Current System/Process Study',
		icon: <Icon color="primary">add_circle</Icon>
	},

	{
		header: 'Equip',
		subheader: 'Product fitment and Solution design',
		icon: <Icon color="primary">add_circle</Icon>
	},

	{
		header: 'Adopt',
		subheader: 'Develop and Deploy',
		icon: <Icon color="primary">add_circle</Icon>
	},

	{
		header: 'Leverages',
		subheader: 'Rollout and Adoption review',
		icon: <Icon color="primary">add_circle</Icon>
	}
];

class How extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className="How">
				<Typography gutterBottom color="initial" variant="caption" align="left">
					How
				</Typography>
				<div className="Implementation Plan">
					<Typography gutterBottom component="h1" color="primary" variant="h5" align="left">
						Implementation Plan
					</Typography>
					<div
						style={{
							marginTop: '-38px',
							backgroundColor: 'green'
						}}
						className={classes.root}
					>
						<Stepper alternativeLabel nonLinear>
							{newobj.map((label, index) => {
								const stepProps = {};

								return (
									<Step key={label} {...stepProps} completed>
										<div
											style={{
												height: '100px',
												width: '100px',
												borderRadius: '50%',
												position: 'relative',
												backgroundColor: 'red',
												borderColor: 'black'
											}}
										/>
										<div
											style={{
												left: '5%',
												top: '20%',
												position: 'absolute'
											}}
										>
											{label.icon}
											{/* <Icon className={classes.icon} color="primary">
												
											</Icon> */}
										</div>

										<div
											style={{
												top: '3px',
												height: '30px',
												width: '30px',
												borderRadius: '50%',
												position: 'absolute',
												//left: '18px',
												backgroundColor: '#E0E0E0',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											{index + 1}
										</div>

										<div
											style={{
												color: '#000000 - 87%',
												fontSize: '20px',
												marginLeft: '30px'
											}}
										>
											{label.header}
										</div>
										<div
											style={{
												color: '#000000 - 87%',
												fontSize: '16px',
												fontWeight: '400',
												textAlign: 'center'
											}}
										>
											{label.subheader}
										</div>
									</Step>
								);
							})}
						</Stepper>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(How);
