import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import CursorIcon from '../../../../../src/icon/Cursor';
import DocumentIcon from '../../../../icon/Document';
import ExpandIcon from '../../../../icon/Expand';
import NetworkIcon from '../../../../icon/Network';
import GPSIcon from '../../../../icon/Gps';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './index.css';

const styles = (theme) => ({
	root: {
		color: '#4A90E2',
		borderLeft: 'solid',
		marginLeft: '40px'
	},
	completed: {
		display: 'inline-block'
	},

	icon: {
		width: '53.11px',
		height: '69.66px',
		borderRadius: '50%',
		color: '#4A90E2'
	},
	titleONE: {
		color: '#4A90E2'
	},
	lineHorizontal: {
		orientation: 'horizontal'
	},
	button: {
		border: '1px solid #4a90e2',
		borderRadius: '34px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		cursor: 'pointer'
	},
	buttonOne: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		cursor: 'pointer'
	}
});

class How extends React.Component {
	newobj = () => {
		const { classes } = this.props;
		return [
			{
				header: 'Initiate',
				subheader: 'State-on-Boarding',
				icon: <CursorIcon className={classes.icon} />
			},
			{
				header: 'Define',
				subheader: 'Current System/Process Study',
				icon: <GPSIcon className={classes.icon} />
			},

			{
				header: 'Equip',
				subheader: 'Product fitment and Solution design',
				icon: <DocumentIcon className={classes.icon} />
			},

			{
				header: 'Adopt',
				subheader: 'Develop and Deploy',
				icon: <NetworkIcon className={classes.icon} />
			},

			{
				header: 'Leverages',
				subheader: 'Rollout and Adoption review',
				icon: <ExpandIcon className={classes.icon} />
			}
		];
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.root}>
					<div className={classes.tittleONE}>
						<div className="tittleOne">How</div>
						<div1 className="tittleTwo">Implementation Plan</div1>
					</div>
				</div>
				<Stepper alternativeLabel nonLinear>
					{this.newobj().map((label, index) => {
						const stepProps = {};

						return (
							<Step key={label} {...stepProps} completed>
								<StepConnector className={classes.lineHorizontal} />
								<div className="abc" />
								<div className="icon">{label.icon}</div>

								<div className="index">{index + 1}</div>

								<div className="header">{label.header}</div>
								<div className="subheader">{label.subheader}</div>
							</Step>
						);
					})}
				</Stepper>

				<div>
					<Grid container>
						<Grid item xs={12}>
							<div className={classes.buttonOne}>
								<Button variant="outlined" className={classes.button}>
									Read More
								</Button>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(How);
