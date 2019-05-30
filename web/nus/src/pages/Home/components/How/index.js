import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import CursorIcon from '../../../../../src/icon/Cursor';
import DocumentIcon from '../../../../icon/Document';
import ExpandIcon from '../../../../icon/Expand';
import NetworkIcon from '../../../../icon/Network';
import GPSIcon from '../../../../icon/Gps';

const styles = (theme) => ({
	root: {
		flexGrow: '1'
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
	tittle1: {
		color: '#4A90E2',
		padding: '10px',
		borderLeft: 'solid'
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
			<div className={classes.root}>
				<div className={classes.tittle1}>
					<div
						style={{
							fontSize: '16px',
							color: 'rgba(0, 0, 0, 0.6000000238418579)'
						}}
					>
						How
					</div>
					<div
						style={{
							fontSize: '34px',
							color: '#4A90E2'
						}}
					>
						Implementation Plan
					</div>
				</div>

				<div className={classes.root}>
					<Stepper alternativeLabel nonLinear>
						{this.newobj().map((label, index) => {
							const stepProps = {};

							return (
								<Step key={label} {...stepProps} completed>
									<div
										style={{
											height: '100px',
											width: '100px',
											borderRadius: '50%',
											position: 'relative',
											backgroundColor: '#F0F0F0',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									/>
									<div
										style={{
											top: '18px',
											left: '28px',
											borderRadius: '50%',
											position: 'absolute',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										{label.icon}
									</div>

									<div
										style={{
											top: '3px',
											height: '30px',
											width: '30px',
											borderRadius: '50%',
											position: 'absolute',
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
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '20px',
											marginLeft: '-111px'
										}}
									>
										{label.header}
									</div>
									<div
										style={{
											color: '#000000 - 87%',
											fontSize: '16px',
											fontWeight: '400',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											marginLeft: '-105px'
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
		);
	}
}

export default withStyles(styles)(How);
