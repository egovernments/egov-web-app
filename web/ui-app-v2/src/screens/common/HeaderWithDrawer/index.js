import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List, ProfileSection, PoweredBy } from "../../../components";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionHome from "material-ui/svg-icons/action/home";
import Info from "material-ui/svg-icons/action/info";
import Logout from "material-ui/svg-icons/action/power-settings-new";
import Language from "material-ui/svg-icons/action/language";
import Profile from "material-ui/svg-icons/social/person";
import profileImage from "../../../assets/people1.png";
import poweredByLogo from "../../../assets/images/logo.png";
import "./index.css";
//App bar imports ends

const style = { borderRadius: "50%", width: 89, height: 88, margin: "0 auto" };
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
  fontWeight: 500,
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
  // display: 'none'
};

const _label_Name = "Name";
const _label_Location = "Location";

const items = [
  {
    primaryText: "Home",
    leftIcon: <ActionHome />,
  },
  {
    primaryText: "Profile",
    leftIcon: <Profile />,
  },
  {
    primaryText: "Language",
    leftIcon: <Language />,
  },
  {
    primaryText: "About",
    leftIcon: <Info />,
  },
  {
    primaryText: "How it Works",
    leftIcon: <ContentInbox />,
  },
  {
    primaryText: "Logout",
    leftIcon: <Logout />,
  },
];

class HeaderWithDrawer extends Component {
  render() {
    let { onHandleToggleMenu, onUpdateMenuStatus, toggleMenu } = this.props;
    return (
      <div>
        <AppBar
          title={`Mseva/ Home`}
          iconElementRight={
            <Badge badgeContent={10} secondary={true} badgeStyle={{ top: 2, right: 2 }} style={{ padding: "0" }}>
              <IconButton tooltip="Notifications" onClick={() => {}}>
                <NotificationsIcon color={"white"} />
              </IconButton>
            </Badge>
          }
          onLeftIconButtonClick={onHandleToggleMenu}
          style={{
            background: "linear-gradient(#56ccf2, #2f80ed)",
            overflowX: "hidden",
            width: "initial",
          }}
        />

        <Drawer docked={false} width={304} open={toggleMenu} onRequestChange={(open) => onUpdateMenuStatus(open)}>
          <ProfileSection
            imgStyle={style}
            cardStyles={cardStyles}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
            name={_label_Name}
            location={_label_Location}
            iconStyle={iconStyle}
            imgSrc={profileImage}
          />
          <div className="headerWithDrawer-list-poweredBy-wrapper">
            <List items={items} listContainerStyle={{ background: "#ffffff" }} listItemStyle={{ borderBottom: "1px solid #e0e0e0" }} />
            <PoweredBy
              divProps={{
                style: {
                  textAlign: "center",
                  marginTop: "8%",
                  marginBottom: "4%",
                },
              }}
              image={{
                source: poweredByLogo,
                style: {
                  display: "block",
                  margin: "0 auto",
                },
              }}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default HeaderWithDrawer;
