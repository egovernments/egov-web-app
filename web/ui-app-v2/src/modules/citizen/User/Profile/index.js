import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { fileUpload } from "redux/file/actions";
import UploadDrawer from "modules/common/User/components/UploadDrawer";
import ProfileSection from "modules/common/User/components/ProfileSection";
import ProfileForm from "./components/ProfileForm";
import Screen from "modules/common/Screen";
import img from "assets/images/people.jpg";
import "./index.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUploadSlide: false,
      img: img,
    };
    this.formConfig = require("../../../../config/forms/profile").default;
  }
  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  setProfilePic = (file, url) => {
    this.props.fileUpload("profile", "photo", file);
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

  render() {
    const { form, handleFieldChange, submitForm } = this.props;
    const { img, openUploadSlide } = this.state;
    const { formConfig, setProfilePic, onClickAddPic } = this;
    const { name: formKey } = formConfig;
    const { submitting } = form;

    return (
      <Screen>
        <ProfileSection img={img} onClickAddPic={onClickAddPic} />
        <ProfileForm form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} />
        {openUploadSlide && <UploadDrawer setProfilePic={setProfilePic} onClickAddPic={onClickAddPic} openUploadSlide={openUploadSlide} />}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "profile";
  const form = state.form[formKey] || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, file) => dispatch(fileUpload(formKey, fieldKey, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
