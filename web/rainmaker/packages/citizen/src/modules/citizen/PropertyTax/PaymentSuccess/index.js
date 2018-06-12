import React from "react";
import { Card, Icon, Divider } from "components";
import { Screen } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
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

const receiptDetails = {
  ReceiptNo: "PT03-067-03-117",
  TransactionID: "AB-879-67",
  payedDate: "24.04.18",
  OwnerName: "Harishikesh Anand",
  PropertyID: "PID-78-567",
  Property: "EB-154, Maya Enclave Harinagar, KT Marg Amritsar - 53",
  PaymentTerm: "2017-18",
  AmountPaid: "1432.47",
};

const Reciept = () => {
  return (
    <Screen>
      <Card
        className="pt-success-receipt"
        textChildren={
          <div className="pt-reciept-top-cont">
            <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor="#22b25f">
              <Icon action="navigation" name="check" />
            </FloatingActionButton>
            <Label containerStyle={{ paddingTop: "30px" }} label="Thank you !" labelStyle={{ color: "#484848", fontWeight: 900 }} />
            <Label containerStyle={{ paddingTop: "10px" }} label="PT_RECEIPT_SUCCESS_MESSAGE" labelStyle={{ color: "#484848", fontWeight: 900 }} />
          </div>
        }
      />
      <Card
        className="pt-success-receipt"
        textChildren={
          <div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_RECEIPT_NO" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.ReceiptNo} />
            </div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_DATE" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.TransactionID} />
            </div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_DATE" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.payedDate} />
            </div>
            <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_OWNER_NAME" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.OwnerName} />
            </div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_PROPERTY" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PropertyID} />
            </div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_PROPERTY" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.Property} />
            </div>
            <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_PAYMENT_TERM" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PaymentTerm} />
            </div>
            <div className="row pt-reciept-label">
              <Label className="col-xs-6" label="PT_RECEIPT_AMOUNT_PAID" />
              <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.AmountPaid} />
            </div>
          </div>
        }
      />
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
    </Screen>
  );
};

export default Reciept;
