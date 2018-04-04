import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List, ProfileSection, Image, ButtonGroup, Icon, Dialog, Button } from "../../../components";
import profileImage from "../../../assets/people1.png";
import logoMseva from "../../../assets/images/logo_black.png";
import Label from "utils/translationNode";
import "./index.css";
import { connect } from "react-redux";
import { fetchLocalizationLabel } from "redux/app/actions";

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

const _label_Location = "Amritsar";

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
    role: "employee",
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
        route: "/citizen/user/language-selection",
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
        primaryText: "Home",
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
        primaryText: "Closed Complaints",
        route: "/citizen/contact-us",
        leftIcon: <Icon action="custom" name="file-check" />,
        id: "header-closed-complaint",
      },
      {
        primaryText: "Employee Directory",
        route: "/citizen/contact-us",
        leftIcon: <Icon action="communication" name="call" />,
        style: {
          paddingBottom: "2px",
          paddingTop: "2px",
        },
        id: "header-contact-us",
      },

      {
        primaryText: "Edit Profile",
        route: "/citizen/user/profile",
        leftIcon: <Icon action="social" name="person" />,
        style: {
          paddingBottom: "3px",
          paddingTop: "3px",
        },
        id: "header-profile",
      },
      {
        primaryText: "Language",
        route: "/citizen/user/language-selection",
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
        primaryText: "Logout",
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
    const { onUpdateMenuStatus, toggleMenu, className, role, history, logout, ...appBarProps } = this.props;
    const userInfo = this.props.userInfo || {};
    return (
      <div>
        <AppBar className={className} titleStyle={{ fontSize: "20px", fontWeight: 500 }} {...appBarProps} />
        {/* Navigation Drawer */}
        <Drawer docked={false} width="85%" open={toggleMenu} onRequestChange={(open) => onUpdateMenuStatus(open)}>
          <ProfileSection
            imgStyle={style}
            cardStyles={cardStyles}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
            emailIdStyle={nameStyle}
            name={userInfo.name || ""}
            emailId={userInfo.emailId || ""}
            location={_label_Location}
            iconStyle={iconStyle}
            imgSrc={userInfo.photo || profileImage}
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
                  label={"NO"}
                  backgroundColor={"#969696"}
                  onClick={this.handleNo}
                  labelColor="#ffffff"
                />
                <Button
                  id="logout-yes-button"
                  className="logout-yes-button"
                  label={"YES"}
                  primary={true}
                  onClick={this.handleYes}
                  labelColor="#ffffff"
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
