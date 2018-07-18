import React from "react";
import { List, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const PTList = ({ items, label, onItemClick, innerDivStyle }) => {
  return (
    <div className="form-without-button-cont-generic">
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
        className="property-tax-card"
        textChildren={
          <List
            innerDivStyle={innerDivStyle}
            items={items}
            listItemStyle={{ paddingLeft: "10px", borderBottom: "1px solid #e0e0e0" }}
            nestedListStyle={{ padding: "0px" }}
            primaryTogglesNestedList={true}
            onItemClick={onItemClick}
          />
        }
      />
    </div>
  );
};

export default PTList;
