import React , { Component } from "react";
import {Screen} from "modules/common"
import SingleEvent from  "../index" 
import {DescriptionCard} from  "../index" 
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { renderComponent } from "recompose";
import get from "lodash/get";
import set from "lodash/set";
import { localStorageGet, getAccessToken } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import {getTransformedNotifications} from "egov-ui-kit/utils/commons"
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

class EventDetails extends Component {
    constructor(props) 
    { 
        super(props); 
        this.state = { 
          response : "" 
        }; 
    } 

    

   componentDidMount = async() =>{
    const uuid = getQueryArg(window.location.href, "uuid");
    const tenantId = getQueryArg(window.location.href, "tenantId");
     
        //messageResponse && dispatch(prepareFinalObject("events[0]", messageResponse[0]));
     
  
      const queryObject = [
        {
          key: "tenantId",
          value: tenantId,
        },
        {
          key: "ids",
          value: uuid,
        },
      ];

    const requestBody = {
        apiId: "org.egov.pt",
        ver: "1.0",
        ts: 1502890899493,
        action: "asd",
        did: "4354648646",
        key: "xyz",
        msgId: "654654",
        requesterId: "61",
        authToken: getAccessToken(),
      };
    
      try {
        const response = await httpRequest("post", "/egov-user-event/v1/events/_search", "_search", queryObject , requestBody);
        
        if (response) {
            
            this.setState({
                response:response.events
              });

        }
      } catch (e) {
        console.log(e.message);
      }

     


    }
    render(){
          
          const { response} = this.state;
        return (
          <div>
            <Screen>
               { response && response.length>0 && <SingleEvent notifications={getTransformedNotifications(response)} flag={1} />}
          
             { response && response.length>0 && <DescriptionCard notifications={getTransformedNotifications(response)} />}
          </Screen>
          </div> 
        )
         
    }
    
}

export default EventDetails