import React, { Component } from "react";
import { Button, Icon, TextField, DropDown } from "../../components";
import ProfileSection from "../../components/ProfileSection";
import img from "../../assets/people.jpg";
import "./index.css";

const imgStyle = { width: "40%", height: 143 };

const profileStyles = {
  floatingLabelStyle: {
    textAlign: "left",
    color: "#6090ae",
    fontSize: "14px",
    fontWeight: "normal",
    textAlign: "left",
  },
  formFieldStyle: {
    background: "#ffffff",
    margin: "0px 0px 8px 0px",
    border: "0.5px solid  #e6e6e6",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#484848",
    textAlign: "left",
  },
  addIconStyle: {
    backgroundColor: "#73b332",
    position: "absolute",
    right: "30%",
    bottom: "20px",
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
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Jaswinder",
      emailId: "abc@gmail.com",
      city: 1,
    };
  }

  onClickAddPic = () => {
    console.log("clicked");
  };

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
  onClickAddPic = () => {
    //TO UPLOAD PIC- using phone native feature.
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
        <div style={{ position: "relative" }}>
          <ProfileSection id="profile-photo" className="profileSection" imgStyle={imgStyle} cardStyles={profileStyles.cardStyles} imgSrc={img} />
          <Icon id="profile-upload-icon" style={profileStyles.addIconStyle} action="image" name="add-a-photo" onClick={this.onClickAddPic} />
        </div>
        <form className="profileFormContainer">
          <TextField
            className="profile-form-field"
            id="profile-form-name"
            underlineShow={false}
            fullWidth={true}
            value={name}
            floatingLabelText="Name"
            floatingLabelStyle={profileStyles.floatingLabelStyle}
            style={profileStyles.formFieldStyle}
            onChange={this.handleNameChange}
          />
          <TextField
            className="profile-form-field"
            id="profile-form-name"
            underlineShow={false}
            fullWidth={true}
            value={emailId}
            floatingLabelText="Email Id"
            floatingLabelStyle={profileStyles.floatingLabelStyle}
            style={profileStyles.formFieldStyle}
            onChange={this.handleMailChange}
          />
          <DropDown
            name="cities"
            className="profile-form-field"
            id="profile-form-cities"
            value={this.state.city}
            dropDownData={this.dropDownData}
            fullWidth={true}
            floatingLabelText="City"
            floatingLabelStyle={profileStyles.floatingLabelStyle}
            style={profileStyles.formFieldStyle}
            onChange={this.onDDChange}
          />
          <Button
            className="profileBtn"
            primary={true}
            label="SAVE"
            fullWidth={true}
            onClick={this.onSaveClick}
            style={{ marginTop: 53, height: 48 }}
          />
        </form>
      </div>
    );
  }
}

export default Profile;
