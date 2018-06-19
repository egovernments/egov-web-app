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
    const complainTypeMessage =
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
            disabled={false}
          />
        </div>
        <Dialog
          open={open}
          title="Choose ComplaintType"
          titleStyle={{ textAlign: "left", paddingRight: "20px", fontWeight: "500" }}
          children={[
            <div>
              <ComplaintType onClose={onClose} employeeScreen={true} containerStyle={{}} textFieldStyle={{ backgroundColor: "#f7f7f7" }} />
            </div>,
          ]}
          bodyStyle={{ backgroundColor: "#ffffff" }}
          isClose={false}
          onRequestClose={onClose}
          contentStyle={{ width: "34%", height: "65%" }}
          autoScrollBodyContent={true}
          style={{
            paddingTop: "0",
            bottom: "0",
            marginTop: "50px",
            height: "auto",
          }}
        />
      </div>
    );
  }
}

export default ComplaintTypeField;
