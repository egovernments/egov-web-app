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
		icon: 'check_circle'
	},
	{
		header: 'Define',
		subheader: 'Current System/Process Study',
		icon: 'cached'
	},

	{
		header: 'Equip',
		subheader: 'Product fitment and Solution design',
		icon: 'copyright'
	},

	{ header: 'Adopt', subheader: 'Develop and Deploy', icon: 'save', index: 4 },

	{
		header: 'Leverages',
		subheader: 'Rollout and Adoption review',
		icon: 'code'
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
					<div className={classes.root}>
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
												backgroundColor: 'red'
											}}
										/>
										<div
											style={{
												left: '5%',
												top: '20%',
												position: 'absolute'
											}}
										>
											<Icon className={classes.icon} color="primary">
												{label.icon}
											</Icon>
										</div>

										<div
											style={{
												top: '1px',
												left: '59.5px',
												height: '30px',
												width: '30px',
												borderRadius: '50%',
												position: 'absolute',
												left: '18px',
												backgroundColor: '#E0E0E0'
											}}
										>
											{index}
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
						{/* <div>
							{allStepsCompleted() ? (
								<div>
									<Typography className={classes.instructions}>
										All steps completed - you&apos;re finished
									</Typography>
								</div>
							) : (
								<div>
									<Typography className={classes.instructions}>
										{getStepContent(activeStep)}
									</Typography>
								</div>
							)}
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(How);
