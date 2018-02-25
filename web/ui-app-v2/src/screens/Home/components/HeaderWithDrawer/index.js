import React, { Component } from "react";
//App bar imports starts
import { AppBar, Drawer, List } from "../../../../components";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";
import NotificationsIcon from "material-ui/svg-icons/social/notifications";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ActionInfo from "material-ui/svg-icons/action/info";
import Avatar from "material-ui/Avatar";
//App bar imports ends

const items = [
  {
    primaryText: "Inbox",
    leftIcon: <ContentInbox />
  },
  {
    primaryText: "Starred",
    leftIcon: <ActionGrade />
  },
  {
    primaryText: "Sent Mail",
    leftIcon: <ContentSend />
  },
  {
    primaryText: "Drafts",
    leftIcon: <ContentDrafts />,
    initiallyOpen: false,
    primaryTogglesNestedList: true,
    style: {
      borderBottom: "none"
    },
    nestedItems: [
      {
        primaryText: "Inbox",
        leftIcon: <ContentInbox />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />
      },
      {
        primaryText: "Starred",
        leftIcon: <ActionGrade />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />
      },
      {
        primaryText: "Sent Mail",
        leftIcon: <ContentSend />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />
      }
    ]
  }
];

class HeaderWithDrawer extends Component {
  render() {
    let {onHandleToggleMenu,onUpdateMenuStatus,toggleMenu}=this.props;
    return (
      <div>
          <AppBar
            title={`Mseva/ Home`}
            iconElementRight={
              <Badge
                badgeContent={10}
                secondary={true}
                badgeStyle={{ top: 2, right: 2 }}
                style={{ padding: "0" }}
              >
                <IconButton
                  tooltip="Notifications"
                  onClick={() => {
                    alert("hai");
                  }}
                >
                  <NotificationsIcon color={"white"} />
                </IconButton>
              </Badge>
            }
            onLeftIconButtonClick={onHandleToggleMenu}
          />

        <Drawer
          docked={false}
          width={304}
          open={toggleMenu}
          onRequestChange={open => onUpdateMenuStatus(open) }
        >
          <List
            items={items}
            listContainerStyle={{ background: "#ffffff" }}
            listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
          />
        </Drawer>
      </div>
    );
  }
}

export default HeaderWithDrawer;
