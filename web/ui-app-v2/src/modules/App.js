import React, { Component } from "react";
import { connect } from "react-redux";
import { getBodyClassFromPath, addBodyClass, removeBodyClass } from "../utils/commons";
import HeaderWithDrawer from "./common/HeaderWithDrawer";
import { BottomNavigation, Icon } from "../components";
import IconButton from "material-ui/IconButton";

const options = [
  {
    label: "Home",
    icon: <Icon action="action" name="home" />,
    route: "/citizen",
  },
  {
    label: "Information",
    icon: <Icon action="action" name="info" />,
    route: "",
  },
  {
    label: "Payments",
    icon: <Icon action="custom" name="rupee" />,
    route: "",
  },
  {
    label: "Complaints",
    icon: <Icon action="alert" name="warning" />,
    route: "/citizen/my-complaints",
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
    const isHomeScreen = /(citizen|employee\/all-complaints)\/?$/.test(window.location.pathname);
    const isComplaintType = /(complaint-type)\/?$/.test(window.location.pathname);

    const style = { overflowX: "hidden", width: "initial" };
    if (isComplaintType) {
      style.boxShadow = "none";
    }

    const iconElementLeft = isHomeScreen ? null : (
      <IconButton>
        <Icon id="back-navigator" action="navigation" name="arrow-back" />
      </IconButton>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : this._handleBackNavigation;

    return { style, iconElementLeft, onLeftIconButtonClick };
  };

  componentDidMount() {
    const { path } = this.props;
    addBodyClass(path);
  }

  componentWillReceiveProps(nextProps) {
    const { path: nextPath } = nextProps;
    const { path: currentPath } = this.props;
    if (nextPath && currentPath && currentPath !== nextPath) {
      removeBodyClass(currentPath);
      addBodyClass(nextPath);
    }
  }

  render() {
    const { Component, hideBottomNavigation, hideAppBar, ...rest } = this.props;
    const { _updateMenuState, _onTabChange, _appBarProps } = this;
    const { toggleMenu, tabIndex } = this.state;

    const role = window.location.pathname.includes("citizen") ? "citizen" : "employee";

    return (
      <div>
        <HeaderWithDrawer
          {..._appBarProps()}
          className={hideAppBar ? "hide" : ""}
          history={rest.history}
          title={rest.title}
          onUpdateMenuStatus={_updateMenuState}
          toggleMenu={toggleMenu}
          role={role}
        />

        <Component {...rest} />
        <BottomNavigation className={hideBottomNavigation ? "hide" : ""} selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

export default connect(null, null)(App);
