import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "../../../../redux/form/actions";
import UploadDrawer from "../../../common/User/components/UploadDrawer";
import ProfileSection from "../../../common/User/components/ProfileSection";
import ProfileForm from "./components/ProfileForm";
import Screen from "../../../common/Screen";
import img from "../../../../assets/images/people.jpg";
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

  // init form config
  componentDidMount() {
    this.props.initForm(this.formConfig);
  }

  /* Set/remove profile picture */
  // set it in the redux state
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
