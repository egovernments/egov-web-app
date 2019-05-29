import React from 'react';
import digital from '../../../../utils/digital.png';
import smart from '../../../../utils/smart.png';
import indportal from '../../../../utils/india-portal.png';
import img3 from '../../../../utils/img3.png';
import RoomIcon from '@material-ui/icons/Room';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
// import CallIcon from "@material-ui/icons/Call";
class Footer extends React.Component {
	render() {
		return (
			<div style={{ backgroundColor: '#34495E' }}>
				<div
					style={{
						display: 'flex',
						maxWidth: '1200px',
						color: '#ffffff',
						padding: '30px'
					}}
				>
					<div style={{ width: '30%', paddingLeft: '20px' }}>
						<div
							style={{
								color: '#ffffff',
								fontWeight: '500',
								fontFamily: 'Montserrat-Medium'
							}}
						>
							QUICK LINKS
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							MyGov
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							{' '}
							E Office
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							{' '}
							Digital india
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							{' '}
							Right to Information Act
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							eGazette
						</div>
						<div
							style={{
								padding: '10px 0',
								fontSize: '14px',
								color: '#ffffff-70%'
							}}
						>
							URDPFI Guidelines
						</div>
					</div>
					<div style={{ width: '30%', paddingLeft: '30px' }}>
						<div
							style={{
								color: '#ffffff',
								fontWeight: '500',
								fontFamily: 'Montserrat-Medium'
							}}
						>
							GET IN TOUCH
						</div>
						<div style={{ padding: '10px 0', fontSize: '14px' }}>
							<RoomIcon style={{ paddingRight: '5px' }} />
							Ministry of Housing and Urban Affairs Maulana Azad Road, Nirman Bhawan, New Delhi-110011
						</div>
						<div style={{ padding: '10px 0', fontSize: '14px' }}>
							<CallIcon style={{ paddingRight: '5px' }} />
							011-23063266
						</div>
						<div style={{ padding: '10px 0', fontSize: '14px' }}>
							<MailIcon style={{ paddingRight: '5px' }} />
							contact@nus-nuia.org
						</div>
						<div style={{ padding: '10px 0' }}>
							<RoomIcon style={{ paddingRight: '5px' }} />
						</div>
						<div style={{ padding: '10px 0' }}>
							<RoomIcon style={{ paddingRight: '5px' }} />
						</div>
					</div>
					<div style={{ width: '30%', paddingLeft: '30px' }}>
						<div
							style={{
								display: 'flex',
								paddingTop: '30px',
								paddingBottom: '15px',
								justifyContent: 'flex-end'
							}}
						>
							<img style={{ width: '149px', height: '36px', marginRight: '20px' }} src={indportal} />
							<img style={{ width: '149px', height: '36px' }} src={img3} />
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end'
							}}
						>
							<img style={{ width: '246px', height: '118px', marginRight: '10px' }} src={digital} />
							<img style={{ width: '118px', height: '118px' }} src={smart} />
						</div>
					</div>

					<div />
					<div />
				</div>
				<div
					style={{
						backgroundColor: '#263748',
						padding: '10px',
						textAlign: 'center',
						color: '#ffffff'
					}}
				>
					Copyright © 2019 Ministry of Housing and Urban Affairs, Govt. of India. All rights reserved
				</div>
			</div>
		);
	}
}

export default Footer;
