import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withData from "./withData";
import { Header } from "modules/common";
import { Footer } from "modules/common";
import { ActionMenu } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import { logout } from "egov-ui-kit/redux/auth/actions";

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
        this.props.history.replace(redirectionUrl || "/user/login");
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

    renderCustomTitle = (numberOfComplaints) => {
      const titleAddon = numberOfComplaints ? `(${numberOfComplaints})` : "";
      this.setState({ titleAddon });
    };

    render() {
      const {
        hideHeader,
        hideFooter,
        customTitle,
        customFor,
        hideFor,
        title,
        isHomeScreen,
        hideTitle,
        titleBackground,
        hideActionMenu,
        showNumberOfComplaints,
      } = options;
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

      //For restricting citizen to access employee url

      if (process.env.NODE_ENV === "production") {
        const _role = role === "citizen" ? "citizen" : "employee";
        if (window.basename.slice(1).toLowerCase() !== _role) {
          this.props.logout();
        }
      }
      const getUserRole = () => {
        let { userInfo } = this.props;
        return (userInfo && userInfo.roles && userInfo.roles.length > 0 && userInfo.roles[0].code.toUpperCase()) || null;
      };
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
            {!hideActionMenu && (
              <div>
                <div className="col-xs-2 action-menu-drawer show-action-menu">
                  <div className="rainmaker-action-menu">
                    <ActionMenu role={getUserRole()} />
                  </div>
                </div>
                <div className="col-xs-2  show-action-menu" /> {/*Dummy div for proper alignment - fixed positioning drawbacks*/}
              </div>
            )}

            <div className={"col-xs-12 col-sm-10"} style={{ padding: 0 }}>
              {authenticated ? (
                <div>
                  {!hideTitle &&
                    role !== hideFor && (
                      <div className={"screen-title-label"} style={{ padding: "24px 0 8px 16px" }}>
                        <Label
                          className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"}
                          label={role === customFor ? customTitle : title}
                          containerStyle={{ marginRight: 3 }}
                          dark={true}
                          bold={true}
                          fontSize={20}
                        />
                        {titleAddon && (
                          <Label
                            className={titleBackground ? "title-white-background screen-title-label" : "screen-title-label"}
                            label={titleAddon}
                            dark={true}
                            bold={true}
                            fontSize={20}
                          />
                        )}
                      </div>
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
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
    };
  };
  return compose(
    withData,
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Wrapper);
};

export default withAuthorization;
