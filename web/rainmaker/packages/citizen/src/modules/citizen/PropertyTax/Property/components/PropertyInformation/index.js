import React from "react";
import { Receipt, Icon, Divider, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";
import AssessmentInfoTable from "../AssessmentInfoTable";

const ReceiptItems = ({ items, propertyTaxAssessmentID, history, onButtonClick }) => {
  return (
    <div>
      <div className="rainmaker-displayInline" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div className="receipt-displayInline">
          <Icon action="action" name="assignment" color="#767676" />
          <Label
            bold={true}
            label={`Property Tax Assessment ID.: ${propertyTaxAssessmentID}`}
            containerStyle={{ marginLeft: "13px" }}
            labelStyle={{ letterSpacing: 0 }}
            color="#767676"
          />
        </div>
        <div className="receipt-displayInline text-right" style={{ cursor: "pointer", marginRight: 5 }}>
          <Button
            onClick={onButtonClick}
            label={<Label buttonLabel={true} label="PT_PAYMENT_ASSESS_AND_PAY" fontSize="12px" />}
            primary={true}
            style={{ height: 30, lineHeight: "auto", minWidth: "inherit" }}
          />
        </div>
      </div>
      <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
      <div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <div className="receipt-displayInline">
                  <Icon action={item.iconAction} name={item.iconName} color="#767676" />
                  <Label label={item.heading} containerStyle={{ marginLeft: "13px" }} bold={true} dark={true} labelStyle={{ letterSpacing: 0.6 }} />
                </div>
                {item.showTable ? (
                  <AssessmentInfoTable items={item.items} tableHeaderItems={item.tableHeaderItems} />
                ) : item.nestedItems ? (
                  item.items.map((nestedItem, nestedIndex) => {
                    return <Receipt receiptItems={nestedItem.items} header={item.items.length > 1 && `Owner ${nestedIndex + 1}`} />;
                  })
                ) : (
                  <Receipt receiptItems={item.items} />
                )}
              </div>
              {index < items.length - 1 && (
                <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReceiptItems;
