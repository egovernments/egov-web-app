import React, { Component } from "react";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import { Screen } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import ServicesNearby from "./components/ServicesNearby";
import Notifications from "./components/Notifications";
import "./index.css";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";
const notifications = [
  {
    title: "Pay your Property Tax Dues before 31st March and get 10% rebate",
    buttons: [
      {
        label: "PAY NOW",
      },
    ],
    route: "property-tax",
    dueTime: "1 Day ago",
  },
  {
    title: "Trade License for Varna Textiles has been approved. Please pay your license fees and download your license certificate",
    buttons: [
      {
        label: "PAY NOW",
      },
    ],
    route: "tradelicense-citizen/home",
    dueTime: "1 Day ago",
  },
  {
    title: "Your complaint for Streetlight not working has been resolved. Please provide your valuable feedback.",
    buttons: [
      {
        label: "RATE",
      },
      {
        label: "RE-OPEN",
      },
    ],
    dueTime: "1 Day ago",
  },
];

const exresponse = {
  ResponseInfo: {
    apiId: "org.egov.pt",
    ver: "1.0",
    ts: 1502890899493,
    resMsgId: "uief87324",
    msgId: "654654",
    status: "successful",
  },
  events: [
    {
      tenantId: "pb.amritsar",
      eventType: "EVENTSONGROUND",
      description: "Good Morning people of this city!",
      status: "ACTIVE",
      source: "",
      actions: {
        actionUrls: [
          {
            actionUrl: "https://egov-micro-qa.egovernments.org",
            code: "DISPLAYCODE",
          },
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/pgr-home",
            code: "DISPLAYCODE",
          }
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
        documents: ["1fec8102-0e02-4d0a-b283-cd80d5dab067", "2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    },
    {
      tenantId: "pb.amritsar",
      eventType: "EVENTSONGROUND",
      description: "Good Morning people of this city!",
      status: "ACTIVE",
      source: "",
      actions: {
        actionUrls: [
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/property-tax/completed-assessments",
            code: "DISPLAYCODE",
          },
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/pgr-home",
            code: "DISPLAYCODE",
          }
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
        documents: ["1fec8102-0e02-4d0a-b283-cd80d5dab067", "2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    },
    {
      tenantId: "pb.amritsar",
      eventType: "EVENTSONGROUND",
      description: "Good Morning people of this city!",
      status: "ACTIVE",
      source: "",
      actions: {
        actionUrls: [
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/property-tax/completed-assessments",
            code: "DISPLAYCODE",
          },
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/pgr-home",
            code: "DISPLAYCODE",
          }
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
        documents: ["1fec8102-0e02-4d0a-b283-cd80d5dab067", "2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    },
    {
      tenantId: "pb.amritsar",
      eventType: "EVENTSONGROUND",
      description: "Good Morning people of this city!",
      status: "ACTIVE",
      source: "",
      actions: {
        actionUrls: [
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/property-tax/completed-assessments",
            code: "DISPLAYCODE",
          },
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/pgr-home",
            code: "DISPLAYCODE",
          }
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
        documents: ["1fec8102-0e02-4d0a-b283-cd80d5dab067", "2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    },
    {
      tenantId: "pb.amritsar",
      eventType: "EVENTSONGROUND",
      description: "Good Morning people of this city!",
      status: "ACTIVE",
      source: "",
      actions: {
        actionUrls: [
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/property-tax/completed-assessments",
            code: "DISPLAYCODE",
          },
          {
            actionUrl: "https://egov-micro-qa.egovernments.org/pgr-home",
            code: "DISPLAYCODE",
          }
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
        documents: ["1fec8102-0e02-4d0a-b283-cd80d5dab067", "2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    }
  ],
};

class CitizenDashboard extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <SearchService />
        <div className="citizen-dashboard-cont">
          <Label
            label="DASHBOARD_CITIZEN_SERVICES_LABEL"
            fontSize={16}
            fontWeight={900}
            color="rgba(0, 0, 0, 0.87"
            containerStyle={{ paddingTop: 16, paddingBottom: 8 }}
          />
          <ServiceList history={history} />
          <Label
            label="DASHBOARD_LOCAL_INFORMATION_LABEL"
            fontSize={16}
            fontWeight={900}
            color="rgba(0, 0, 0, 0.87"
            containerStyle={{ paddingTop: 16, paddingBottom: 8 }}
          />
          <ServicesNearby />
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16 }}>
            <Label label="DASHBOARD_WHATS_NEW_LABEL" fontSize={16} fontWeight={900} color="rgba(0, 0, 0, 0.8700000047683716)" />
            <Label label="DASHBOARD_VIEW_ALL_LABEL" color="#fe7a51" fontSize={14} />
          </div>
          <Notifications notifications={convertResponse(exresponse)} history={history} />
        </div>
      </div>
    );
  }
}

const getnotifications = async queryObject => {
  
    try {
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_search",
        ""
      );
      return response;
    } catch (e) {
      console.log(e.message);
    }
};

const convertResponse = (response) => {
  let eventarray = response.events.filter((item) => item.eventType === "EVENTSONGROUND");
  let arraylength = eventarray.length;
  if (arraylength > 0) {
    let firsthreevents = eventarray.slice(0,Math.min(3, arraylength));
    let data = firsthreevents.map((item) => ({
      title: item.description,
      buttons: item.actions.actionUrls?item.actions.actionUrls.map((actionUrls) => ({ label: getLocaleLabels(actionUrls.code,actionUrls.code), route: getEndpointfromUrl(actionUrls.actionUrl) })):[],
    }));

    return data;
  }
  return {};
};

const getEndpointfromUrl=(url)=>{
  debugger;
  let result=url.match(/:\/\/.*?\/(.*)/);
  if(result==undefined)
  {
      return "";
  }
  return result[1];
}
export default CitizenDashboard;
