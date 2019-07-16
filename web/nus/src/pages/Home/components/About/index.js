import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
// import AboutImg from '../../../../../src/img/about.jpg';
// import UpperImg from '../../../../../src/img/upper.jpg';
const styles = {
	root: {
		flexGrow: 1,
		color: 'rgba(0, 0, 0, 0.6000000238418579)',
		fontFamily: 'Montserrat',
		fontSize: '16px',
		margin:"24px"
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
			<div className={classes.root} id="aboutNusNewSection">
				<Grid
					style={{
						marginTop: '8px'
					}}
					container
					className="aboutSection"
				>
					<Grid item xs={12} sm={5}>
						<div className="leftSection">
							<img src="/assets/images/about.png" alt="about image"	width="100%"/>
						{/*	<div className="imgWrapper">
								{
									<div className="innerImg">
										<img src={AboutImg} alt="about image"/>
									</div>
								}
								{
									<div className="upperImg">
										<img src={UpperImg} alt="upper image"/>
									</div>
								}
							</div>*/}
						</div>
					</Grid>
					<Grid item xs={12} sm={7}>
						<div className="RightSection">
							<div className={classes.tittle1}>
								<div
									style={{

										paddingTop: '5px',

										marginLeft: '10px'
									}}
									className="sectionSubheader"
								>
									About
								</div>
								<div
									style={{
										marginLeft: '10px'
									}}
									className="sectionHeader"
								>
									National Urban Stack
								</div>
							</div>

							<div
								style={{
									padding: '8px',
									marginLeft: '-7px',

								}}
								className="sectionBoldPar"
							>
								The NUS vision is that municipalities/state governments can leverage the common national digital infrastructure to build locally relevant solutions.
							</div>
							<div
								style={{
									padding: '8px',
									marginLeft: '-7px',

								}}
								className="sectionPar"
							>
								NUS aims to work with the State Urban Development Departments on top-down, large-scale, systemic reform projects with the goal to rapidly configure and deploy State-wide governance platforms with high priority applications available.
							</div>

							<div>
								<div className={classes.root}>
									<List>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText
												classes={{root:"sectionPar"}}
												primary="Open-source technology platform built for scale"
											/>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText classes={{root:"sectionPar"}} primary="Public good with federated architecture" />
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<StarIcon className={classes.icon} style={{ color: '#4A90E2' }} />
											</ListItemIcon>
											<ListItemText classes={{root:"sectionPar"}} primary="Highly customizable for locally relevant solutions" />
										</ListItem>
										{/*<ListItem button>
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
										</ListItem>*/}
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
