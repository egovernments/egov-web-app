import React from "react";
import { Card, Divider } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { ActionFooter } from "modules/common";
import FloatingActionButton from "material-ui/FloatingActionButton";
import generateReceipt from "./Components/receiptsPDF";
import "./index.css";

const labelStyle = {
  fontWeight: 500,
};

const PaymentStatus = ({ receiptUIDetails, receiptDetails, floatingButtonColor, icon, messages, buttons }) => {
  return (
    <div>
      <div style={{ marginBottom: "50px" }} className="col-md-offset-4 col-lg-offset-4 col-md-4 col-lg-4">
        <Card
          className="pt-success-receipt "
          textChildren={
            <div className="pt-reciept-top-cont">
              <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={floatingButtonColor}>
                {icon}
              </FloatingActionButton>
              <Label
                containerStyle={{ paddingTop: "30px" }}
                fontSize={16}
                label={messages.Message1}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
              <Label
                containerStyle={{ paddingTop: "10px" }}
                fontSize={16}
                label={messages.Message2}
                labelStyle={{ color: "#484848", fontWeight: 500 }}
              />
            </div>
          }
        />
        <Card
          className="pt-success-receipt"
          textChildren={
            <div>
              {receiptUIDetails &&
                receiptUIDetails.propertyInfo &&
                receiptUIDetails.propertyInfo.map((item) => {
                  return (
                    <div className="row pt-reciept-label">
                      <Label className="col-xs-6" label={item.key} />
                      <Label className="col-xs-6" labelStyle={labelStyle} label={item.value} />
                    </div>
                  );
                })}
              <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
              {receiptUIDetails &&
                receiptUIDetails.receiptInfo &&
                receiptUIDetails.receiptInfo.map((item) => {
                  return (
                    <div className="row pt-reciept-label">
                      <Label className="col-xs-6" label={item.key} />
                      <Label className="col-xs-6" labelStyle={labelStyle} label={item.value} />
                    </div>
                  );
                })}
            </div>
          }
        />
        {receiptDetails &&
          receiptDetails.ReceiptNo && (
            <div
              onClick={() => {
                generateReceipt("pt-reciept-citizen", receiptDetails);
              }}
            >
              <Label
                label="DOWNLOAD RECEIPT"
                color="#fe7a51"
                labelStyle={{ textAlign: "center", fontWeight: 500, fontSize: "16px", cursor: "pointer" }}
              />
            </div>
          )}
      </div>

      {/* {receiptDetails.printIcon &&
        receiptDetails.downloadIcon && (
          <div className="pt-success-receipt" style={{ alignItems: "center", paddingLeft: "8%", paddingRight: "8%", display: "flex" }}>
            <div>
              <Icon style={downloadIconStyle} id="receipt-download" className="receipt-download" action="action" name="print" />
              <Label label="Print Receipt" />
            </div>
            <div>
              <Icon style={printIconStyle} id="receipt-print" className="receipt-download" action="action" name="print" />
              <Label label="Print Receipt" />
            </div>
          </div>
        )} */}
      <ActionFooter label2={buttons.button2} />
    </div>
  );
};

export default PaymentStatus;
