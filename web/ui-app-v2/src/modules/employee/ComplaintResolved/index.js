import React, { Component } from "react";
import { Button } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import Screen from "../../common/Screen";
import "./index.css";

class ComplaintResolved extends Component {
  onSubmit = () => {
    this.props.history.push("/employee/resolve-success");
  };

  render() {
    let { history } = this.props;

    return (
      <Screen className="complaint-resolved-main-container">
        <div>
          <ImageUpload />
          <div style={{ padding: "24px 16px 350px 1px" }}>
            <TextArea hintText="Type your comments" />
          </div>
        </div>

        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 complaint-resolved-button-cont">
          <Button
            id={"complaint-resolved-mark-resolved"}
            label={"MARK RESOLVED"}
            primary={true}
            fullWidth={true}
            onClick={(e) => {
              this.onSubmit(history);
            }}
          />
        </div>
      </Screen>
    );
  }
}

export default ComplaintResolved;
