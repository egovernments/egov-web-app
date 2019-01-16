import React from "react";
import { Button } from "@material-ui/core";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import { ActionDialog } from "../";
import "./index.css";

const buttonStyle = {
  minWidth: "200px",
  height: "48px",
  marginRight: "45px"
};

const getButtonLabelKey = item => {
  switch (item) {
    case "APPROVE":
      return "TL_APPROVER_TRADE_APP_BUTTON_APPROVE";
    case "FORWARD":
      return "TL_FORWARD_BUTTON";
    case "REJECT":
      return "TL_APPROVER_TRADE_APP_BUTTON_REJECT";
    case "APPLY":
      return "TL_APPLY_BUTTON";
    case "CANCEL":
      return "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL";
    case "MARK":
      return "TL_MARK_BUTTON";
  }
};

class Footer extends React.Component {
  state = {
    open: false,
    data: {}
  };

  openActionDialog = item => {
    let state = this.state;
    state.open = true;
    state.data = item;
    this.setState(state);
  };

  onClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { onClick, buttons, color, variant, contractData } = this.props;
    const { open, data } = this.state;
    return (
      <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
          {contractData &&
            contractData.map(item => {
              return (
                <Button
                  color={color}
                  variant={variant}
                  style={buttonStyle}
                  onClick={() => this.openActionDialog(item)}
                >
                  <LabelContainer
                    labelName={item.buttonLabel}
                    labelKey={() => getButtonLabelKey(item.buttonLabel)}
                  />
                </Button>
              );
            })}
        </div>
        <ActionDialog open={open} onClose={this.onClose} employeeData={data} />
      </div>
    );
  }
}

export default Footer;
