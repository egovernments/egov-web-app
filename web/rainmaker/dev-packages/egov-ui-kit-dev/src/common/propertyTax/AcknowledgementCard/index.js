

import React from "react";

import { Card } from "components";
import './index.css'
const AcknowledgementCard = () => {
  return (
    <Card style={{ backgroundColor: 'white' }}
      textChildren={
        <div className="MuiCardContent-root-97">
          <div className="ack-header MuiGrid-container-98" id="material-ui-applicationSuccessContainer">
            <div className="ack-icon MuiAvatar-root-195 MuiAvatar-colorDefault-196" id="material-ui-avatar">
              <span className="material-icons MuiIcon-root-198" aria-hidden="true" id="custom-atoms-Icon" style={{fontSize: '50px'}}>
                <i id="custom-atoms-body" className="material-icons" style={{fontSize: '50px'}}>done</i>
              </span>
            </div>
            <div className="ack-body"  id="custom-atoms-body" >
              <h1 className="MuiTypography-root-8 MuiTypography-headline-13" id="material-ui-header">
                <span id="custom-containers-key">Application Submitted Successfully</span>
              </h1>
              <div className="ack-sub-body" id="custom-atoms-paragraph">
                <span >A notification regarding Application Submission has been sent to trade owner at registered Mobile No.</span>
              </div>
            </div>
            <div className="ack-text" id="custom-atoms-tail">
              <h1  className="MuiTypography-root-8 MuiTypography-headline-13" id="material-ui-text" style={{fontSize: '16px' ,fontWeight:"400" ,color: 'rgba(0, 0, 0, 0.6)'}}  ><span >Application No.</span>
              </h1>
              <h1 className="MuiTypography-root-8 MuiTypography-headline-13" id="material-ui-paragraph" style={{fontSize: '24px' ,fontWeight:"500"}} >
                <span >PB-TL-2019-09-09-002827</span>
              </h1>
            </div>
          </div>
        </div>


      } />
  )

};

export default AcknowledgementCard;


