import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import AboutImg from '../../../../../src/img/about.jpg';
import UpperImg from '../../../../../src/img/upper.jpg';
import './index.css';
const styles = {
	root: {
		marginTop: '40px',
		color: 'rgba(0, 0, 0, 0.6000000238418579)',
		fontFamily: 'Montserrat',
		fontSize: '16px'
	},
	card: {
		maxWidth: 345
	},
	media: {
		height: 150
	},
	displayInline: {
		display: 'inline'
	},
	tittle1: {
		color: '#4A90E2',
		borderLeft: 'solid'
	}
};

class About extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container className="aboutSection">
					<Grid item xs={5}>
						<div className="leftSection">
							<div className="imgWrapper">
								{
									<div className="innerImg">
										<img alt="inner" src={AboutImg} />
									</div>
								}
								{
									<div className="upperImg">
										<img alt="upper" src={UpperImg} />
									</div>
								}
							</div>
						</div>
					</Grid>
					<Grid item xs={7}>
						<div className="RightSection">
							<div className={classes.tittle1}>
								<div className="about">About</div>
								<div
									style={{
										fontSize: '34px',
										color: '#4A90E2',
										marginLeft: '10px'
									}}
								>
									National Urban Stack
								</div>
							</div>

							<div
								style={{
									padding: '8px',
									marginLeft: '-7px',
									fontSize: '20px',
									color: '#rgba(0, 0, 0, 0.8700000047683716)',
									fontStyle: 'italic',
									fontWeight: '400',
									width: '674px',
									alignItems: 'left'
								}}
							>
								This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
								Aenean sollicitudin
							</div>
							<div
								style={{
									padding: '8px',
									marginLeft: '-7px',

									fontSize: '16px',
									color: 'rgba(0, 0, 0, 0.6000000238418579)',
									fontFamily: 'Montserrat',
									fontWeight: '300',
									width: '610px'
								}}
							>
								This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
								Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis
								sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi
								accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.
							</div>

							<div>
								<div className={classes.root}>
									<List>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText
												style={{
													color: 'rgba(0, 0, 0, 0.6000000238418579)',
													fontFamily: 'Montserrat',
													fontSize: '16px'
												}}
												primary="Open, shared, extensible national digital infrastructure"
											/>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText primary="Acts as a Public Good with a federated architecture" />
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText primary="State Government(s) have strategic control" />
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText primary="Free of cost Technology Platform" />
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText primary="Provide locally relevant solutions for cities" />
										</ListItem>
									</List>
								</div>

								<List />
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}
export default withStyles(styles)(About);
