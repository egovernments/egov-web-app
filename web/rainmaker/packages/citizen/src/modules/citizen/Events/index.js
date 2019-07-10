import React from "react";
import { Notifications, Screen } from "modules/common";
import get from "lodash/get";
import { connect } from "react-redux";
import { getTransformedNotifications } from "egov-ui-kit/utils/commons";

class Events extends React.Component {
  render() {
    const { notifications, history } = this.props;
    let eventarray = notifications.filter((item) => item.eventType === "EVENTSONGROUND");
    return (
      <Screen>
        <Notifications notifications={getTransformedNotifications(eventarray)} history={history} />;
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const notifications = get(state.app, "notifications");
  return { notifications };
};

export default connect(
  mapStateToProps,
  null
)(Events);
