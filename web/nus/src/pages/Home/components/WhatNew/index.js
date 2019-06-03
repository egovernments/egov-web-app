import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './index.css';

const styles = {
	root: {
		marginTop: '40px',
		borderLeft: '3px solid #4A90E2',
		marginLeft: '17px'
	},
	card: {},
	media: {
		height: 150
	},
	displayInline: {
		display: 'inline'
	},
	subtitle: {}
};

const newsObjONE = [
	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery1.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},

	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery2.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},

	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery3.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},

	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		photoUrl: require('../../../../../src/img/gallery4.jpg')
	}
];

const newsObjTWO = [
	{
		title: 'Andhra Impact',
		photoUrl: require('../../../../../src/img/secondGallery.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'READ CASE STUDY'
	},
	{
		title: 'NUS Punjab',
		photoUrl: require('../../../../../src/img/secondGallery2.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'READ CASE STUDY'
	},
	{
		title: 'The Problem',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'READ CASE STUDY',
		photoUrl: require('../../../../../src/img/secondGallery3.jpg')
	},
	{
		title: 'NUS - The Solution',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'READ CASE STUDY',
		photoUrl: require('../../../../../src/img/secondGallery4.jpg')
	}
];

class WhatNew extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container>
				<Grid item xs={12} md={6}>
					<div className={classes.root}>
						<div className="what">Whats New</div>
						<div className="news">News & Gallery</div>
					</div>
					<Grid item xs={12}>
						<Card className={classes.card} style={{ boxShadow: 'none' }}>
							<CardContent>
								<Grid container>
									{newsObjONE.map((item) => {
										let photo = item.photoUrl;
										return (
											<Grid className="TwoItem" item>
												<Grid container>
													<Grid item xs={3}>
														<img src={item.photoUrl} height="102px" width="150px" />
													</Grid>
													<Grid item xs={9}>
														<div className="Combine">
															<div className="combineONE">{item.title}</div>

															<div className="combineTWO">{item.desc}</div>
														</div>
													</Grid>
												</Grid>
											</Grid>
										);
									})}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Grid item xs={12} md={6}>
					<div className={classes.root}>
						<div className="refer">Refer</div>
						<div className="studies">Case Studies</div>
					</div>
					<Grid item xs={12}>
						<Card className={classes.card} style={{ boxShadow: 'none' }}>
							<CardContent>
								<Grid container>
									{newsObjTWO.map((item) => {
										let photo = item.photoUrl;
										return (
											<Grid className="SecondTwoItem" item>
												<Grid container>
													<Grid item xs={3}>
														<img src={item.photoUrl} height="102px" width="150px" />
													</Grid>
													<Grid item xs={9}>
														<div className="Combine">
															<div className="combineONE">{item.title}</div>
															<div className="combineTWO">{item.desc}</div>
															<div className="read">{item.case}</div>
														</div>
													</Grid>
												</Grid>
											</Grid>
										);
									})}
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
export default withStyles(styles)(WhatNew);
