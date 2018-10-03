import React, { Component } from "react";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import { Icon } from "components";
import AppBar from "./components/AppBar";
import LogoutDialog from "./components/LogoutDialog";
import NavigationDrawer from "./components/NavigationDrawer";
import { logout } from "egov-ui-kit/redux/auth/actions";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import get from "lodash/get";
import "./index.css";

// get userInfo role
class Header extends Component {
  state = {
    toggleMenu: false,
    logoutPopupOpen: false,
    right: false,
    left: false,
    ulbLogo: "",
  };

  componentDidMount = () => {
    const { role } = this.props;
    if (role && role.toLowerCase() !== "citizen") {
      const tenantId = localStorage.getItem("tenant-id");
      const ulbLogo = `https://s3.ap-south-1.amazonaws.com/pb-egov-assets/${tenantId}/logo.png`;
      this.setState({ ulbLogo });
    }
  };

  _handleToggleMenu = () => {
    const { toggleMenu } = this.state;
    this.setState({
      toggleMenu: !toggleMenu,
    });
  };

  //header related actions
  _onUpdateMenuStatus = (status) => {
    this.setState({
      toggleMenu: status,
    });
  };

  _handleBackNavigation = () => {
    this.props.history.goBack();
  };

  _logout = () => {
    this._closeLogoutDialog();
    this.props.logout();
  };

  _closeLogoutDialog = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };

  _appBarProps = () => {
    const { isHomeScreen, hideBackButton } = this.props.options;
    const isComplaintType = /(complaint-type)\/?$/.test(window.location.pathname);

    const style = { overflowX: "hidden", width: "initial", overflowY: "hidden" };
    if (isComplaintType) {
      style.boxShadow = "none";
    }

    const iconElementLeft = (
      <div className="appbar-left-icon">
        <IconButton id="icon-hamburger">
          {isHomeScreen ? (
            <Icon id="icon-hamburger" action="custom" name="hamburger" />
          ) : hideBackButton ? null : (
            <Icon id="back-navigator" action="navigation" name="arrow-back" />
          )}
        </IconButton>
      </div>
    );

    const onLeftIconButtonClick = isHomeScreen ? this._handleToggleMenu : hideBackButton ? null : this._handleBackNavigation;
    const onToolBarIconClick = this._handleToggleMenu;

    return { style, iconElementLeft, onLeftIconButtonClick, onToolBarIconClick, isHomeScreen };
  };

  _handleItemClick = (item, index) => {
    const { route } = item;
    // close the navigation bar
    this._handleToggleMenu();
    // this logic is a bit shaky!! might break in future
    switch (route.slice(1)) {
      case "logout":
        this.setState({
          logoutPopupOpen: true,
        });
        break;
      case "language-selection":
        break;
      default:
        this.props.history.push(route);
        break;
    }
  };

  render() {
    const { toggleMenu, logoutPopupOpen } = this.state;
    const { _onUpdateMenuStatus, _handleItemClick, _logout, _closeLogoutDialog, _appBarProps } = this;
    const appBarProps = _appBarProps();
    const { className, role, cities, history, title, titleAddon, fetchLocalizationLabel, userInfo, isHomeScreen, defaultTitle } = this.props;
    return (
      <div>
        <AppBar
          className={className}
          title={title}
          defaultTitle={defaultTitle}
          titleAddon={titleAddon}
          role={role}
          ulbLogo={this.state.ulbLogo}
          {...appBarProps}
          fetchLocalizationLabel={fetchLocalizationLabel}
          userInfo={userInfo}
        />
        <NavigationDrawer
          handleItemClick={_handleItemClick}
          onUpdateMenuStatus={_onUpdateMenuStatus}
          toggleMenu={toggleMenu}
          history={history}
          cities={cities}
          userInfo={userInfo}
          fetchLocalizationLabel={fetchLocalizationLabel}
          role={role && role === "citizen" ? "citizen" : "employee"}
          isCSR={role === "csr" ? true : false}
          isCSR={role === "pgr-admin" ? true : false}
          openSecondary={window.innerWidth >= 768 ? true : false}
          width={300}
          // containerStyle={{ top: "64px" }}
        />
        <LogoutDialog logoutPopupOpen={logoutPopupOpen} closeLogoutDialog={_closeLogoutDialog} logout={_logout} />
      </div>
    );
  }
}

const getReceiptHeaderLabel = (name, ulbGrade) => {
  if (ulbGrade) {
    if (ulbGrade === "NP") {
      return `${name.toUpperCase()} NAGAR PANCHAYAT`;
    } else if (ulbGrade === "Municipal Corporation") {
      return `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    } else if (ulbGrade.includes("MC Class")) {
      return `${name.toUpperCase()} MUNICIPAL COUNCIL`;
    } else {
      return `${name.toUpperCase()} MUNICIPAL CORPORATION`;
    }
  } else {
    return `${name.toUpperCase()} MUNICIPAL CORPORATION`;
  }
};

const mapStateToProps = (state) => {
  const cities = state.common.cities || [];
  const tenantId = localStorage.getItem("tenant-id");
  const userTenant = cities.filter((item) => item.code === tenantId);
  const ulbGrade = userTenant && get(userTenant[0], "city.ulbGrade");
  const name = userTenant && get(userTenant[0], "name");
  const defaultTitle = ulbGrade && name && getReceiptHeaderLabel(name, ulbGrade);
  return { cities, defaultTitle };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
