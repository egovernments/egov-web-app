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
    route: "/information",
  },
  {
    label: "Payments",
    icon: <Icon style={iconStyle} action="custom" name="rupee" />,
    route: "/payments",
  },
  {
    label: "Complaints",
    icon: <Icon style={iconStyle} action="alert" name="warning" />,
    route: "/complaints",
  },
];

class App extends Component {
  state = {
    toggleMenu: false,
    tabIndex: 0,
  };

  _handleToggleMenu = () => {
    let { toggleMenu } = this.state;
    toggleMenu = !toggleMenu;
    this.setState({
      toggleMenu,
    });
  };

  _updateMenuState = (status) => {
    this.setState({
      toggleMenu: status,
    });
  };

  _onTabChange = (tabIndex) => {
    this.setState({
      tabIndex,
    });
  };

  _appBarProps = () => {
    const windowName = window.location.pathname.slice(1);

    const style = { overflowX: "hidden", width: "initial" };
    if (windowName.endsWith("complaint-category")) {
      style.boxShadow = "none";
    }

    const title =
      windowName.trim().length === 0
        ? "Home"
        : windowName
            .split("-")
            .map((element) => {
              return element[0].toUpperCase() + element.slice(1);
            })
            .join(" ");

    const iconElementLeft =
      windowName.trim().length === 0 ? null : (
        <IconButton>
          <Icon action="navigation" name="arrow-back" />
        </IconButton>
      );

    return { style, title, iconElementLeft };
  };

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

  render() {
    const { Component, ...rest } = this.props;
    const { _handleToggleMenu, _updateMenuState, _onTabChange, _appBarProps } = this;
    const { toggleMenu, tabIndex } = this.state;

    return (
      <div>
        <HeaderWithDrawer {..._appBarProps()} toggleMenu={toggleMenu} onHandleToggleMenu={_handleToggleMenu} onUpdateMenuStatus={_updateMenuState} />
        <Component {...rest} />
        <BottomNavigation selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.framework.route,
});

export default connect(mapStateToProps, null)(App);
