import React, { Component } from "react";
import { Button, Icon } from "../../../components";
import ImageUpload from "../../common/ImageUpload";
import TextArea from "../../common/ReOpenComplaint/components/TextArea";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./index.css";

class ComplaintResolved extends Component {
  state = {
    submitted: false,
  };

  onSubmit = () => {
    if (this.state.submitted === false) {
      this.setState({ submitted: true });
    }
  };

  render() {
    let { history } = this.props;
    let { submitted } = this.state;

    return (
      <div className="complaint-resolved-main-container">
        {!submitted ? (
          <div>
            <ImageUpload />
            <div style={{ padding: "24px 16px 350px 1px" }}>
              <TextArea />
            </div>
          </div>
        ) : (
          <div className="complaint-resolved-main-cont ">
            <div className="complaint-resolved-inner-cont">
              <div className="complaint-resolved-icon-cont">
                <FloatingActionButton className="floating-button" style={{ boxShadow: 0 }} backgroundColor={"#22b25f"}>
                  <Icon action="navigation" name="check" />
                </FloatingActionButton>
              </div>
              <span className="thankyou-text">
                You have marked the complaint as <span style={{ color: "#484848" }}>Resolved</span> <br /> successfully
              </span>
            </div>
          </div>
        )}
        <div className="complaint-resolved-button-cont">
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
      </div>
    );
  }
}

export default ComplaintResolved;
