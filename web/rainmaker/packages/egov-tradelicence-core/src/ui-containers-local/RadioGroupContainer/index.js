import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import set from "lodash/set";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";

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
    marginBottom: 0
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: ""
  };
  componentDidMount = () => {
    const { defaultValue } = this.props;
    this.setState({
      value: defaultValue
    });
  };

  handleChange = event => {
    const { jsonPath, approveCheck } = this.props;
    this.setState({ value: event.target.value }, () => {
      approveCheck(jsonPath, this.state.value);
    });
  };

  render() {
    const { classes, buttons } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {buttons &&
              buttons.map((button, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    classes={{ label: "radio-button-label" }}
                    value={button}
                    control={
                      <Radio
                        classes={{
                          root: "radio-root"
                        }}
                        color="primary"
                      />
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
