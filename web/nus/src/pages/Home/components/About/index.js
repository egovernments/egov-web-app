import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Star from '@material-ui/icons/Star';
import AboutImg from '../../../../../src/img/about.jpg';
import UpperImg from '../../../../../src/img/upper.jpg';
const styles = {
	card: {
		maxWidth: 345
	},
	media: {
		height: 150
	},
	displayInline: {
		display: 'inline'
	}
};

class About extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container className="aboutSection">
				<Grid item xs={6}>
					<div className="leftSection">
						<div className="imgWrapper">
							{
								<div className="innerImg">
									<img src={AboutImg} />
								</div>
							}
							{
								<div className="upperImg">
									<img src={UpperImg} />
								</div>
							}
						</div>
					</div>
				</Grid>
				<Grid item xs={6}>
					<div className="rightSection">
						<Card className={classes.card}>
							<CardContent>
								<Typography gutterBottom color="initial" variant="caption" align="left">
									About
								</Typography>
								<Typography
									className={classes.displayInline}
									gutterBottom
									component="h1"
									color="primary"
									variant="h5"
									align="left"
								>
									|National Urban Stack
								</Typography>
								<Typography
									gutterBottom
									variant="body1"
									color="initial"
									display="inline"
									component="h4"
									align="left"
								>
									This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor
									aliquet. Aenean sollicitudin
								</Typography>
								<Typography
									gutterBottom
									variant="caption"
									color="initial"
									//	display="inline"
									component="h4"
									align="left"
									component="p"
								>
									This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor
									aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum,
									nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit
									amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a
									ornare odio.
								</Typography>
								<List component="nav">
									<ListItem button>
										<ListItemIcon>
											<Star />
										</ListItemIcon>
										<ListItemText primary="Open, shared, extensible national digital infrastructure" />
									</ListItem>
									<ListItem button>
										<ListItemIcon>
											<Star />
										</ListItemIcon>
										<ListItemText primary="Acts as a Public Good with a federated architecture" />
									</ListItem>
									<ListItem button>
										<ListItemIcon>
											<Star />
										</ListItemIcon>
										<ListItemText primary="State Government(s) have strategic control" />
									</ListItem>
									<ListItem button>
										<ListItemIcon>
											<Star />
										</ListItemIcon>
										<ListItemText primary="Free of cost Technology Platform" />
									</ListItem>
									<ListItem button>
										<ListItemIcon>
											<Star />
										</ListItemIcon>
										<ListItemText primary="Provide locally relevant solutions for cities" />
									</ListItem>
								</List>

								<List component="nav" />
							</CardContent>
						</Card>
					</div>
				</Grid>
			</Grid>
		);
	}
}
export default withStyles(styles)(About);
