import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import hg from '../../../../utils/hg.png';
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
		flexDirection: 'row'
		// justifyContent: "right",
		// alignItems: "right"
	},
	avatar: {
		margin: 10
	},
	title: {
		fontSize: '14px',
		textAlign: 'right',
		paddingTop: '10px',
		display: 'flex',
		textAlign: 'right',
		flexDirection: 'row'
	},
	title0: {
		fontSize: '14px',
		textAlign: 'left',
		display: 'flex'
	},
	title01: {
		fontSize: '14px',
		textAlign: 'left',
		display: 'flex',
		paddingTop: '10px'
	},
	tittle1: {
		color: '#4A90E2',
		padding: '10px 5px 10px 5px',
		borderLeft: 'solid'
	}
});
class Testimonials extends React.Component {
	getItems = () => {
		const { classes } = this.props;
		return [
			{
				imgUrl: '',
				cardHeader: 'Shri. Shiv Das Meena',
				option1: 'Additional Secretary , Ministry of Housing and Urban Affairs',
				option2:
					"“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” "
			},
			{
				cardHeader: 'Shri. Jagan Shah',
				option1: 'Director, National Institute of Urban Affairs',
				option2:
					"“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” "
			},
			{
				cardHeader: 'Shri. Manish Thakur',
				option1: 'Joint Secretary, Ministry of Housing and Urban Affairs',
				option2:
					"“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” "
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
					/>
					Testimonials
					<div
						style={{
							fontSize: '34px',
							color: '#4A90E2',
							fontFamily: 'Montserrat'
						}}
					>
						Messages from the Leadership
					</div>
				</div>

				<Grid container spacing={0} className={classes.card}>
					{this.getItems().map((item) => {
						return (
							<Grid item xs={4} className={classes.card} justify="left">
								<Card className={classes.card}>
									<CardContent className={classes.avatar} justify="right">
										<div
											style={{
												display: 'flex',
												justifyContent: 'left',
												alignItems: 'left'
											}}
										>
											<div
												style={{
													//borderRadius: "50%",
													//backgroundColor: "#4A90E2",
													height: '100px',
													width: '100px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<div />

												{item.Avatar}
											</div>
											<div>
												<Typography
													className={classes.title}
													color="#000000"
													fontFamily="Montserrat"
													gutterBottom
													flexDirection="row"
												>
													{item.cardHeader}
												</Typography>
												<Typography
													className={classes.title0}
													color="textSecondary"
													gutterBottom
												>
													{item.option1}
												</Typography>
											</div>
										</div>

										<Typography className={classes.title01} color="textSecondary" gutterBottom>
											{item.option2}
										</Typography>
										{/* <Typography
                      className={classes.title2}
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.option3}
                    </Typography> */}
									</CardContent>
								</Card>
							</Grid>
						);
					})}{' '}
					;
				</Grid>
			</div>
		);
	}
}
export default withStyles(styles)(Testimonials);
