import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
//import Header from "../Header";
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import WhatshotIcon from '@material-ui/icons/Whatshot';
//import WhatshotIcon from "@material-ui/icons/Whatshot";

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		// padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	card: {
		backgroundcolor: '#FFFFFF',
		border: '0.5',
		borderRadius: '6px',
		minWidth: '280px',
		whiteSpace: 'normal',
		margin: '16px 0px',
		paddingLeft: '10px',
		paddingTop: '0px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 14,
		textAlign: 'center',
		paddingTop: '10px'
	},
	tittle1: {
		color: '#4A90E2',
		padding: '10px',
		borderLeft: 'solid'
	},

	icon: {
		borderRadius: '50%',
		color: 'white',
		display: 'inline-block',
		textTransform: 'none'
	}
});

class Explore extends React.Component {
	getItems = () => {
		const { classes } = this.props;
		return [
			{
				cardHeader: 'Building Plan Approval',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <BusinessIcon className={classes.icon} />
			},
			{
				cardHeader: 'Public Grievance',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <PersonIcon className={classes.icon} />
			},
			{
				cardHeader: 'Property Tax',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <HomeIcon className={classes.icon} />
			},
			{
				cardHeader: 'Water',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <PersonIcon className={classes.icon} />
			},
			{
				cardHeader: 'Sewerage',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <PersonIcon className={classes.icon} />
			},
			{
				cardHeader: 'Trade license',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <WorkIcon className={classes.icon} />
			},
			{
				cardHeader: 'Fire NOC',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <WhatshotIcon className={classes.icon} />
			},
			{
				cardHeader: 'Dashboards',
				option1: 'Apply Online',
				option2: 'Access Anywhere',
				option3: 'Ease of Payment',
				icon: <EqualizerIcon className={classes.icon} />
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
							color: 'black',
							fontFamily: 'Montserrat'
						}}
					>
						Explore
					</div>

					<div
						style={{
							fontSize: '34px',
							color: '#4A90E2',
							fontFamily: 'Montserrat'
						}}
					>
						Core Components
					</div>
				</div>

				<Grid container spacing={0} className={classes.card}>
					{this.getItems().map((item) => {
						return (
							<Grid item xs={3} className={classes.card}>
								<Card className={classes.card}>
									<CardContent>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center'
											}}
										>
											<div
												style={{
													borderRadius: '50%',
													backgroundColor: '#4A90E2',
													height: '80px',
													width: '80px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												{item.icon}
											</div>
										</div>

										<Typography
											className={classes.title}
											color="#000000"
											fontFamily="Montserrat"
											gutterBottom
										>
											{item.cardHeader}
										</Typography>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											{item.option1}
										</Typography>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											{item.option2}
										</Typography>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											{item.option3}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Explore);
