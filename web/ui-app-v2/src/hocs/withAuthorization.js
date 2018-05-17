import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withData from "./withData";
import Header from "modules/common/common-components/Header";
import Footer from "modules/common/common-components/Footer";

const withAuthorization = (options = {}) => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
        window.androidAppProxy.stopSMSReceiver();
      }
    }

    componentWillMount() {
      const { authenticated } = this.props;
      const { redirectionUrl } = options;
      if (!authenticated) {
        this.props.history.replace(redirectionUrl || "/citizen/user/login");
      }
    }

    getUserRole = (userInfo) => {
      return (userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase()) || null;
    };

    render() {
      const { hideHeader, hideFooter, title, isHomeScreen } = options;
      const { history, authenticated, userInfo } = this.props;
      const role = this.getUserRole(userInfo);

      return (
        <div style={{ position: "relative" }}>
          {!hideHeader && authenticated ? <Header title={title} userInfo={userInfo} role={role} options={options} history={history} /> : null}
          {authenticated ? <Component {...this.props} /> : null}
          {!hideFooter && authenticated ? <Footer history={history} /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    return { authenticated, userInfo };
  };
  return compose(withData, connect(mapStateToProps))(Wrapper);
};

export default withAuthorization;
