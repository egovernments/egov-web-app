import React, { Component } from "react";
import { Label, List, Icon } from "components";
import { Screen } from "modules/common";

const PTList = ({ items, label }) => {
  return (
    <Screen>
      <Label
        label={label}
        containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
        dark={true}
        bold={true}
        labelStyle={{ letterSpacing: 0 }}
        fontSize={"20px"}
      />
      <List
        items={items}
        listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
        listContainerStyle={{ marginLeft: "16px" }}
      />
    </Screen>
  );
};

export default PTList;
