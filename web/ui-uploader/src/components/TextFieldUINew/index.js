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
    marginRight: theme.spacing.unit,
    fontSize: "14px"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  inputLabelStyles: {
    color: "blue"
  },
  inputStyles: {
    fontSize: 14
  }
});

class TextFieldUi extends React.Component {
  render() {
    const {
      classes,
      onChange,
      value,
      label,
      placeholder,
      ...rest
    } = this.props;

    // const labelProperty = {
    //   // floatingLabelFixed: true,
    //   InputLabelProps: {
    //     shrink: true,
    //     classes: {
    //       label: styles.inputLabelStyles
    //     }
    //   },
    //   resize: {
    //     fontSize: 50
    //   }
    // };

    return (
      <TextField
        label={label}
        placeholder={placeholder}
        InputProps={{ classes: { input: classes.inputStyles } }}
        InputLabelProps={{
          shrink: true,
          style: { color: "red" },
          classes: { root: classes.inputStyles }
        }}
        underlineShow={false}
        value={value}
        onChange={onChange}
        fullWidth={true}
        {...rest}
      />
    );
  }
}

// const TextFieldUi = ({ onChange, value, label, placeholder, ...rest }) => {
//   const labelProperty = {
//     // floatingLabelFixed: true,
//     InputLabelProps: {
//       shrink: true,
//       classes: {
//         label: styles.inputLabelStyles
//       }
//     },

//     InputProps: {
//       classes: {
//         input: styles.inputStyles
//       }
//     }

//     // floatingLabelStyle: {
//     //   color: "#696969",
//     //   fontSize: "20px",
//     //   whiteSpace: "nowrap"
//     // }
//     // floatingLabelText: <span>{label} </span>
//   };

//   return (
//     <TextField
//       //   className="custom-form-control-for-textfield"

//       {...labelProperty}
//       label={label}
//       placeholder={placeholder}
//       InputClassName={classes.inputStyles}
//       underlineShow={false}
//       value={value}
//       onChange={onChange}
//       fullWidth={true}
//       {...rest}
//     />
//   );
// };

export default withStyles(styles)(TextFieldUi);
