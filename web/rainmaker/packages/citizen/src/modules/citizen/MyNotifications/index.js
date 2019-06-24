import React from "react";
import { Notifications, Screen } from "modules/common";

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
          },
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
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
          },
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
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
          },
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
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
          },
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
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
          },
        ],
      },
      eventDetails: {
        fromDate: 1560860792000,
        toDate: 1560925645882,
        latitude: 18.2345,
        longitude: 20.2345,
      },
      recepient: {
        toRoles: ["CITIZEN|pb.amritsar"],
        toUsers: ["2dec8102-0e02-4d0a-b283-cd80d5dab089"],
      },
    },
  ],
};

const getEndpointfromUrl = (url) => {
  let result = url.match(/:\/\/.*?\/(.*)/);
  if (result == undefined) {
    return "";
  }
  return result[1];
};

const convertResponse = (response) => {
  let eventarray = response.events.filter((item) => item.eventType === "EVENTSONGROUND");
  let arraylength = eventarray.length;
  if (arraylength > 0) {
    let data = eventarray.map((item) => ({
      title: item.description,
      buttons: item.actions.actionUrls
        ? item.actions.actionUrls.map((actionUrls) => ({
            label: actionUrls.code,
            route: getEndpointfromUrl(actionUrls.actionUrl),
          }))
        : [],
    }));

    return data;
  }
  return {};
};

const Updates = ({ history }) => {
  return (
    <Screen>
      <Notifications notifications={convertResponse(exresponse)} history={history} />;
    </Screen>
  );
};

export default Updates;
