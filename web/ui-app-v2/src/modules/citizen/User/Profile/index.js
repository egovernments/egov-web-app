import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import UploadDrawer from "modules/common/User/components/UploadDrawer";
import ProfileSection from "modules/common/User/components/ProfileSection";
import ProfileForm from "./components/ProfileForm";
import Screen from "modules/common/Screen";
import img from "assets/images/people.jpg";
import { fileUpload, removeFile } from "redux/form/actions";
import "./index.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUploadSlide: false,
    };
    this.formConfig = require("config/forms/profile").default;
  }
  componentDidMount() {
    const { name, mobileNumber, emailId, tenantId } = this.props.userInfo;
    let { formConfig } = this;
    formConfig = {
      ...formConfig,
      fields: {
        ...formConfig.fields,
        email: { ...formConfig.fields.email, value: emailId },
        city: { ...formConfig.fields.city, value: tenantId },
        name: { ...formConfig.fields.name, value: name },
      },
    };
    this.props.initForm(formConfig);
  }

  setProfilePic = (file = null, imageUri = "") => {
    if (imageUri === "") imageUri = img;
    if (imageUri.length) {
      const { fileUpload } = this.props;
      fileUpload("profile", "photo", { module: "rainmaker-pgr", file, imageUri });
    }
  };

  removeImage = (imageIndex) => {
    const { removeFile } = this.props;
    removeFile("profile", "photo", imageIndex);
  };

  onClickAddPic = (isOpen) => {
    this.setState({
      openUploadSlide: isOpen,
    });
  };

  submitForm = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };

  render() {
    const { form, handleFieldChange, submitForm, profilePic } = this.props;
    const { openUploadSlide } = this.state;
    const { formConfig, setProfilePic, onClickAddPic } = this;
    const { name: formKey } = formConfig;
    const { submitting } = form;

    return (
      <Screen>
        <ProfileSection img={profilePic || img} onClickAddPic={onClickAddPic} />
        <ProfileForm form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} />
        {openUploadSlide && <UploadDrawer setProfilePic={setProfilePic} onClickAddPic={onClickAddPic} openUploadSlide={openUploadSlide} />}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "profile";
  const { auth } = state;
  const { userInfo } = auth;
  const form = state.form[formKey] || {};
  const images = (state.form[formKey] && state.form[formKey].files && state.form[formKey].files["photo"]) || [];

  return {
    form,
    formKey,
    userInfo,
    profilePic: (images.length && images[0].imageUri) || userInfo.photo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, module, fileObject) => dispatch(fileUpload(formKey, fieldKey, module, fileObject)),
    removeFile: (formKey, fieldKey, index) => dispatch(removeFile(formKey, fieldKey, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
