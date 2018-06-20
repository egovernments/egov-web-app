import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withData from "./withData";
import { Header } from "modules/common";
import { Footer } from "modules/common";
import { ActionMenu } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";

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
      const { hideHeader, hideFooter, title, isHomeScreen, hideTitle, titleBackground } = options;
      const { history, authenticated, userInfo } = this.props;
      const role = this.getUserRole(userInfo);

      return (
        <div className="rainmaker-header-cont" style={{ position: "relative" }}>
          {!hideHeader && authenticated ? (
            <Header title={title} userInfo={userInfo} role={role} options={options} history={history} className="rainmaker-header" />
          ) : null}
          <div className=" col-xs-12" style={{ padding: 0 }}>
            <div className="col-xs-2 action-menu-drawer show-action-menu">
              <div className="rainmaker-action-menu">{<ActionMenu role={role} />}</div>
            </div>
            <div className="col-xs-2  show-action-menu" /> {/*Dummy div for proper alignment*/}
            <div className="col-xs-12 col-sm-10" style={{ padding: 0 }}>
              {authenticated ? (
                <div>
                  {!hideTitle && (
                    <Label className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"} label={title} />
                  )}
                  <Component {...this.props} />
                </div>
              ) : null}
            </div>
          </div>
          {!hideFooter && authenticated ? (
            <div className="hidden-md hidden-sm hidden-lg">
              <Footer history={history} role={role} />
            </div>
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    return { authenticated, userInfo };
  };
  return compose(
    withData,
    connect(mapStateToProps)
  )(Wrapper);
};

export default withAuthorization;
