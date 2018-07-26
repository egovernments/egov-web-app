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

const PaymentStatus = ({ receiptDetails, floatingButtonColor, icon, messages, buttons }) => {
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
                  <Label className="col-xs-6" label="Receipt No:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.ReceiptNo} />
                </div>
              )}
              {receiptDetails.TransactionID && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Property Tax Assessment ID: " />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.TransactionID} />
                </div>
              )}
              {receiptDetails.AssessmentNo && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Assessment No.:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.AssessmentNo} />
                </div>
              )}
              {receiptDetails.payedDate && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Date:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.payedDate} />
                </div>
              )}
              <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
              {receiptDetails.OwnerName && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Owner Name:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.OwnerName} />
                </div>
              )}
              {receiptDetails.OldPropertyID && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Old Property ID:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.OldPropertyID} />
                </div>
              )}
              {receiptDetails.PropertyAddress && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Property Address:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PropertyAddress} />
                </div>
              )}
              <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0 }} />
              {receiptDetails.PaymentTerm && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Payment Term:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PaymentTerm} />
                </div>
              )}
              {receiptDetails.PayableAmount && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Payable Amount:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.PayableAmount} />
                </div>
              )}
              {receiptDetails.AmountPaid && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Amount Paid:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.AmountPaid} />
                </div>
              )}
              {receiptDetails.AmountDue && (
                <div className="row pt-reciept-label">
                  <Label className="col-xs-6" label="Amount Due:" />
                  <Label className="col-xs-6" labelStyle={labelStyle} label={receiptDetails.AmountDue} />
                </div>
              )}
            </div>
          }
        />
        {receiptDetails.ReceiptNo && (
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
      <ActionFooter label1={buttons.button1} label2={buttons.button2} />
    </div>
  );
};

export default PaymentStatus;
