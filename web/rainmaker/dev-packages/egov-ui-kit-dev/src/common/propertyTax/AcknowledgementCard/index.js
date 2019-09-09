

import React from "react";

import { Card } from "components";
import './index.css'
const AcknowledgementCard = () => {
  return (
    <Card style={{ backgroundColor: 'white' }}
      textChildren={
        <div >
          <div className="ack-header">
            <div className="ack-icon">
              <span aria-hidden="true" style={{fontSize: '50px'}}>
                <i className="material-icons" style={{fontSize: '50px'}}>done</i>
              </span>
            </div>
            <div className="ack-body">
              <h1 >
                <span >Application Submitted Successfully</span>
              </h1>
              <div className="ack-sub-body">
                <span >A notification regarding Application Submission has been sent to trade owner at registered Mobile No.</span>
              </div>
            </div>
            <div className="ack-text">
              <h1  style={{fontSize: '16px' ,fontWeight:"400" ,color: 'rgba(0, 0, 0, 0.6)'}}  ><span >Application No.</span>
              </h1>
              <h1 style={{fontSize: '24px' ,fontWeight:"500"}} >
                <span >PB-TL-2019-09-09-002827</span>
              </h1>
            </div>
          </div>
        </div>


      } />
  )

};

export default AcknowledgementCard;


