import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Drawer, List, ProfileSection, Image, ButtonGroup, Icon, Dialog, Button } from "components";
//import profileImage from "assets/people1.png";
import emptyFace from "assets/images/download.png";
import logoMseva from "assets/images/logo_black.png";
import Label from "utils/translationNode";
import { fetchLocalizationLabel } from "redux/app/actions";
import "./index.css";

const listInnerDivStyle = {
  padding: "16px 0px 16px 60px",
};

const selectedLabelStyle = {
  color: "#ffffff",
};

const selectedStyle = {
  backgroundColor: "#00bcd1",
  border: "1px solid #00bcd1",
};

const defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "30px",
  lineHeight: "30px",
  width: "28.48%",
  minWidth: "inherit",
  padding: 0,
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0,
};
/*Styles for language toggle ends */

const logoutContentStyle = { textAlign: "center", padding: "24px 20px" };

const style = { borderRadius: "50%", width: 89, height: 88, margin: "0 auto", marginBottom: "16px" };
const cardStyles = {
  // width: '84.5%',
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: "#e0e0e0",
};
const nameStyle = {
  paddingTop: 10,
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 900,
  fontStyle: "normal",
  fontStretch: "normal",
  lineHeight: "normal",
  letterSpacing: 0.3,
  color: "#484848",
  padding: 0,
  textTransform: "none",
};
const iconStyle = {
  height: "18px",
  width: "18px",
  paddingTop: 12,
};

const locationStyle = {
  fontFamily: "Roboto",
  fontSize: 7,
  fontWeight: 500,
};

class HeaderWithDrawer extends Component {
  state = {
    languageItems: [
      {
        label: "ENGLISH",
        value: "en_IN",
      },
      {
        label: "हिंदी",
        value: "hi_IN",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "pn_IN",
      },
    ],
    logoutPopupOpen: false,
    value: localStorage.getItem("locale"),
    role: "citizen",
  };

  citizenItemsPartOne = {
    items: [
      {
        primaryText: <Label label="CS_HOME_HOMEHEADER" />,
        route: "/citizen",
        leftIcon: <Icon action="action" name="home" />,
        style: {
          paddingBottom: "1px",
          paddingTop: "1px",
          borderLeft: "3px solid #00bbd3",
        },
        id: "header-home",
      },
      {
        primaryText: <Label label="CS_HOME_HEADER_PROFILE" />,
        route: "/citizen/user/profile",
        leftIcon: <Icon action="social" name="person" />,
        style: {
          paddingBottom: "3px",
          paddingTop: "3px",
        },
        id: "header-profile",
      },
      {
        primaryText: <Label label="CS_HOME_HEADER_LANGUAGE" />,
        route: "/language-selection",
        leftIcon: <Icon action="action" name="language" />,
        style: {
          borderBottom: "none",
        },
        id: "header-language",
      },
    ],
  };

  citizenItemsPartTwo = {
    items: [
      {
        primaryText: <Label label="CS_HOME_HEADER_CONTACT_US" />,
        route: "/citizen/contact-us",
        leftIcon: <Icon action="communication" name="call" />,
        style: {
          paddingBottom: "8px",
          paddingTop: "8px",
        },
        id: "header-contact-us",
      },
      {
        primaryText: <Label label="CS_HOME_HEADER_HOW_IT_WORKS" />,
        route: "/citizen/how-it-works",
        leftIcon: <Icon action="custom" name="help-circle" />,
        style: {
          paddingBottom: "2px",
          paddingTop: "2px",
        },
        id: "header-how-it-works",
      },
      {
        primaryText: <Label label="CORE_COMMON_LOGOUT" />,
        route: "/logout",
        leftIcon: <Icon action="action" name="power-settings-new" />,
        style: {
          borderBottom: "none",
          borderLeft: "red",
        },
        id: "header-logout",
      },
    ],
  };

  employeeItemsPartOne = {
    items: [
      {
        primaryText: <Label label="CS_HOME_HOMEHEADER" />,
        route: "/employee/all-complaints",
        leftIcon: <Icon action="action" name="home" />,
        style: {
          paddingBottom: "1px",
          paddingTop: "1px",
          borderLeft: "3px solid #00bbd3",
        },
        id: "header-home",
      },
      {
        primaryText: <Label label="ES_CLOSED_COMPLAINTS_HEADER" />,
        route: "/employee/closed-complaints",
        leftIcon: <Icon action="custom" name="file-check" />,
        id: "header-closed-complaint",
      },
      {
        primaryText: <Label label="ES_EMPLOYEE_DIRECTORY_HEADER" />,
        route: "/employee/employee-directory",
        leftIcon: <Icon action="communication" name="call" />,
        style: {
          paddingBottom: "2px",
          paddingTop: "2px",
        },
        id: "header-contact-us",
      },

      {
        primaryText: <Label label="CS_HOME_HEADER_PROFILE" />,
        route: "/employee/user/profile",
        leftIcon: <Icon action="social" name="person" />,
        style: {
          paddingBottom: "3px",
          paddingTop: "3px",
        },
        id: "header-profile",
      },
      {
        primaryText: <Label label="CS_HOME_HEADER_LANGUAGE" />,
        route: "/language-selection",
        leftIcon: <Icon action="action" name="language" />,
        style: {
          borderBottom: "none",
        },
        id: "header-language",
      },
    ],
  };

  employeeItemsPartTwo = {
    items: [
      {
        primaryText: <Label label="CORE_COMMON_LOGOUT" />,
        route: "/logout",
        leftIcon: <Icon action="action" name="power-settings-new" />,
        style: {
          borderBottom: "none",
          borderLeft: "red",
        },
        id: "header-logout",
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
    this.props.fetchLocalizationLabel(value);
  };

  handleItem = (item, index) => {
    let { route } = item;
    this.props.onLeftIconButtonClick();

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
  handleYes = () => {
    this.setState({
      logoutPopupOpen: false,
    });
    this.props.logout();
  };
  handleNo = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };
  handleLogoutClose = () => {
    this.setState({
      logoutPopupOpen: false,
    });
  };

  render() {
    const { languageItems, value, logoutPopupOpen } = this.state;
    const { onClick } = this;
    let { onUpdateMenuStatus, toggleMenu, className, role, history, logout, fetchLocalizationLabel, userInfo, ...appBarProps } = this.props;
    userInfo = userInfo || {};
    return (
      <div>
        <AppBar className={className || "header-with-drawer"} titleStyle={{ fontSize: "20px", fontWeight: 500 }} {...appBarProps} />
        {/* Navigation Drawer */}
        <Drawer docked={false} width="85%" open={toggleMenu} onRequestChange={(open) => onUpdateMenuStatus(open)}>
          <ProfileSection
            imgStyle={style}
            cardStyles={cardStyles}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
            emailIdStyle={nameStyle}
            name={userInfo.name || ""}
            emailId={role === "citizen" ? userInfo.emailId || "" : ""}
            location={userInfo.location || ""}
            iconStyle={iconStyle}
            imgSrc={userInfo.photo || emptyFace}
          />

          <div className="drawer-list-poweredBy-wrapper">
            <List
              onItemClick={this.handleItem}
              innerDivStyle={listInnerDivStyle}
              className="drawer-list-style"
              items={role === "citizen" ? this.citizenItemsPartOne.items : this.employeeItemsPartOne.items}
              listContainerStyle={{ background: "#ffffff" }}
              listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
            />

            <div className="drawer-button-toggle-container">
              <ButtonGroup
                items={languageItems}
                onClick={onClick}
                selected={value}
                defaultStyle={defaultStyle}
                defaultLabelStyle={defaultLabelStyle}
                selectedStyle={selectedStyle}
                selectedLabelStyle={selectedLabelStyle}
                multiple={false}
              />
            </div>

            <List
              onItemClick={this.handleItem}
              innerDivStyle={listInnerDivStyle}
              className="drawer-list-style"
              items={role === "citizen" ? this.citizenItemsPartTwo.items : this.employeeItemsPartTwo.items}
              listContainerStyle={{ background: "#ffffff" }}
              listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
            />
            <div className="drawer-image-cont">
              <Image className="mseva-logo" source={`${logoMseva}`} />
            </div>
          </div>
        </Drawer>
        {/* Logout Section */}
        <Dialog
          open={logoutPopupOpen}
          children={[
            <div style={logoutContentStyle} key={"logout-popup"}>
              <div className="logout-label">
                <Label label={"CORE_COMMON_LOGOUT"} bold={true} color="#484848" fontSize="16px" labelStyle={{ marginBottom: "24px" }} />
                <Label label={"CORE_LOGOUTPOPUP_CONFIRM"} labelStyle={{ marginBottom: "32px" }} />
              </div>
              <div className="logout-button">
                <Button
                  id="logout-no-button"
                  className="logout-no-button"
                  label={<Label buttonLabel={true} label={"CORE_LOGOUTPOPUP_NO"} />}
                  backgroundColor={"#969696"}
                  onClick={this.handleNo}
                />
                <Button
                  id="logout-yes-button"
                  className="logout-yes-button"
                  label={<Label buttonLabel={true} label={"CORE_LOGOUTPOPUP_YES"} />}
                  primary={true}
                  onClick={this.handleYes}
                />
              </div>
            </div>,
          ]}
          handleClose={this.handleLogoutClose}
        />
      </div>
    );
  }
}

export default connect(null, { fetchLocalizationLabel })(HeaderWithDrawer);
