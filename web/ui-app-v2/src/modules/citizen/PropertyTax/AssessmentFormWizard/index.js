import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, TimeLine, Card, Icon } from "components";
import Label from "utils/translationNode";
import OwnerDetails from "./components/OwnerDetails";
import PropertyAddress from "./components/PropertyAddress";
import TaxAssessmentDetailsOne from "./components/TaxAssessmentDetailsOne";
import TaxAssessmentDetailsTwo from "./components/TaxAssessmentDetailsTwo";
import FullOrPartialExemption from "./components/FullOrPartialExemption";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import "./index.css";

const iconStyle = {
  display: "inline-block",
};

const activeStepperStyle = {
  width: 20,
  height: 20,
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  backgroundColor: "#fe7a51",
  borderRadius: "50%",
  position: "relative",
  zIndex: 100,
};

const defaultStepperStyle = {
  width: 18,
  height: 18,
};

class AssessmentFormWizard extends React.Component {
  constructor(props) {
    super(props);
    let isBackFromMap = sessionStorage.getItem("backFromPTMap");
    this.state = {
      stepIndex: isBackFromMap ? 1 : 0,
    };
    isBackFromMap && sessionStorage.removeItem("backFromPTMap");

    this.wizardFields = [
      ["name", "fatherHusbandName", "aadharNumber", "mobileNumber", "address"],
      ["propertyNumber", "colony", "street", "location"],
      ["propertyType", "plotSize", "floorCount"],
      ["builtUpArea1", "builtUpArea2"],
      ["propertcategoryNumber", "referenceId", "proof"],
    ];

    this.formConfig = require(`config/forms/${props.formKey}`).default;
  }

  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  handleFieldChange = (formKey) => (fieldKey, value) => {
    this.props.handleFieldChange(formKey, fieldKey, value);
  };

  getWizardFields = (index, formFields) => {
    const fields = this.wizardFields[index];
    return fields.reduce((wizardFields, fieldKey) => {
      const field = formFields[fieldKey];
      wizardFields[fieldKey] = field;
      return wizardFields;
    }, {});
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 5) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent = (stepIndex, formKey, fields) => {
    const wizardFields = this.getWizardFields(stepIndex, fields);
    const handleFieldChange = this.handleFieldChange(formKey);
    switch (stepIndex) {
      case 0:
        return {
          component: <OwnerDetails handleFieldChange={handleFieldChange} fields={wizardFields} />,
          trianglePos: "2%",
          iconName: "person",
          iconAction: "social",
          header: "Owner Details",
        };
      case 1:
        return {
          component: <PropertyAddress handleFieldChange={handleFieldChange} fields={wizardFields} />,
          trianglePos: "25%",
          iconName: "home",
          iconAction: "action",
          header: "Property Address",
        };
      case 2:
        return {
          component: <TaxAssessmentDetailsOne handleFieldChange={handleFieldChange} fields={wizardFields} />,
          trianglePos: "48%",
          iconName: "person",
          iconAction: "social",
          header: "Tax Assessment Details - 1",
        };
      case 3:
        return {
          component: <TaxAssessmentDetailsTwo handleFieldChange={handleFieldChange} fields={wizardFields} />,
          trianglePos: "70%",
          iconName: "person",
          iconAction: "social",
          header: "Tax Assessment Details - 2",
        };
      default:
        return {
          component: <FullOrPartialExemption handleFieldChange={handleFieldChange} fields={wizardFields} />,
          trianglePos: "93%",
          iconName: "person",
          iconAction: "social",
          header: "Full/ Partial Exemption (if any)",
        };
    }
  };

  render() {
    const { finished, stepIndex } = this.state;
    const { getStepContent } = this;
    const { formKey, form, loading, handleFieldChange } = this.props;
    const fields = form.fields || {};
    const { component, iconAction, header, iconName, trianglePos } = getStepContent(stepIndex, formKey, fields);

    const steps = [1, 2, 3, 4, 5].map((item, index) => {
      return {
        labelChildren: "",
        labelProps: {
          icon:
            this.state.stepIndex === index ? (
              <div style={activeStepperStyle} />
            ) : this.state.stepIndex > index ? (
              <Icon style={defaultStepperStyle} color="#ffffff" action="custom" name="check-circle" />
            ) : (
              <Icon style={defaultStepperStyle} color="#ffffff" action="custom" name="circle" />
            ),
          style: {
            padding: 0,
          },
          iconContainerStyle: {
            padding: 0,
            display: "flex",
          },
        },
      };
    });

    return (
      <div>
        <TimeLine
          stepperProps={{
            activeStep: stepIndex,
            style: { background: "rgb(0, 188, 209)", position: "relative", zIndex: 10000, padding: "0 24px" },
            connector: <div style={{ border: "1px solid #fff", width: "100%", marginLeft: "-2px", marginRight: "4px" }} />,
          }}
          steps={steps}
          horizontal={true}
        />

        <div>
          <Card
            style={{ margin: "24px 8px" }}
            textChildren={
              <div style={{ position: "relative" }}>
                <div style={{ left: trianglePos }} className="card-triangle" />
                <div className="pt-form-card-header-cont">
                  <Icon name={iconName} action={iconAction} style={iconStyle} />
                  <Label
                    label={header}
                    bold={true}
                    dark={true}
                    labelStyle={{ letterSpacing: 0.6 }}
                    containerStyle={{ display: "inline-block", marginLeft: 16 }}
                  />
                </div>
                {component}
              </div>
            }
          />
          <div className="flexbox-container">
            <div className="flex-item">
              <Button onClick={this.handlePrev} fullWidth={true} primary={true} label="GO BACK" />
            </div>
            <div className="flex-item">
              <Button onClick={this.handleNext} fullWidth={true} label="NEXT" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "propertyTaxAssessment";
  const form = state.form[formKey] || {};
  const { loading } = form || false;
  return { form, formKey, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssessmentFormWizard);
