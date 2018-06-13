import React from "react";
import { Card, Icon, Divider } from "components";
import { Screen } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import ActionFooter from "../ActionFooter";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./index.css";

const labelStyle = {
  fontWeight: 500,
};

const printIconStyle = {
  height: "40px",
  width: "40px",
  fill: "#767676",
};

const downloadIconStyle = {
  marginRight: 70,
  height: "40px",
  width: "40px",
  fill: "#767676",
};

const PaymentStatus = ({ receiptDetails, floatingButtonColor, icon, messages }) => {
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
              <Label containerStyle={{ paddingTop: "30px" }} label={messages.Message1} labelStyle={{ color: "#484848", fontWeight: 900 }} />
              <Label containerStyle={{ paddingTop: "10px" }} label={messages.Message2} labelStyle={{ color: "#484848", fontWeight: 900 }} />
            </div>
          }
        />
        <Card
          className="pt-success-receipt"
          textChildren={
            <div>
              {receiptDetails.ReceiptNo && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_RECEIPT_NO" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.ReceiptNo} />
                </div>
              )}
              {receiptDetails.TransactionID && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_DATE" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.TransactionID} />
                </div>
              )}
              {receiptDetails.payedDate && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_DATE" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.payedDate} />
                </div>
              )}
              <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
              {receiptDetails.OwnerName && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_OWNER_NAME" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.OwnerName} />
                </div>
              )}
              {receiptDetails.OwnerName && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_PROPERTY" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PropertyID} />
                </div>
              )}
              {receiptDetails.Property && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_PROPERTY" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.Property} />
                </div>
              )}
              <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
              {receiptDetails.PaymentTerm && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_PAYMENT_TERM" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PaymentTerm} />
                </div>
              )}
              {receiptDetails.AmountPaid && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_AMOUNT_PAID" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.AmountPaid} />
                </div>
              )}
              {receiptDetails.PropertyTaxDue && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="PT_RECEIPT_PROPERTY_TAX_DUE" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PropertyTaxDue} />
                </div>
              )}
            </div>
          }
        />
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
      <ActionFooter label1={receiptDetails.button1} label2={receiptDetails.button2} />
    </div>
  );
};

export default PaymentStatus;
