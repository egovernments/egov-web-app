import React from "react";
import { List } from "components";

const PTList = ({ items, history }) => {
  return (
    /* <Label
        label={label}
        containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
        dark={true}
        bold={true}
        labelStyle={{ letterSpacing: 0 }}
        fontSize={"20px"}
      /> */
    <List
      items={items}
      listItemStyle={{ marginLeft: "10px", borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
      nestedListStyle={{ marginLeft: "60px", padding: "0px" }}
      primaryTogglesNestedList={true}
      onItemClick={(item, index) => {
        history.push("search-property");
      }}
    />
  );
};

export default PTList;
