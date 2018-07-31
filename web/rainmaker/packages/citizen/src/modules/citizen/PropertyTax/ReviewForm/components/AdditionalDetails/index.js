import React from "react";
import { RadioButton, Card, Icon, TextField } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const options = [
  { value: "Full Amount", label: <Label label="Full Amount" color="#4848484" /> },
  { value: "Partial Amount", label: <Label label="Partial Amount" color="#4848484" /> },
];
const styles = {
  labelStyle: {
    color: "#484848",
    letterSpacing: 0.7,
    marginLeft: 5,
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#fe7a51",
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginBottom: 8,
  },
};

const AdditionalDetails = ({ optionSelected, handleOptionChange }) => {
  console.log(optionSelected);
  return (
    <Card
      className="tax-calculation-card-header"
      textChildren={
        <div>
          <div className="rainmaker-displayInline" style={{ marginTop: 10 }}>
            <Icon action="custom" name="rupee" />
            <Label label="Amount to be Paid" fontSize={16} bold={true} labelStyle={styles.labelStyle} />
          </div>
          <div className="clearfix">
            <div className="col-sm-6" style={{ paddingTop: 30 }}>
              <RadioButton
                id="gender-selection"
                name="gender-selection"
                options={options}
                className={"owner-gender-selection"}
                valueSelected={optionSelected}
                handleChange={handleOptionChange}
                radioButtonItemStyle={styles.radioButtonItemStyle}
                labelStyle={styles.radioButtonLabelStyle}
                selectedLabelStyle={styles.selectedLabelStyle}
              />
            </div>
            <div className="col-sm-6">
              <TextField id="amount-to-be-paid" fullWidth={true} hintText="Enter amount" floatingLabelText="Amount to pay (INR)" />
            </div>
          </div>
          {optionSelected &&
            optionSelected === "Partial Amount" && (
              <div className="rainmaker-displayInline" style={{ padding: "12px 0px 12px 12px", backgroundColor: "#f2f2f2", marginTop: 10 }}>
                <Icon action="action" name="info" />
                <Label
                  containerStyle={{ marginLeft: 16 }}
                  fontSize="14px"
                  color="#484848"
                  label="Payment of a partial amount does not qualify you for a rebate. Please pay the pending amount by 31.12.17 to avail a rebate of INR 108 on your Property Tax."
                />
              </div>
            )}
        </div>
      }
    />
  );
};

export default AdditionalDetails;
