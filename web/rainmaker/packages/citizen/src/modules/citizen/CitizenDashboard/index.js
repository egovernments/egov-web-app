import React, { Component } from "react";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import { getNotificationCount, getNotifications } from "egov-ui-kit/redux/app/actions";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import ServicesNearby from "./components/ServicesNearby";
import { Notifications } from "modules/common";
import "./index.css";
import get from "lodash/get";
import { getTransformedNotifications } from "egov-ui-kit/utils/commons";
import { getAccessToken, getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

class CitizenDashboard extends Component {
  state = {
    notifications: [],
    onGroundEvents: [],
  };

  getEventResponse = () => {
    const { notifications } = this.props;
    let displayEvents = notifications && getTransformedNotifications(notifications).slice(0, Math.min(3, notifications.length));
    this.setState({
      notifications: displayEvents,
    });
  };

  componentDidMount = () => {
    const { getNotifications, getNotificationCount } = this.props;
    let queryObject = [
      {
        key: "tenantId",
        value: JSON.parse(getUserInfo()).permanentCity,
      },
    ];
    const requestBody = {
      RequestInfo: {
        apiId: "org.egov.pt",
        ver: "1.0",
        ts: 1502890899493,
        action: "asd",
        did: "4354648646",
        key: "xyz",
        msgId: "654654",
        requesterId: "61",
        authToken: getAccessToken(),
        userInfo: {
          id: 1,
          uuid: "2dec8102-0e02-4d0a-b283-cd80d5dab089",
          type: "CITIZEN",
          tenantId: "pb.amritsar",
          roles: [
            {
              name: "Citizen",
              code: "CITIZEN",
              tenantId: "pb.amritsar",
            },
          ],
        },
      },
    };
    getNotifications(queryObject, requestBody);
    getNotificationCount(queryObject, requestBody);
  };

  componentWillReceiveProps() {
    this.getEventResponse();
  }

  render() {
    const { history } = this.props;
    const { notifications } = this.state;

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
          <ServicesNearby history={history} />
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16 }}>
            <Label label="DASHBOARD_WHATS_NEW_LABEL" fontSize={16} fontWeight={900} color="rgba(0, 0, 0, 0.8700000047683716)" />
            <Label label="DASHBOARD_VIEW_ALL_LABEL" color="#fe7a51" fontSize={14} />
          </div>
          <Notifications notifications={notifications} history={history} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const notifications = get(state.app, "notifications");
  return { notifications };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationCount: (queryObject, requestBody) => dispatch(getNotificationCount(queryObject, requestBody)),
    getNotifications: (queryObject, requestBody) => dispatch(getNotifications(queryObject, requestBody)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenDashboard);
