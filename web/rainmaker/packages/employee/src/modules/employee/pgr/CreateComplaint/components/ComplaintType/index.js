import React, { Component } from "react";
import { Card, TextFieldIcon, Dialog } from "components";
import { Link } from "react-router-dom";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import "./index.css";
import { Label } from "egov-ui-kit/utils/translationNode";
import ComplaintType from "egov-ui-kit/common/pgr/ComplaintType";

class ComplaintTypeField extends Component {
  state = { open: false };

  onClose = () => {
    this.setState({ open: false });
  };

  onFieldClicked = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    let { categories, localizationLabels, complaintType } = this.props;
    let { onClose, onFieldClicked } = this;
    let { open } = this.state;
    let complainTypeMessage =
      (complaintType && complaintType.value && (localizationLabels["SERVICEDEFS." + (complaintType.value || "").toUpperCase()] || {}).message) || "";
    return (
      <div className="complaint-type-main-cont">
        <div onClick={onFieldClicked}>
          <TextFieldIcon
            {...{ ...complaintType, value: complainTypeMessage }}
            iconPosition="after"
            fullWidth={true}
            Icon={DownArrow}
            name="complaint-type"
            isRequired={true}
            disabled={false}
          />
        </div>
        <Dialog
          open={open}
          title="Choose ComplaintType"
          children={[<ComplaintType />]}
          bodyStyle={{ backgroundColor: "#ffffff" }}
          isClose={false}
          onRequestClose={onClose}
          contentStyle={{ width: "50%" }}
          autoScrollBodyContent={true}
          style={{
            paddingTop: "0",
            marginTop: "-30px",
            bottom: "0",
            height: "auto",
          }}
        />
        {/* <Dialog
          className="complaint-type-dialog"
          titleStyle={{ textAlign: "left", padding: "24px 16px" }}
          handleClose={onClose}
          bodyStyle={{ padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" }}
          title="Choose ComplaintType"
          modal={false}
          open={open}
          autoScrollBodyContent={true}
          onRequestClose={onClose}
          style={{
            paddingTop: "0",
            marginTop: "-30px",
            bottom: "0",
            height: "auto",
          }}
          isClose={true}
        >
          <p>hiiiiiiii</p>
        </Dialog> */}
      </div>
    );
  }
}

export default ComplaintTypeField;
