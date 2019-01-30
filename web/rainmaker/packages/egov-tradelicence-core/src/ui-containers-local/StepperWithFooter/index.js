import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from '@material-ui/core/Button';
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import { handleScreenConfigurationFieldChange as FieldPropertyChange } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { toggleSnackbarAndSetText } from "egov-ui-framework/ui-redux/app/actions";
import Icon from "egov-ui-framework/ui-atoms/Icon";
import merge from "lodash/merge";
import get from "lodash/get";
import { connect } from "react-redux";

import {
  validateFields,
} from "../../ui-config/screens/specs/utils";

const styles = theme => ({
  root: {
    width: "100%"
  }
});

const defaultButtonStyles = {
  style: {
    minWidth: "200px",
    height: "48px",
    marginRight: "16px"
  }
}

const getStyles = (customStyles={}) => {
   let styles = merge({},defaultButtonStyles,customStyles)
  return {...styles}
}


class StepperWithFooter extends React.Component {

  validateScreens(lableObj){debugger;
   let  {activeStep,screenVaidatePaths=[],state,dispatch,screenProps={},stpperToFooterRelattion,stepper:{steps},screenKey,parentPath} = this.props;
  //  let {screen={},childrens} = screenProps;
   let relationObject =  stpperToFooterRelattion[lableObj.labelKey];
   let screensToValidate = relationObject[activeStep] && relationObject[activeStep].screenValidationComponentJsonPath || [];
   let activeStepObj = steps[activeStep] && steps[activeStep].contentComponentJsonPath ||{}
   let formValid = true
   screensToValidate && screensToValidate.map((pathsToValidate)=>{debugger;
    if(pathsToValidate.isMultiple){
      let itemJsonPath = `${activeStepObj.contentComponentJsonPath && activeStepObj.contentComponentJsonPath.path}.children.${pathsToValidate.dataPath}`
      let items = get(
      state.screenConfiguration.screenConfig[screenKey],
      itemJsonPath,
      []
    );

    items && items.map((item,index)=>{
      if((item.isDeleted === undefined ||
        item.isDeleted !== false) && !validateFields(
          `${itemJsonPath}[${index}].item${index}.${pathsToValidate.childrenPath}`,
          state,
          dispatch
        )){
          formValid = false;
        }
    })
    }else{
      let sccrenPath = `${activeStepObj.contentComponentJsonPath && activeStepObj.contentComponentJsonPath.path}.children.${pathsToValidate}`;
      let isValid = validateFields(sccrenPath,state,dispatch) 
      formValid = isValid ? formValid : isValid;
    }
   });
   !formValid && dispatch(toggleSnackbarAndSetText(true, activeStepObj.contentComponentJsonPath && activeStepObj.contentComponentJsonPath.errMsg,"warning"));
   formValid && this.setpChange();

  }

  setpChange(mode){
    let  {activeStep,screenProps,dispatch} = this.props;
    let {screen={}} = screenProps;
    let newActiveStep = mode === "next" ? activeStep + 1 : mode == "previous" ? activeStep -1 : activeStep ;
    dispatch(FieldPropertyChange(screen.screenKey,screen.path,"activeStep",newActiveStep))
    this.changeActiveScreen(newActiveStep);
  }

  changeActiveScreen(newActiveStep){
    let  {screenProps,state,dispatch} = this.props;
    let {screen={},childrens=[] }= screenProps;
    childrens.map((_children,index)=>{
      let visible = index === newActiveStep;
      dispatch(FieldPropertyChange(screen.screenKey,_children.path,"visible",visible))
    })


  }
  render() {
    const { classes, activeStep,footerProps,screenVaidatePaths,stepper:{steps},footer={} } = this.props;
    return (
      <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          style={{
            background: "inherit"
          }}
        >
          {steps.map((step,index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <LabelContainer {...step.label} />
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div style={{zIndex:1}} className="apply-wizard-footer">
        {footer.actions && footer.actions.map((_action)=>{
          if(_action.visibleFor && (_action.visibleFor).includes(activeStep)){
            return <Button onClick={()=>{this.validateScreens(_action.label)}} {...getStyles(_action.styles)}{..._action}>
                     {_action.iconProps && _action.iconProps.position =="before" ? <Icon iconName = {_action.iconProps.name} /> : ""}
                     <LabelContainer {..._action.label} /> 
                     {_action.iconProps && _action.iconProps.position =="after" ? <Icon iconName = {_action.iconProps.name} /> : ""}
                   </Button>
          }
        })}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {

  return {state };
};

const mapDispatchToProps = dispatch => {
  return {
     dispatch,
  };
};



StepperWithFooter.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StepperWithFooter));
