import React from "react";
import { Receipt, Icon, Divider, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";
import PropertyItems from "./propertyitems";

let { propertyAddressItems, assessmentItems, ownershipItems } = PropertyItems;

const className = "col-xs-12 col-xs-6";

const ReceiptItems = () => {
  return (
    <div style={{ marginLeft: 20 }}>
      {/* <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} /> */}
      <div>
        <div className="receipt-displayInline">
          <Icon action="action" name="home" color="#767676" />
          <Label label="Property Information" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
        </div>
        <Receipt receiptItems={propertyAddressItems} innerDivClass={className} />
      </div>
      <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 10, marginRight: 0 }} />
      <div>
        <div className="receipt-displayInline">
          <Icon action="action" name="assignment" color="#767676" />
          <Label label="Assessment Information" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
        </div>
        <Receipt receiptItems={assessmentItems} innerDivClass={className} />
      </div>
      <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 10, marginRight: 0 }} />
      <div>
        <div className="receipt-displayInline">
          <Icon action="social" name="person" color="#767676" />
          <Label label="Ownership Information" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
        </div>
        <Receipt receiptItems={ownershipItems} innerDivClass={className} />
      </div>
      <div className="text-center">
        <Button
          className="receipt-button"
          primary={true}
          label={<Label buttonLabel={true} label="ACCESS & PAY" />}
          style={{
            height: 36,
            lineHeight: "auto",
            minWidth: "inherit",
          }}
          labelStyle={{
            padding: "0 12px 0 12px ",
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
    </div>
  );
};

export default ReceiptItems;
