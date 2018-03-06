import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import HeaderWithDrawer from "./screens/common/HeaderWithDrawer";
import Router from "./router";
import BottomNavigation from "./components/BottomNavigation";

import ActionHome from "material-ui/svg-icons/action/home";
import Info from "material-ui/svg-icons/action/info";
import Complaint from "material-ui/svg-icons/alert/warning";
import Currency from "material-ui/svg-icons/action/euro-symbol";

const options = [
  {
    label: "Home",
    icon: <ActionHome />,
    route: "/",
  },
  {
    label: "Information",
    icon: <Info />,
    route: "/information",
  },
  {
    label: "Payments",
    icon: <Currency />,
    route: "/payments",
  },
  {
    label: "Complaints",
    icon: <Complaint />,
    route: "/complaints",
  },
];

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

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

  componentDidMount() {}

  render() {
    const { moduleName, moduleAction, Component } = this.props;
    const { specs, _handleToggleMenu, _updateMenuState, _onTabChange } = this;
    const { toggleMenu, tabIndex } = this.state;
    return (
      <div>
        <HeaderWithDrawer toggleMenu={toggleMenu} onHandleToggleMenu={_handleToggleMenu} onUpdateMenuStatus={_updateMenuState} />
        <Component style={{
          marginBottom:"72px"
        }} />
        <BottomNavigation selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.framework.route,
});

export default withRouter(connect(mapStateToProps, null)(App));
