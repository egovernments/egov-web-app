import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    marginTop: 0,
    paddingBottom: 0
  },
  group: {
    display: "inline-block",
    margin: 0
  },
  radioRoot: {
    marginBottom: 12
  }
});

class RadioButtonsGroup extends React.Component {
  handleChange = event => {
    const {
      screenKey,
      componentJsonpath,
      jsonPath,
      approveCheck,
      onFieldChange
    } = this.props;
    onFieldChange(
      screenKey,
      componentJsonpath,
      "props.value",
      event.target.value
    );
  };

  render() {
    const { label, classes, buttons, defaultValue, value } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={value || defaultValue}
            onChange={this.handleChange}
          >
            {buttons &&
              buttons.map((button, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={button}
                    control={
                      <Radio className={classes.radioRoot} color="primary" />
                    }
                    label={button}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { screenConfiguration } = state;
  const { jsonPath } = ownprops;
  const { preparedFinalObject } = screenConfiguration;
  return { preparedFinalObject, jsonPath };
};

const mapDispatchToProps = dispatch => {
  return {
    approveCheck: (jsonPath, value) => {
      dispatch(prepareFinalObject(jsonPath, value));
    }
  };
};

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RadioButtonsGroup)
);
