import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { httpRequest } from "egov-ui-kit/utils/api";
import { createReceiptDetails } from "../../../PaymentStatus/Components/createReceipt";
import generateReceipt from "../../../PaymentStatus/Components/receiptsPDF";
import React from "react";
import get from "lodash/get";

const styles = {
  customWidth: {
    width: 120,
    backgroundColor: "#F0F0F0",
    height: "25px",
    paddingLeft: "10px",
  },
  iconStyle: { top: "-13px", fill: "#484848", width: "35px" },
  underlineStyle: { display: "none" },
  hintStyle: { color: "#484848", top: 0 },
};

const onSelectFieldChange = (event, key, payload, history, item, generalMDMSDataById) => {
  switch (payload) {
    case "Re-Assess":
      localStorage.setItem("draftId", "");
      history &&
        history.push(
          `/property-tax/assessment-form?FY=${item.financialYear}&assessmentId=${item.assessmentNo}&isReassesment=true&propertyId=${
            item.propertyId
          }&tenantId=${item.tenantId}`
        );
      break;
    case "Download Receipt":
      //Need 1. Property, 2. Property Details, 3. receiptdetails
      // call receiptcreate func
      downloadReceipt(item, generalMDMSDataById);
      break;
    case "Download Citizen Receipt":
      downloadReceipt(item, generalMDMSDataById);
      break;
    case "Download Employee Receipt":
      downloadReceipt(item, generalMDMSDataById, true);
      break;
    case "Complete Payment":
      localStorage.setItem("draftId", "");
      history &&
        history.push(
          `/property-tax/assessment-form?FY=${item.financialYear}&assessmentId=${item.assessmentNo}&isReassesment=true&propertyId=${
            item.propertyId
          }&tenantId=${item.tenantId}`
        );
      break;
  }
};

const downloadReceipt = async (item, generalMDMSDataById, isEmployeeReceipt) => {
  const queryObj = [{ key: "tenantId", value: item.tenantId }, { key: "consumerCode", value: item.consumerCode }];

  try {
    const payload = await httpRequest("/collection-services/receipts/_search", "_search", queryObj, {}, [], { ts: 0 });
    const totalAmountToPay = payload && payload.Receipt && get(payload.Receipt[payload.Receipt.length - 1], "Bill[0].billDetails[0].totalAmount");
    const receiptDetails =
      payload &&
      payload.Receipt &&
      createReceiptDetails(item.property, item.propertyDetails, payload.Receipt[0], item.localizationLabels, item.cities, totalAmountToPay);
    receiptDetails && generateReceipt("pt-reciept-citizen", receiptDetails, generalMDMSDataById, "", isEmployeeReceipt);
  } catch (e) {
    console.log(e);
  }
};

const DropDown = ({ history, item, generalMDMSDataById }) => {
  const userType = localStorage.getItem("user-info") && JSON.parse(localStorage.getItem("user-info")).type;
  return (
    <div>
      <SelectField
        autoWidth={true}
        className="pt-action-dropDown"
        hintText={"Select action"}
        underlineStyle={styles.underlineStyle}
        iconStyle={styles.iconStyle}
        style={styles.customWidth}
        hintStyle={styles.hintStyle}
        onChange={(event, key, payload) => onSelectFieldChange(event, key, payload, history, item, generalMDMSDataById)}
      >
        {userType === "CITIZEN" && <MenuItem value="Download Receipt" primaryText="Download Receipt" />}
        {userType === "EMPLOYEE" && <MenuItem value="Download Citizen Receipt" primaryText="Download Citizen Receipt" />}
        {userType === "EMPLOYEE" && <MenuItem value="Download Employee Receipt" primaryText="Download Employee Receipt" />}
        <MenuItem value="Re-Assess" primaryText="Re-Assess" />
        {item.status === "Partially Paid" && <MenuItem value="Complete Payment" primaryText="Complete Payment" />}
      </SelectField>
    </div>
  );
};

export default DropDown;
