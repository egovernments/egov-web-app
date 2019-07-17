import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import { getNotificationCount, getNotifications } from "egov-ui-kit/redux/app/actions";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import ServicesNearby from "./components/ServicesNearby";
import { Notifications, Screen } from "modules/common";
import "./index.css";
import get from "lodash/get";
import { getTransformedNotifications } from "egov-ui-kit/utils/commons";
import { getAccessToken } from "egov-ui-kit/utils/localStorageUtils";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import isEqual from "lodash/isEqual";

class CitizenDashboard extends Component {
  state = {
    notifications: [],
    onGroundEvents: [],
    queryObject: [],
  };

  getEventResponse = (props) => {
    const { notifications } = props;
    let filteredNotifications =
      notifications &&
      notifications.filter((item) => {
        return item.eventType === "SYSTEMGENERATED" || item.eventType === "BROADCAST";
      });
    let displayEvents =
      filteredNotifications && getTransformedNotifications(filteredNotifications).slice(0, Math.min(3, filteredNotifications.length));
    this.setState({
      notifications: displayEvents,
    });
  };

  componentDidMount = () => {
    const { getNotificationCount, getNotifications, userInfo } = this.props;
    if (get(userInfo, "permanentCity")) {
      const queryObject = [
        {
          key: "tenantId",
          value: get(userInfo, "permanentCity"),
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
        },
      };

      getNotifications(queryObject, requestBody);
      getNotificationCount(queryObject, requestBody);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.getEventResponse(nextProps);
    if (!isEqual(nextProps, this.props)) {
      const { userInfo, notifications } = nextProps;
      if (get(userInfo, "permanentCity")) {
        const { getNotifications, getNotificationCount } = this.props;
        const queryObject = [
          {
            key: "tenantId",
            value: get(userInfo, "permanentCity"),
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
          },
        };

        if (!notifications) {
          getNotifications(queryObject, requestBody);
          getNotificationCount(queryObject, requestBody);
        }
      }
    }
  }

  render() {
    const { history, loading } = this.props;
    const { notifications } = this.state;
    return (
      <Screen loading={loading}>
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
            <Link to="/notifications">
              <Label label="DASHBOARD_VIEW_ALL_LABEL" color="#fe7a51" fontSize={14} />
            </Link>
          </div>
          <Notifications notifications={notifications} history={history} />
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const notifications = get(state.app, "notificationObj.notifications");
  const loading = get(state.app, "notificationObj.loading");
  const userInfo = get(state.auth, "userInfo");
  return { notifications, userInfo, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationCount: (queryObject, requestBody) => dispatch(getNotificationCount(queryObject, requestBody)),
    getNotifications: (queryObject, requestBody) => dispatch(getNotifications(queryObject, requestBody)),
    toggleSpinner: () => dispatch(toggleSpinner()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenDashboard);
