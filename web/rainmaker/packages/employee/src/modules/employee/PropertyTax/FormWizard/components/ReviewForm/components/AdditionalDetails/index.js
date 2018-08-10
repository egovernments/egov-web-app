// import React from "react";
// import { RadioButton, Card, Icon, TextField } from "components";
// import Label from "egov-ui-kit/utils/translationNode";

// const options = [
//   { value: "Full Amount", label: <Label label="Full Amount" color="#4848484" /> },
//   { value: "Partial Amount", label: <Label label="Partial Amount" color="#4848484" /> },
// ];
// const styles = {
//   labelStyle: {
//     color: "#484848",
//     letterSpacing: 0.7,
//     marginLeft: 5,
//   },

//   radioButtonItemStyle: {
//     marginBottom: "18px",
//     paddingLeft: "2px",
//     height: "16px",
//   },
//   selectedLabelStyle: {
//     color: "#fe7a51",
//   },
//   radioButtonLabelStyle: {
//     lineHeight: 1,
//     marginBottom: 8,
//   },
// };

// const AdditionalDetails = ({ optionSelected, handleOptionChange, onRadioButtonChange, value }) => {
//   return (
//     <Card
//       className="tax-calculation-card-header"
//       textChildren={
//         <div>
//           <div className="rainmaker-displayInline" style={{ marginTop: 10 }}>
//             <Icon action="custom" name="rupee" />
//             <Label label="Amount to be Paid" fontSize={16} bold={true} labelStyle={styles.labelStyle} />
//           </div>
//           <div className="clearfix">
//             <div className="col-sm-6" style={{ paddingTop: 30 }}>
//               <RadioButton
//                 id="gender-selection"
//                 name="gender-selection"
//                 options={options}
//                 className={"owner-gender-selection"}
//                 valueSelected={optionSelected}
//                 handleChange={handleOptionChange}
//                 radioButtonItemStyle={styles.radioButtonItemStyle}
//                 labelStyle={styles.radioButtonLabelStyle}
//                 selectedLabelStyle={styles.selectedLabelStyle}
//               />
//             </div>
//             <div className="col-sm-6">
//               <TextField
//                 id="amount-to-be-paid"
//                 onChange={(e, value) => onRadioButtonChange(e)}
//                 value={value}
//                 fullWidth={true}
//                 hintText="Enter amount"
//                 floatingLabelText="Amount to pay (INR)"
//               />
//             </div>
//           </div>
//           {optionSelected &&
//             optionSelected === "Partial Amount" && (
//               <div className="rainmaker-displayInline" style={{ padding: "12px 0px 12px 12px", backgroundColor: "#f2f2f2", marginTop: 10 }}>
//                 <Icon action="action" name="info" />
//                 <Label
//                   containerStyle={{ marginLeft: 16 }}
//                   fontSize="14px"
//                   color="#484848"
//                   label="Please inform the citizen that they will not be eligible for a rebate if a partial amount is being paid. The rebate will be applied if the pending amount is paid before 31.12.17"
//                 />
//               </div>
//             )}
//         </div>
//       }
//     />
//   );
// };

// export default AdditionalDetails;

import React from "react";
import { Card, Icon } from "components";
import TextField from "material-ui/TextField";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

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
  },
};
const inputBaseStyle = {
  paddingBottom: 10,
  fontSize: "16px",
  color: "#484848",
  letterSpacing: "0.7px",
};
const floatingLabelBaseStyle = {
  top: 30,
  fontSize: "14px",
  letterSpacing: "0.6px",
};
const AdditionalDetails = ({ optionSelected, handleFieldChange, onRadioButtonChange, value, errorText }) => {
  // const { totalAmount } = estimationDetails[0] || {};
  // const AmountToBePaid = optionSelected === "Partial_Amount" ? 0 : totalAmount
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
              <div className="property-amount-radio">
                <div className="amt-radio">
                  <input
                    style={{ marginRight: "4px 8px 0px 0px" }}
                    type="radio"
                    checked={optionSelected === "Full_Amount"}
                    onClick={onRadioButtonChange}
                    value="Full_Amount"
                    name="radio"
                  />
                  <Label label="Full Amount" color="#4848484" labelStyle={styles.radioButtonLabelStyle} />
                </div>
                <div className="amt-radio">
                  <input
                    style={{ marginRight: "4px 8px 0px 0px" }}
                    type="radio"
                    checked={optionSelected === "Partial_Amount"}
                    onClick={onRadioButtonChange}
                    value="Partial_Amount"
                    name="radio"
                  />
                  <Label label="Partial Amount" color="#4848484" labelStyle={styles.radioButtonLabelStyle} />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <TextField
                id="amount-to-be-paid"
                onChange={(e, value) => handleFieldChange(e, value)}
                value={value}
                floatingLabelText="Amount to pay (INR)"
                floatingLabelShrinkStyle={{
                  fontSize: "12px",
                  color: "#00bcd1",
                  transform: "scale(1) translate(0px, -16px)",
                  fontWeight: 500,
                  zIndex: 0,
                }}
                floatingLabelFixed={true}
                inputStyle={inputBaseStyle}
                floatingLabelStyle={floatingLabelBaseStyle}
                underlineFocusStyle={{ borderColor: "#e0e0e0" }}
                disabled={optionSelected === "Full_Amount"}
                errorText={errorText}
              />
            </div>
          </div>
          {optionSelected &&
            optionSelected === "Partial_Amount" && (
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
