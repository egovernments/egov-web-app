import React, { Component } from "react";
import UploadDrawer from "./components/UploadDrawer";
import ProfileSection from "./components/ProfileSection";
import ProfileForm from "./components/ProfileForm";
import Screen from "../../common/Screen";
import img from "../../../assets/images/people.jpg";
import "./index.css";

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
    const { name, emailId, img, openUploadSlide } = this.state;
    const { setProfilePic, onClickAddPic, handleMailChange, handleNameChange } = this;

    return (
      <Screen>
        <div>
          <ProfileSection img={img} onClickAddPic={onClickAddPic} />
          <ProfileForm name={name} emailId={emailId} handleNameChange={handleNameChange} handleMailChange={handleMailChange} />
          {openUploadSlide && <UploadDrawer setProfilePic={setProfilePic} onClickAddPic={onClickAddPic} openUploadSlide={openUploadSlide} />}
        </div>
      </Screen>
    );
  }
}

export default Profile;
