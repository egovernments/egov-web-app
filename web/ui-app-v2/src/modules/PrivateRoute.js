import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import IconButton from "material-ui/IconButton";
import { BottomNavigation, Icon, LoadingIndicator } from "components";
import HeaderWithDrawer from "modules/common/HeaderWithDrawer";
import { setRoute } from "redux/app/actions";
import { fetchComplaintCategories } from "redux/complaints/actions";
import { logout } from "redux/auth/actions";
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
  state = {
    toggleMenu: false,
    tabIndex: 0,
  };

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
    const { previousRoute, setRoute } = this.props;
    // go back to previous route
    // setRoute(previousRoute);
    this.props.history.goBack();
  };

  _onTabChange = (tabIndex) => {
    const route = options[tabIndex].route;
    this.setState({
      tabIndex,
    });
    if (route.length) this.props.setRoute(route);
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

  render() {
    const {
      component: Component,
      hideBottomNavigation,
      hideAppBar,
      toast,
      logout,
      authenticating,
      authenticated,
      authenticationFailed,
      setRoute,
      ...rest
    } = this.props;
    const { _appBarProps, _updateMenuState, _onTabChange } = this;
    const { toggleMenu, tabIndex } = this.state;
    const role = window.location.pathname.includes("citizen") ? "citizen" : "employee";

    return (
      <div>
        <HeaderWithDrawer
          {..._appBarProps()}
          className={hideAppBar ? "hide" : ""}
          title={rest.title}
          setRoute={setRoute}
          onUpdateMenuStatus={_updateMenuState}
          toggleMenu={toggleMenu}
          role={role}
          logout={logout}
        />
        <Route
          {...rest}
          render={(props) =>
            authenticated ? <Component {...props} /> : authenticating ? <LoadingIndicator loading={true} /> : <Redirect to="/citizen/user/register" />
          }
        />
        <BottomNavigation className={hideBottomNavigation ? "hide" : ""} selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (route) => dispatch(setRoute(route)),
    fetchComplaintCategories: () => dispatch(fetchComplaintCategories()),
    logout: () => dispatch(logout()),
  };
};

const mapStateToProps = (state) => {
  const { authenticated, authenticating, authenticationFailed } = state.auth;
  const { previousRoute } = state.app;
  return { authenticated, previousRoute, authenticating, authenticationFailed };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
