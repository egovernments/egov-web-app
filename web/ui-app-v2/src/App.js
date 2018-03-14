import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderWithDrawer from "./screens/common/HeaderWithDrawer";
import { BottomNavigation, Icon } from "./components";

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

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

  render() {
    const { Component, ...rest } = this.props;
    const { specs, _handleToggleMenu, _updateMenuState, _onTabChange } = this;
    const { toggleMenu, tabIndex } = this.state;
    return (
      <div>
        <HeaderWithDrawer toggleMenu={toggleMenu} onHandleToggleMenu={_handleToggleMenu} onUpdateMenuStatus={_updateMenuState} />
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
