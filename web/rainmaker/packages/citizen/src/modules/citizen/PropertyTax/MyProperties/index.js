import React, { Component } from "react";
import { Label, Icon } from "components";
import PTList from "../common/PTList";
import { Screen } from "modules/common";

class MyProperties extends Component {
  properties = [
    {
      address: "E2/14, Hari Nagar",
      status: "Payment Pending",
      rightIcon: <Icon action="alert" name="warning" />,
    },
    {
      address: "P9/2, Bellandur",
      status: "",
      rightIcon: <Icon action="alert" name="warning" />,
    },
  ];

  getListItems = (properties) => {
    return properties.map((property, index) => {
      return {
        primaryText: <Label label={property.address} fontSize="16px" color="#484848" />,
        leftIcon: <Icon action="action" name="home" />,
      };
    });
  };

  render() {
    let { getListItems, properties } = this;
    return (
      <Screen>
        <PTList items={getListItems(properties)} label="My Properties" />
      </Screen>
    );
  }
}

export default MyProperties;
