import React from "react";
import { List, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const PTList = ({ items, history, label }) => {
  return (
    <div>
      {label && (
        <Label
          label={label}
          containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
      )}
      <Card
        textChildren={
          <List
            items={items}
            listItemStyle={{ marginLeft: "10px", borderBottom: "1px solid #e0e0e0" }}
            nestedListStyle={{ marginLeft: "60px", padding: "0px" }}
            primaryTogglesNestedList={true}
            onItemClick={(item, index) => {
              history && history.push(item.route);
            }}
          />
        }
      />
    </div>
  );
};

export default PTList;
