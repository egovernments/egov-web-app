import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const styles = {
	card: {
		//maxWidth: 450
	},
	media: {
		height: 150
	},
	displayInline: {
		display: 'inline'
	},
	subtitle: {
		color: '#4A90E2',
		padding: '10px 5px 10px 10px',
		borderLeft: 'solid'
	}
};

const newsobj = [
	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery1.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},
	{
		title: 'Andhra Impact',
		photoUrl: require('../../../../../src/img/secondGallery.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'Read case study'
	},

	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery2.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},

	{
		title: 'NUS Punjab',
		photoUrl: require('../../../../../src/img/secondGallery2.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'Read case study'
	},
	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		photoUrl: require('../../../../../src/img/gallery3.jpg'),
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
	},
	{
		title: 'The Problem',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'Read case study',
		photoUrl: require('../../../../../src/img/secondGallery3.jpg')
	},
	{
		title: 'Enrolment Workshop in Himachal Pradesh',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		photoUrl: require('../../../../../src/img/gallery4.jpg')
	},
	{
		title: 'NUS - The Solution',
		desc:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		case: 'Read case study',
		photoUrl: require('../../../../../src/img/secondGallery4.jpg')
	}
];
class WhatNew extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Grid container>
					<Grid item xs={6}>
						<div
							className={classes.subtitle}
							style={{
								fontSize: '16px',
								color: '#000000 - 60%'
							}}
						>
							Whats New
						</div>
						<div
							className={classes.subtitle}
							style={{
								fontSize: '34px',
								color: '#4A90E2',
								marginTop: '-21px'
							}}
						>
							News & Gallery
						</div>
					</Grid>
					<Grid item xs={6}>
						<div
							className={classes.subtitle}
							style={{
								fontSize: '16px',
								color: '#000000 - 60%'
							}}
						>
							Refer
						</div>
						<div
							className={classes.subtitle}
							style={{
								fontSize: '34px',
								color: '#4A90E2',
								marginTop: '-21px'
							}}
						>
							Case Studies
						</div>
					</Grid>
				</Grid>
				<Grid container>
					{newsobj.map((item) => {
						let photo = item.photoUrl;
						return (
							<Grid item xs={6}>
								<Card className={classes.card} style={{ boxShadow: 'none' }}>
									<CardContent>
										<Grid container>
											<Grid item xs={3}>
												<img src={item.photoUrl} height="102px" width="150px" />
											</Grid>
											<Grid item xs={9}>
												<div className="Combine">
													<div
														style={{
															color: 'rgba(0, 0, 0, 0.87)',
															fontSize: '16px',
															fontWeight: '400',
															marginLeft: '3px',
															marginBottom: '5px'
														}}
													>
														{item.title}
													</div>

													<div
														style={{
															fontSize: '14px',
															color: 'rgba(0, 0, 0, 0.6)',
															fontWeight: '300',
															marginLeft: '3px'
														}}
													>
														{item.desc}
													</div>
													<div
														style={{
															color: '#4A90E2',
															fontSize: '14px',
															fontWeight: '500',
															marginLeft: '3px',
															marginTop: '32px'
														}}
													>
														{item.case}
													</div>
												</div>
											</Grid>
										</Grid>
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

export default withStyles(styles)(WhatNew);
