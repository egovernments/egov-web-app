import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import { Redirect, Route } from "react-router-dom";
import { BottomNavigation, Icon, LoadingIndicator } from "components";
import HeaderWithDrawer from "modules/common/HeaderWithDrawer";
import { fetchComplaintCategories } from "redux/complaints/actions";
import { getCityNameByCode, getCurrentAddress } from "utils/commons";
import { logout, searchUser } from "redux/auth/actions";
import { fetchCurrentLocation } from "redux/app/actions";
import Label from "utils/translationNode";

const options = [
  {
    label: <Label fontSize="12px" label="COMMON_BOTTOM_NAVIGATION_HOME" color="#969696" />,
    icon: <Icon action="action" name="home" />,
    route: "/citizen",
    id: "home-button",
  },
  {
    label: <Label fontSize="12px" label="COMMON_BOTTOM_NAVIGATION_INFORMATION" color="#969696" />,
    icon: <Icon action="action" name="info" />,
    route: "",
    id: "information-button",
  },
  {
    label: <Label fontSize="12px" label="COMMON_BOTTOM_NAVIGATION_PAYMENTS" color="#969696" />,
    icon: <Icon action="custom" name="rupee" />,
    route: "",
    id: "payments-button",
  },
  {
    label: <Label label="COMMON_BOTTOM_NAVIGATION_COMPLAINTS" fontSize="12px" color="#969696" />,
    icon: <Icon action="alert" name="warning" />,
    route: "/citizen/my-complaints",
    id: "complaints-button",
  },
];

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleMenu: false,
      tabIndex: 0,
    };

    if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
      window.androidAppProxy.stopSMSReceiver();
    }
  }

  componentWillMount() {
    const { searchUser, fetchCurrentLocation } = this.props;
    fetchCurrentLocation();
    searchUser();
  }

  //why the need to call this at every route?
  componentDidMount() {
    const { fetchComplaintCategories } = this.props;
    fetchComplaintCategories();
  }

  _updateMenuState = (status) => {
    this.setState({
      toggleMenu: status,
    });
  };
  _handleToggleMenu = () => {
    let { toggleMenu } = this.state;
    this.setState({
      toggleMenu: !toggleMenu,
    });
  };

  _handleBackNavigation = () => {
    this.props.history.goBack();
  };

  _onTabChange = (tabIndex) => {
    const route = options[tabIndex].route;
    this.setState({
      tabIndex,
    });
    if (route.length) this.props.history.push(route);
  };

  _appBarProps = () => {
    const isHomeScreen = /(citizen|employee\/all-complaints)\/?$/.test(window.location.pathname);
    const isComplaintType = /(complaint-type)\/?$/.test(window.location.pathname);

    const style = { overflowX: "hidden", width: "initial" };
    if (isComplaintType) {
      style.boxShadow = "none";
    }

    const iconElementLeft = (
      <IconButton id="icon-hamburger">
        {isHomeScreen ? (
          <Icon id="icon-hamburger" action="custom" name="hamburger" />
        ) : (
          <Icon id="back-navigator" action="navigation" name="arrow-back" />
        )}
      </IconButton>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : this._handleBackNavigation;

    return { style, iconElementLeft, onLeftIconButtonClick };
  };

  prepareUserInfo = (userInfo = {}, cities = []) => {
    const { photo, name, emailId, permanentCity, tenantId } = userInfo;
    return { photo, name, emailId, location: getCityNameByCode(permanentCity, cities) || getCityNameByCode(tenantId, cities) };
  };

  render() {
    const {
      component: Component,
      hideBottomNavigation,
      hideAppBar,
      toast,
      logout,
      userInfo,
      cities,
      authenticating,
      authenticated,
      authenticationFailed,
      history,
      ...rest
    } = this.props;
    const { _appBarProps, _updateMenuState, _onTabChange, prepareUserInfo } = this;
    const { toggleMenu, tabIndex } = this.state;
    const role = window.location.pathname.includes("citizen") ? "citizen" : "employee";

    return (
      <div>
        <HeaderWithDrawer
          {..._appBarProps()}
          className={hideAppBar ? "hide" : ""}
          title={rest.title}
          history={history}
          userInfo={(userInfo && prepareUserInfo(userInfo, cities)) || {}}
          onUpdateMenuStatus={_updateMenuState}
          toggleMenu={toggleMenu}
          role={role}
          logout={logout}
        />
        <Route
          {...rest}
          render={(props) =>
            authenticated ? (
              <Component {...props} />
            ) : authenticating ? (
              <LoadingIndicator loading={true} />
            ) : (
              <Redirect to={role === "employee" ? "/employee/user/login" : "/citizen/user/login"} />
            )
          }
        />
        <BottomNavigation className={hideBottomNavigation ? "hide" : ""} selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaintCategories: () => dispatch(fetchComplaintCategories()),
    logout: () => dispatch(logout()),
    searchUser: () => dispatch(searchUser()),
    fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
  };
};

const mapStateToProps = (state) => {
  const { authenticated, authenticating, authenticationFailed, userInfo } = state.auth;
  const cities = state.common.cities || [];
  return { authenticated, authenticating, authenticationFailed, userInfo, cities };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
