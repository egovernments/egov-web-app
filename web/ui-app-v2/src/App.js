import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import HeaderWithDrawer from "./screens/common/HeaderWithDrawer";
import { BottomNavigation, Icon } from "./components";

import SvgIcon from "material-ui/SvgIcon";

// place it in a different folder
const RupeeIcon = props => (
  <SvgIcon {...props}>
    <path d="m14.503919,4.798149l2.903959,0l1.114051,-1.671076l-10.910272,0l-1.114051,1.671076l1.893887,0c1.916168,0 3.691222,0.14854 4.396788,1.752774l-5.176623,0l-1.114051,1.671076l6.498631,0c0,0.007427 0,0.007427 0,0.007427c0,1.203175 -1.002646,3.045073 -4.300237,3.045073l-1.596806,0l0,1.559671l6.394652,7.991459l2.844543,0l-6.610036,-8.258831c2.725711,-0.14854 5.280602,-1.671076 5.644525,-4.344799l2.035,0l1.114051,-1.671076l-3.178759,0c-0.126259,-0.64615 -0.401058,-1.270018 -0.839252,-1.752774z" />
  </SvgIcon>
);

const options = [
  {
    label: "Home",
    icon: <Icon style={{ height: "24px", padding: "0px" }} action="action" name="home" />,
    route: "/",
  },
  {
    label: "Information",
    icon: <Icon style={{ height: "24px", padding: "0px" }} action="action" name="info" />,
    route: "/information",
  },
  {
    label: "Payments",
    icon: <RupeeIcon />,
    route: "/payments",
  },
  {
    label: "Complaints",
    icon: <Icon style={{ height: "24px", padding: "0px" }} action="alert" name="warning" />,
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

  _updateMenuState = status => {
    this.setState({
      toggleMenu: status,
    });
  };

  _onTabChange = tabIndex => {
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
        <Component
          style={{
            marginBottom: "72px",
          }}
        />
        <BottomNavigation selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  route: state.framework.route,
});

export default withRouter(connect(mapStateToProps, null)(App));
