import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
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

const PAIDdropDownData = [
  {
    label: "Download Statement",
    value: "Download Statement",
  },
  {
    label: "Re-Assess",
    value: "Re-Assess",
  },
];

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

//value={this.state.value} onChange={this.handleChange}

const DropDown = ({ value, handleChange }) => {
  return (
    <SelectField
      autoWidth={true}
      className="pt-action-dropDown"
      hintText={"Select action"}
      underlineStyle={styles.underlineStyle}
      iconStyle={styles.iconStyle}
      style={styles.customWidth}
      hintStyle={styles.hintStyle}
    >
      <MenuItem value="Download Statement" primaryText="Download Statement" />
      <MenuItem value="Re-Assess" primaryText="Re-Assess" />
    </SelectField>
  );
};

export default DropDown;
