import React from "react";
import PropTypes from "prop-types";
// import TextField from "material-ui/TextField";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const TextFieldUi = ({ onChange, value, label, placeholder }) => {
  console.log("sudhanshu123", this.props);
  const labelProperty = {
    // floatingLabelFixed: true,
    InputLabelProps: {
      shrink: true
    }

    // floatingLabelStyle: {
    //   color: "#696969",
    //   fontSize: "20px",
    //   whiteSpace: "nowrap"
    // }
    // floatingLabelText: <span>{label} </span>
  };

  return (
    <TextField
      //   className="custom-form-control-for-textfield"
      {...labelProperty}
      label={label}
      placeholder={placeholder}
      underlineShow={false}
      value={value}
      onChange={onChange}
      fullWidth={true}
    />
  );
};

export default withStyles(styles)(TextFieldUi);
