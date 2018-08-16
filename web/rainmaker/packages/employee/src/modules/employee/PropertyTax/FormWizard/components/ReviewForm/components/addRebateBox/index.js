import React from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { TextField, Button, DropDown } from "components";
import { setFieldProperty, displayFormErrors } from "egov-ui-kit/redux/form/actions";
import { validateForm } from "egov-ui-kit/redux/form/utils";

const labelStyle = {
  fontFamily: "Roboto",
  fontSize: 16,
  fontWeight: 500,
  fontStyle: "normal",
  letterSpacing: 0.7,
  color: "#484848",
  marginLeft: 14,
};

class AddRebateExemption extends React.Component {
  state = {
    showExtraPenaltyField: false,
    showExtraExemptField: false,
    exemptValue: 0,
  };

  onChangePenaltyField = (value) => {
    let show = false;
    const { setFieldProperty } = this.props;
    if (value === "Others") {
      show = true;
      setFieldProperty("additionalRebate", "otherPenaltyReason", "required", true);
    } else {
      show = false;
      setFieldProperty("additionalRebate", "otherPenaltyReason", "required", false);
    }
    this.setState({
      showExtraPenaltyField: show,
    });
    this.props.handleFieldChange("adhocPenaltyReason", value);
  };
  onChangeExemptField = (value) => {
    let show = false;
    const { setFieldProperty } = this.props;
    if (value === "Others") {
      show = true;
      setFieldProperty("additionalRebate", "otherExemptionReason", "required", true);
    } else {
      show = false;
      setFieldProperty("additionalRebate", "otherExemptionReason", "required", false);
    }
    this.setState({
      showExtraExemptField: show,
    });
    this.props.handleFieldChange("adhocExemptionReason", value);
  };
  onSubmit = () => {
    const { updateEstimate, totalAmount, displayFormErrors, adhocExemption, adhocPenalty, additionalRebate } = this.props;
    if (adhocExemption.value > 0) {
      if (adhocExemption.value > totalAmount) {
        if (validateForm(additionalRebate)) {
          alert("Adhoc Exemption cannot be greater than the estimated tax for the given property");
        } else {
          displayFormErrors("additionalRebate");
        }
      } else {
        if (validateForm(additionalRebate)) {
          updateEstimate();
        } else {
          displayFormErrors("additionalRebate");
        }
      }
    }
    if (adhocPenalty.value > 0) {
      if (!validateForm(additionalRebate)) {
        displayFormErrors("additionalRebate");
      } else {
        updateEstimate();
      }
    }
  };

  render() {
    const { handleFieldChange, fields } = this.props;
    const { showExtraExemptField, showExtraPenaltyField } = this.state;
    const { adhocPenalty, adhocPenaltyReason, adhocExemption, adhocExemptionReason, otherExemptionReason, otherPenaltyReason } = fields || {};
    console.log(adhocPenalty, adhocPenaltyReason, adhocExemption, adhocExemptionReason, otherExemptionReason, otherPenaltyReason, fields);
    return (
      <div className="add-rebate-box">
        <div className="pt-emp-penalty-charges col-xs-12">
          <Label label="Additional Charges" className="rebate-box-labels" labelStyle={labelStyle} />
          <div className="adhocPenalty col-xs-6">
            <TextField onChange={(e, value) => handleFieldChange("adhocPenalty", value)} {...adhocPenalty} />
          </div>
          <div className="adhocPenaltyReason col-xs-6">
            <DropDown onChange={(e) => this.onChangePenaltyField(e.target.innerHTML)} {...adhocPenaltyReason} />
          </div>
          {showExtraPenaltyField && (
            <div className="col-xs-6">
              <TextField onChange={(e, value) => handleFieldChange("otherPenaltyReason", value)} fullWidth={true} {...otherPenaltyReason} />
            </div>
          )}
        </div>
        <div className="pt-emp-rebate-charges col-xs-12">
          <Label label="Additional Rebate" labelStyle={labelStyle} />
          <div className="adhocExemption col-xs-6">
            <TextField
              onChange={(e, value) => {
                handleFieldChange("adhocExemption", value);
                this.setState({ exemptValue: value });
              }}
              {...adhocExemption}
            />
          </div>
          <div className="adhocExemptionReason col-xs-6">
            <DropDown onChange={(e) => this.onChangeExemptField(e.target.innerHTML)} {...adhocExemptionReason} />
          </div>
          {showExtraExemptField && (
            <div className="col-xs-6">
              <TextField onChange={(e, value) => handleFieldChange("otherExemptionReason", value)} fullWidth={true} {...otherExemptionReason} />
            </div>
          )}
        </div>
        <div className="pt-rebate-box-btn">
          <Button
            primary={true}
            style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
            className="add-rebate-action-button"
            onClick={this.onSubmit}
            label={"SUBMIT"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form } = state;
  const { additionalRebate } = form;
  const { fields } = additionalRebate || {};
  const { adhocExemption, adhocPenalty } = (additionalRebate && additionalRebate.fields) || {};
  return { additionalRebate, fields, adhocExemption, adhocPenalty };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFieldProperty: (formKey, fieldKey, propertyName, propertyValue) => dispatch(setFieldProperty(formKey, fieldKey, propertyName, propertyValue)),
    displayFormErrors: (formKey) => dispatch(displayFormErrors(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRebateExemption);
