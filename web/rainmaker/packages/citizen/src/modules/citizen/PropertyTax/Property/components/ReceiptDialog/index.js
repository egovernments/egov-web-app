import React, { Component } from "react";
import { Dialog, Button } from "components";
import PropertyInformation from "../PropertyInformation";

const innerDivStyle = {
  paddingLeft: 60,
};

class ReceiptDialog extends Component {
  render() {
    let { open, closeDialogue } = this.props;
    return (
      <Dialog
        titleStyle={{ textAlign: "left", padding: "5px 15px" }}
        bodyStyle={{ padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" }}
        title="Paid"
        modal={false}
        onRequestClose={closeDialogue}
        autoScrollBodyContent={true}
        handleClose={closeDialogue}
        open={open}
        children={[<PropertyInformation />]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={true}
        contentStyle={{ width: "80%" }}
      />
    );
  }
}

export default ReceiptDialog;
