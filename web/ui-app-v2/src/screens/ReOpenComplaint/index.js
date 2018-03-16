import React, { Component } from "react";
import RadioButton from "../../components/RadioButton";
import { TextArea, Label, Button, Icon, UploadDrawer, FilePicker } from "../../components";
import Check from "material-ui/svg-icons/navigation/check";
import Screen from "../common/Screen";
import FloatingActionButton from "material-ui/FloatingActionButton";
import "./index.css";

const styles = {
  labelStyle: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#767676",
    letterSpacing: "0.3px",
    marginBottom: "26px",
  },
  hintStyle: {
    color: "#b3b3b3",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "400",
    letterSpacing: "0.3px",
  },
  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px",
  },
  selectedLabelStyle: {
    color: "#00bbd3",
  },
  radioButtonLabelStyle: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#767676",
    letterSpacing: "0.3px",
  },
};
class ReOpenComplaint extends Component {
  state = {
    valueSelected: "",
    openUploadSlide: false,
  };
  options = [
    { value: "No work was done", label: "No work was done" },
    { value: "Only partial work was done ", label: "Only partial work was done " },
    { value: "Employee did not turn up", label: "Employee did not turn up" },
    { value: "No permanent solution", label: "No permanent solution" },
  ];

  handleChange = (event, value) => {
    this.setState({ valueSelected: value });
  };
  handleComplaintSubmit = () => {
    //console.log("submitted");
  };
  handleCommentChange = () => {
    //console.log("changed");
  };
  handleSlider = () => {
    this.setState({
      openUploadSlide: true,
    });
  };
  handlePhoto = (file, url) => {
    console.log(file);
  };
  render() {
    const { valueSelected } = this.state;

    return (
      <Screen className="reopencomplaint-field">
        <div className="reopencomplaint-question">
          <Label label="Why do you want to Re-Open your Complaint?" labelStyle={styles.labelStyle} />
          <RadioButton
            name="reopencomplaint-radio"
            valueSelected={valueSelected}
            options={this.options}
            handleChange={this.handleChange}
            radioButtonItemStyle={styles.radioButtonItemStyle}
            labelStyle={styles.radioButtonLabelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
          />
        </div>
        <div className="reopencomplaint-upload-photo">
          <FloatingActionButton
            backgroundColor="#767676"
            iconStyle={{ height: "40px", width: "40px" }}
            style={{ margin: "15px 36px 4px 30px" }}
            onClick={this.handleSlider}
          >
            <Icon name="add-a-photo" action="image" style={{ height: "20px", width: "20px" }} />
          </FloatingActionButton>
          <Label
            label="UPLOAD PHOTO"
            bold={true}
            color={"#767676"}
            fontSize={"12px"}
            labelStyle={{ textAlign: "center", padding: "2px 24px 18px 23px" }}
          />
          {this.state.openUploadSlide && (
            <UploadDrawer
              openUploadSlide={this.state.openUploadSlide}
              galleryIcon={true}
              removeIcon={true}
              onClickAddPic={this.handleSlider}
              setProfilePic={this.handlePhoto}
            />
          )}
        </div>
        <div className="reopencomplaint-textArea">
          <TextArea
            id="reopencomplaint-comment-field"
            hintText="Type your comments"
            hintStyle={styles.hintStyle}
            rowsMax={2}
            onChange={this.handleCommentChange}
            underlineShow={true}
            underlineStyle={{ borderColor: "#e0e0e0" }}
            underlineFocusStyle={{ borderColor: "#e0e0e0" }}
          />
        </div>
        <div className="reopencomplaint-button">
          <Button id="reopencomplaint-submit-action" primary={true} label="SUBMIT" fullWidth={true} onClick={this.handleComplaintSubmit} />
        </div>
      </Screen>
    );
  }
}

export default ReOpenComplaint;
