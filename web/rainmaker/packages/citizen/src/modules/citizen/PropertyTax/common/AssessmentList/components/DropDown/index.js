import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { httpRequest } from "egov-ui-kit/utils/api";
import createReceipt from "../../../PaymentStatus/Components/createReceipt";
import generateReceipt from "../../../PaymentStatus/Components/receiptsPDF";
import React from "react";

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

const PartiallyPaiddropDownData = [
  {
    label: "Download Statement",
    value: "Download Statement",
  },
  {
    label: "Re-Assess",
    value: "Re-Assess",
  },
  {
    label: "Complete Payment",
    value: "Complete Payment",
  },
];

const onSelectFieldChange = (event, key, payload, history, item) => {
  switch (payload) {
    case "Re-Assess":
      localStorage.setItem("draftId","");
      history &&
        history.push(
          `/property-tax/assessment-form?FY=${item.financialYear}&assessmentId=${item.assessmentNo}&isReassesment=true&propertyId=${item.propertyId}&tenantId=${item.tenantId}`
        );
        break;
    case "Download Statement":
      //Need 1. Property, 2. Property Details, 3. receiptdetails
      // call receiptcreate func
      downloadReceipt(item);
  }
};

const downloadReceipt = async (item) => {
  const queryObj = [{ key: "tenantId", value: item.tenantId }, { key: "consumerNo", value: item.consumerCode }];
  try {
    const payload = await httpRequest("/collection-services/receipts/_search", "_search", queryObj, {}, [], { ts: 0 });
    const receiptDetails =
      payload && payload.Receipt && createReceipt(item.property, item.propertyDetails, payload.Receipt[0], item.localizationLabels);
    receiptDetails && generateReceipt("pt-reciept-citizen", receiptDetails);
  } catch (e) {
    console.log(e);
  }
};

const DropDown = ({ history, item }) => {
  return (
    <SelectField
      autoWidth={true}
      className="pt-action-dropDown"
      hintText={"Select action"}
      underlineStyle={styles.underlineStyle}
      iconStyle={styles.iconStyle}
      style={styles.customWidth}
      hintStyle={styles.hintStyle}
      onChange={(event, key, payload) => onSelectFieldChange(event, key, payload, history, item)}
    >
      <MenuItem value="Download Statement" primaryText="Download Statement" />
      <MenuItem value="Re-Assess" primaryText="Re-Assess" />
    </SelectField>
  );
};

export default DropDown;
