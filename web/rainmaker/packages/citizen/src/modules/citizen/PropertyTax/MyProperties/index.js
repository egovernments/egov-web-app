import React, { Component } from "react";
import { Label, List, Icon } from "components";
import { Screen } from "modules/common";

class MyProperties extends Component {
  constructor(props) {
    super(props);
  }

  status = "Payment pending";

  items = [
    {
      primaryText: <Label label="E2/14, Hari Nagar" fontSize="16px" color="#484848" />,
      leftIcon: <Icon action="action" name="home" />,
      //   rightIcon: (
      //     <div className="rainmaker-displayInline">
      //       <Icon action="alert" name="warning" />
      //       <Label label="Payment pending" />
      //     </div>
      //   ),
    },
    {
      primaryText: <Label label="P9/2, Bellandur" fontSize="16px" color="#484848" />,
      leftIcon: <Icon action="action" name="home" />,
    },
  ];

  render() {
    return (
      <Screen>
        <Label
          label="My Properties"
          containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
        <List
          items={this.items}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
          listContainerStyle={{ marginLeft: "16px" }}
        />
      </Screen>
    );
  }
}

export default MyProperties;
