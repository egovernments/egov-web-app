import React, { Component } from "react";
import { UploadDrawer, ProfileSection, Button, Icon, TextField, TextFieldIcon } from "../../components";
import CityPicker from "../common/CityPicker";
import img from "../../assets/images/people.jpg";
import "./index.css";

const imgStyle = { width: 143, height: 143 };

const profileStyles = {
  addIconStyle: {
    backgroundColor: "#3498db",
    position: "absolute",
    right: "-5%",
    bottom: "0px",
  },
  cardStyles: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#e0e0e0",
  },
  UploadDrawerLabelStyle: {
    fontFamily: "Roboto",
    fontSize: "14px",
    letterSpacing: "0.3px",
  },
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Jaswinder",
      emailId: "abc@gmail.com",
      city: 1,
      openUploadSlide: false,
      img: img,
    };
  }

  dropDownData = [
    {
      value: 1,
      label: "Amritsar",
    },
    {
      value: 2,
      label: "Patiala",
    },
  ];

  /* Set/remove profile picture */
  setProfilePic = (url) => {
    if (url === "") url = img;
    this.setState({
      img: url,
    });
  };
  onClickAddPic = (isOpen) => {
    this.setState({
      openUploadSlide: isOpen,
    });
  };
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleMailChange = (event) => {
    this.setState({
      emailId: event.target.value,
    });
  };
  onDDChange = (event, key, value) => {
    this.setState({
      city: value,
    });
  };
  onSaveClick = (event) => {
    //To save/send the data from the Form
  };
  render() {
    let { name, emailId } = this.state;
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8" style={{ padding: "0px" }}>
        <div>
          <ProfileSection
            id="profile-photo"
            className="profileSection"
            imgStyle={imgStyle}
            addIconName="add-a-photo"
            addIconStyle={profileStyles.addIconStyle}
            cardStyles={profileStyles.cardStyles}
            imgSrc={this.state.img}
            onClickAddPic={this.onClickAddPic}
          />
        </div>
        <form className="profileFormContainer">
          <TextField
            className="profile-form-field"
            id="profile-form-name"
            underlineShow={false}
            fullWidth={true}
            value={name}
            hintText="Enter your Name"
            floatingLabelText="Name"
            onChange={this.handleNameChange}
            isRequired={true}
          />
          <CityPicker />
          <TextField
            className="profile-form-field"
            id="profile-form-email"
            underlineShow={false}
            fullWidth={true}
            value={emailId}
            floatingLabelText="Email Id"
            hintText="Enter your Email Id"
            onChange={this.handleMailChange}
          />
        </form>
        <div className="profileBtnWrapper">
          <Button
            className="profileBtn"
            id="profile-save-action"
            primary={true}
            label="SAVE"
            fullWidth={true}
            onClick={this.onSaveClick}
            style={{ marginTop: 53 }}
          />
        </div>
        <div>
          {this.state.openUploadSlide && (
            <UploadDrawer
              openUploadSlide={this.state.openUploadSlide}
              galleryIcon={true}
              removeIcon={true}
              labelStyle={profileStyles.UploadDrawerLabelStyle}
              setProfilePic={this.setProfilePic}
              onClickAddPic={this.onClickAddPic}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
