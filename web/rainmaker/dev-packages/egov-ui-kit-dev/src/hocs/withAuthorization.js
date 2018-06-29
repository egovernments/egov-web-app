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
    state = {
      titleAddon: "",
    };

    componentWillMount() {
      const { authenticated } = this.props;
      const { redirectionUrl } = options;
      if (!authenticated) {
        this.props.history.replace(redirectionUrl || "/citizen/user/login");
      }
    }

    roleFromUserInfo = (userInfo, role) => {
      const roleCodes =
        userInfo && userInfo.roles
          ? userInfo.roles.map((role) => {
              return role.code;
            })
          : [];
      return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
    };

    getUserRole = (userInfo) => {
      return (userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase()) || null;
    };

    renderCustomTitle = (numberOfComplaints) => {
      const titleAddon = numberOfComplaints ? `(${numberOfComplaints})` : "";
      this.setState({ titleAddon });
    };

    render() {
      const { hideHeader, hideFooter, hideFor, title, isHomeScreen, hideTitle, titleBackground, hideActionMenu, showNumberOfComplaints } = options;
      const { history, authenticated, userInfo, complaints } = this.props;
      const { titleAddon } = this.state;
      const role = this.roleFromUserInfo(userInfo, "CITIZEN")
        ? "citizen"
        : this.roleFromUserInfo(userInfo, "GRO")
          ? "ao"
          : this.roleFromUserInfo(userInfo, "CSR")
            ? "csr"
            : this.roleFromUserInfo(userInfo, "EMPLOYEE")
              ? "employee"
              : "";
      return (
        <div className="rainmaker-header-cont" style={{ position: "relative" }}>
          {!hideHeader && authenticated ? (
            <Header
              title={title}
              titleAddon={titleAddon && titleAddon}
              userInfo={userInfo}
              role={role}
              options={options}
              history={history}
              className="rainmaker-header"
            />
          ) : null}
          <div className=" col-xs-12" style={{ padding: 0 }}>
            {role !== "citizen" &&
              (!hideActionMenu && (
                <div>
                  <div className="col-xs-2 action-menu-drawer show-action-menu">
                    <div className="rainmaker-action-menu">
                      <ActionMenu role={role} />
                    </div>
                  </div>
                  <div className="col-xs-2  show-action-menu" /> {/*Dummy div for proper alignment - fixed positioning drawbacks*/}
                </div>
              ))}

            <div className={role !== "citizen" ? "col-xs-12 col-sm-10" : "col-xs-12 col-sm-12"} style={{ padding: 0 }}>
              {authenticated ? (
                <div>
                  {!hideTitle &&
                    role !== hideFor && (
                      <Label
                        className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"}
                        label={title}
                        containerStyle={{ padding: "24px 0 8px 16px" }}
                        dark={true}
                        bold={true}
                        fontSize={20}
                      />
                    )}
                  <Component {...this.props} renderCustomTitle={this.renderCustomTitle} />
                </div>
              ) : null}
            </div>
          </div>
          {/* {!hideFooter && authenticated ? (
            <div className="hidden-md hidden-sm hidden-lg">
              <Footer history={history} role={role} />
            </div>
          ) : null} */}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    const { complaints } = state || {};
    return { authenticated, userInfo };
  };
  return compose(
    withData,
    connect(mapStateToProps)
  )(Wrapper);
};

export default withAuthorization;
