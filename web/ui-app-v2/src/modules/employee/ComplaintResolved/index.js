import React, { Component } from "react";
import { Button, Icon } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SuccessMessage from "../../common/SuccessMessage/components/successmessage";
import "./index.css";

class ComplaintResolved extends Component {
  state = {
    submitted: false,
  };

  onSubmit = () => {
    if (this.state.submitted === false) {
      this.setState({ submitted: true });
    } else {
      this.props.history.push("/citizen");
    }
  };

  render() {
    let { history } = this.props;
    let { submitted } = this.state;

    return (
      <Screen className="complaint-resolved-main-container">
        {!submitted ? (
          <div>
            <ImageUpload />
            <div style={{ padding: "24px 16px 350px 1px" }}>
              <TextArea />
            </div>
          </div>
        ) : (
          <SuccessMessage
            successmessage={
              <span>
                You have marked the complaint as <span style={{ color: "#484848" }}>Resolved</span> successfully
              </span>
            }
          />
        )}
        <div className="col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 complaint-resolved-button-cont">
          <Button
            id={submitted ? "complaint-resolved-continue" : "complaint-resolved-submit"}
            label={submitted ? "CONTINUE" : "MARK RESOLVED"}
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
