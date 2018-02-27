import React, { Component } from "react";
import { List, Card } from "../../../../components";

import ContentInbox from "material-ui/svg-icons/content/inbox";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentSend from "material-ui/svg-icons/content/send";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ActionInfo from "material-ui/svg-icons/action/info";
import Avatar from "material-ui/Avatar";

import NewComplaint from "material-ui/svg-icons/notification/sms-failed";

const items = [
  {
    primaryText: "COMPLAINT DETAILS",
    leftIcon: <NewComplaint />,
    initiallyOpen: false,
    primaryTogglesNestedList: true,
    nestedItems: [
      {
        primaryText: "Inbox",
        leftIcon: <ContentInbox />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />,
      },
      {
        primaryText: "Starred",
        leftIcon: <ActionGrade />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />,
      },
      {
        primaryText: "Sent Mail",
        leftIcon: <ContentSend />,
        rightAvatar: <Avatar src="http://via.placeholder.com/150x150" />,
      },
    ],
  },
];

class Details extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          textChildren={<List items={items} />}
        />
      </div>
    );
  }
}

export default Details;
