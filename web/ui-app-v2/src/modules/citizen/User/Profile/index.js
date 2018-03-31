import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { fileUpload } from "redux/form/actions";
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
      img: { url: img },
    };
    this.formConfig = require("config/forms/profile").default;
  }
  componentDidMount() {
    // get user info
    // merge with form config
    this.props.initForm(this.formConfig);
  }

  setProfilePic = (file, url) => {
    const fileName = file ? file.name : null;

    if (url === "") url = img;
    this.setState({
      img: { name: fileName, url },
    });

    this.props.fileUpload(this.props.formKey, "photo", "pgr", file);
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
        <ProfileSection img={img.url} onClickAddPic={onClickAddPic} />
        <ProfileForm form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} />
        {openUploadSlide && <UploadDrawer setProfilePic={setProfilePic} onClickAddPic={onClickAddPic} openUploadSlide={openUploadSlide} />}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "profile";
  const form = state.form[formKey] || {};
  return { form, formKey };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, module, file) => dispatch(fileUpload(formKey, fieldKey, module, file)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
