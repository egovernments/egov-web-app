import React, { Component } from "react";
import { connect } from "react-redux";
import { addBodyClass, removeBodyClass } from "../utils/commons";
import HeaderWithDrawer from "./common/HeaderWithDrawer";
import { BottomNavigation, Icon } from "../components";
import IconButton from "material-ui/IconButton";
import {toggleSnackbarAndSetText} from "../redux/app/actions";
import {fetchComplaintCategoies} from "../redux/complaints/actions";
import Snackbar from 'material-ui/Snackbar';

const options = [
  {
    label: "Home",
    icon: <Icon action="action" name="home" />,
    route: "/citizen",
    id: "home-button",
  },
  {
    label: "Information",
    icon: <Icon action="action" name="info" />,
    route: "",
    id: "information-button",
  },
  {
    label: "Payments",
    icon: <Icon action="custom" name="rupee" />,
    route: "",
    id: "payments-button",
  },
  {
    label: "Complaints",
    icon: <Icon action="alert" name="warning" />,
    route: "/citizen/my-complaints",
    id: "complaints-button",
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

    const iconElementLeft = (
      <IconButton>
        {isHomeScreen ? (
          <Icon id="icon-hamburger" action="action" name="reorder" />
        ) : (
          <Icon id="back-navigator" action="navigation" name="arrow-back" />
        )}
      </IconButton>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : this._handleBackNavigation;

    return { style, iconElementLeft, onLeftIconButtonClick };
  };

  componentDidMount() {
    const { path } = this.props;
    addBodyClass(path);
      // fetchComplaintCategoies();
  }

  componentWillReceiveProps(nextProps) {
    // to be removed once all navigation is migrated to routes
    const { path: nextPath } = nextProps;
    const { path: currentPath } = this.props;
    if (nextPath && currentPath && currentPath !== nextPath) {
      removeBodyClass(currentPath);
      addBodyClass(nextPath);
    }
  }

  render() {
    const { Component, hideBottomNavigation, hideAppBar, toast,...rest} = this.props;
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
        {toast && toast.msg && (
          <Snackbar
            open={toast.status}
            message={toast.msg}
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
            bodyStyle={{
              pointerEvents: 'initial',
              maxWidth: 'none',
              backgroundColor: toast.isSuccess ? '#3ca23c' : toast.isError ? '#e83e36' : 'rgb(95, 92, 98)',
              textAlign: 'center',
            }}
            autoHideDuration={6000}
            onRequestClose={() => toggleSnackbarAndSetText(false, '', false, false)}
          />
        )}
        <BottomNavigation className={hideBottomNavigation ? "hide" : ""} selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { route, toast } = state.app;
  return { route,toast };
};

export default connect(mapStateToProps, {toggleSnackbarAndSetText,fetchComplaintCategoies})(App);
