import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderWithDrawer from "./screens/common/HeaderWithDrawer";
import { BottomNavigation, Icon } from "./components";
import IconButton from "material-ui/IconButton";

const iconStyle = { height: "24px", padding: "0px" };

const options = [
  {
    label: "Home",
    icon: <Icon style={iconStyle} action="action" name="home" />,
    route: "/",
  },
  {
    label: "Information",
    icon: <Icon style={iconStyle} action="action" name="info" />,
    route: "",
  },
  {
    label: "Payments",
    icon: <Icon style={iconStyle} action="custom" name="rupee" />,
    route: "",

  },
  {
    label: "Complaints",
    icon: <Icon style={iconStyle} action="alert" name="warning" />,
    route: "/my-complaints",
  },
];

class App extends Component {
  state = {
    toggleMenu: false,
    tabIndex: 0,
  };

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
    const windowLocationParts = window.location.pathname.split("/");
    const windowName = windowLocationParts[windowLocationParts.length - 1];
    const isHomeScreen = windowName.trim().length === 0 ? true : false;

    const style = { overflowX: "hidden", width: "initial" };
    if (windowName.endsWith("complaint-type")) {
      style.boxShadow = "none";
    }

    const title = isHomeScreen
      ? "Home"
      : windowName
          .split("-")
          .map((element) => {
            return element[0].toUpperCase() + element.slice(1);
          })
          .join(" ");

    const iconElementLeft = isHomeScreen ? null : (
      <IconButton>
        <Icon action="navigation" name="arrow-back" />
      </IconButton>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : this._handleBackNavigation;

    return { style, title, iconElementLeft, onLeftIconButtonClick };
  };

  _appBarProps = () => {
    const windowLocationParts = window.location.pathname.split("/");
    const windowName = windowLocationParts[windowLocationParts.length - 1];
    const isHomeScreen = windowName.trim().length === 0 ? true : false;

    const style = { overflowX: "hidden", width: "initial" };
    if (windowName.endsWith("complaint-type")) {
      style.boxShadow = "none";
    }

    const title = isHomeScreen
      ? "Home"
      : windowName
          .split("-")
          .map((element) => {
            return element[0].toUpperCase() + element.slice(1);
          })
          .join(" ");

    const iconElementLeft = isHomeScreen ? null : (
      <IconButton>
        <Icon action="navigation" name="arrow-back" />
      </IconButton>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : this._handleBackNavigation;

    return { style, title, iconElementLeft, onLeftIconButtonClick };
  };

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

  render() {
    const { Component, hideBottomNavigation, hideAppBar, ...rest } = this.props;
    const { _updateMenuState, _onTabChange, _appBarProps } = this;
    const { toggleMenu, tabIndex } = this.state;

    return (
      <div>

        <HeaderWithDrawer
          {..._appBarProps()}
          className={hideAppBar ? "hide" : ""}
          history={rest.history}
          onUpdateMenuStatus={_updateMenuState}
          toggleMenu={toggleMenu}
        />

        <Component {...rest} />
        <BottomNavigation className={hideBottomNavigation ? "hide" : ""} selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.framework.route,
});

export default connect(mapStateToProps, null)(App);
