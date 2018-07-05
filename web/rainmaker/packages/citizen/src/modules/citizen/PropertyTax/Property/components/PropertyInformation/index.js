import React from "react";
import { Icon, Receipt, Button } from "components";
import PropertyItems from "./propertyitems";

let { propertyAddressItems, assessmentItems, ownershipItems } = PropertyItems;

const className = "col-xs-12 col-xs-6";

const PropertyInformation = [
  {
    primaryText: "Property Address",
    leftIcon: <Icon action="action" name="home" />,
    secondaryText: <Receipt receiptItems={propertyAddressItems} innerDivClass={className} />,
  },
  {
    primaryText: "Assessment Information",
    leftIcon: <Icon action="action" name="assignment" />,
    secondaryText: <Receipt receiptItems={assessmentItems} innerDivClass={className} />,
  },
  {
    primaryText: "Ownership Information",
    leftIcon: <Icon action="social" name="person" />,
    secondaryText: (
      <div style={{ height: "inherit" }}>
        <Receipt receiptItems={ownershipItems} innerDivClass={className} />
        <Button
          className="employee-complaint-summary-mapBtn"
          primary={true}
          label="ACCESS & PAY"
          style={{
            height: 36,
            lineHeight: "auto",
            minWidth: "inherit",
          }}
          labelStyle={{
            padding: "0 12px 0 0 ",
            letterSpacing: "0.6px",
            display: "inline-block",
            height: "22px",
            lineHeight: "22px",
            fontSize: "14px",
          }}
          onClick={(e) => {
            // this.props.redirectToMap(true);
          }}
        />
      </div>
    ),
  },
];

export default PropertyInformation;
