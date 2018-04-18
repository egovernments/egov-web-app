import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";
import { fileUpload, removeFile } from "redux/form/actions";
import UploadDrawer from "modules/common/User/components/UploadDrawer";
import ProfileSection from "modules/common/User/components/ProfileSection";
import ProfileForm from "./components/ProfileForm";
import Screen from "modules/common/Screen";
import img from "assets/images/download.png";
import { setRoute } from "redux/app/actions";
import "./index.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUploadSlide: false,
    };
    this.formConfig = require("config/forms/profileEmployee").default;
  }
  componentDidMount() {
    const { name, mobileNumber, emailId, photo: imageUri } = this.props.userInfo;
    let { formConfig } = this;
    formConfig = {
      ...formConfig,
      fields: {
        ...formConfig.fields,
        email: { ...formConfig.fields.email, value: emailId },
        phonenumber: { ...formConfig.fields.phonenumber, value: mobileNumber },
        name: { ...formConfig.fields.name, value: name },
      },
      files: {
        ["photo"]: [
          {
            imageUri,
          },
        ],
      },
    };
    this.props.initForm(formConfig);
  }

  setProfilePic = (file = null, imageUri = "") => {
    const { fileUpload } = this.props;
    this.removeProfilePic();

    fileUpload("profileEmployee", "photo", { module: "rainmaker-pgr", file, imageUri });
  };

  removeProfilePic = () => {
    const { removeFile } = this.props;
    removeFile("profileEmployee", "photo", 0);
  };

  onClickAddPic = (isOpen) => {
    this.setState({
      openUploadSlide: isOpen,
    });
  };

  onClickChangePasswd = () => {
    this.props.history.push("/employee/user/change-password");
  };

  submitForm = () => {
    const { formKey, submitForm } = this.props;
    submitForm(formKey);
  };

  render() {
    const { form, handleFieldChange, submitForm, profilePic, loading } = this.props;
    const { openUploadSlide } = this.state;
    const { formConfig, setProfilePic, onClickAddPic, removeProfilePic, onClickChangePasswd } = this;
    const { name: formKey } = formConfig;

    return (
      <Screen loading={loading}>
        <div className="row">
          <ProfileSection img={profilePic || img} onClickAddPic={onClickAddPic} />
          <ProfileForm form={form} formKey={formKey} onChange={handleFieldChange} onClickChangePasswd={onClickChangePasswd} submitForm={submitForm} />
          {openUploadSlide && (
            <UploadDrawer
              removeFile={removeProfilePic}
              setProfilePic={setProfilePic}
              onClickAddPic={onClickAddPic}
              openUploadSlide={openUploadSlide}
            />
          )}
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const formKey = "profileEmployee";
  const { auth } = state;
  const { userInfo } = auth;
  const form = state.form[formKey] || {};
  const images = (state.form[formKey] && state.form[formKey].files && state.form[formKey].files["photo"]) || [];
  const loading =
    form.loading ||
    images.reduce((loading, file) => {
      return loading || file.loading;
    }, false) ||
    false;

  return {
    form,
    formKey,
    loading,
    userInfo,
    profilePic: (images.length && images[0].imageUri) || img,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    fileUpload: (formKey, fieldKey, module, fileObject) => dispatch(fileUpload(formKey, fieldKey, module, fileObject)),
    setRoute: (route) => dispatch(setRoute(route)),
    removeFile: (formKey, fieldKey, index) => dispatch(removeFile(formKey, fieldKey, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
