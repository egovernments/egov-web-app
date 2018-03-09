import React, { Component } from "react";
import { Button, Icon, TextField, DropDown } from "../../components";
import ProfileSection from "../../components/ProfileSection";
import img from "../../assets/images/people.jpg";
import "./index.css";

const imgStyle = { width: 143, height: 143 };

const profileStyles = {
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
        <div>
          <ProfileSection
            id="profile-photo"
            className="profileSection"
            imgStyle={imgStyle}
            addIconName="add-a-photo"
            addIconStyle={profileStyles.addIconStyle}
            cardStyles={profileStyles.cardStyles}
            imgSrc={img}
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
            style={profileStyles.formFieldStyle}
            onChange={this.onDDChange}
          />
        </form>
        <div className="profileBtnWrapper">
          <Button
            className="profileBtn"
            primary={true}
            label="SAVE"
            fullWidth={true}
            onClick={this.onSaveClick}
            style={{ marginTop: 53, height: 48 }}
          />
        </div>
      </div>
    );
  }
}

export default Profile;
