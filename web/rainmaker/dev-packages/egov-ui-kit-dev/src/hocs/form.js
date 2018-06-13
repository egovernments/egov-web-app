import React from "react";
import { LoadingIndicator } from "components";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "egov-ui-kit/redux/form/actions";

const form = ({ formKey, path = "", makeCopy = false, copyName, rowData, edit = false }) => (Form) => {
  class FormWrapper extends React.Component {
    constructor(props) {
      super(props);
      try {
        if (path && path !== "") {
          this.formConfig = require(`config/forms/specs/${path}/${formKey}`).default;
        } else {
          this.formConfig = require(`config/forms/specs/${formKey}`).default;
        }
      } catch (error) {
        // the error is assumed to have occured due to absence of config; so ignore it!
      }
    }

    componentDidMount() {
      if (this.formConfig && makeCopy) {
        let formConf = { ...this.formConfig };
        formConf = this.createCopy(formConf);
        this.props.initForm(formConf, rowData);
      } else {
        this.formConfig && this.props.initForm(this.formConfig, rowData);
      }
    }

    createCopy = (formConf) => {
      const { formKeys } = this.props;
      const existing_count = formKeys.filter(function(formKey) {
        return formKey.includes(formConf.name);
      }).length;
      formConf.name = copyName ? copyName : formConf.name + `_${existing_count}`;
      formKey = formConf.name;
      return formConf;
    };

    submitForm = () => {
      const { form } = this.props;
      const saveUrl = edit ? form.editUrl : form.saveUrl;
      this.props.submitForm(formKey, saveUrl);
    };

    handleFieldChange = (fieldKey, value) => {
      this.props.handleFieldChange(formKey, fieldKey, value);
    };

    render() {
      const { handleFieldChange, submitForm } = this;
      const { loading } = this.props;
      return (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <Form {...this.props} formKey={formKey} submitForm={submitForm} handleFieldChange={handleFieldChange} />
          </form>
          {loading && <LoadingIndicator />}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const form = state.form[formKey] || {};
    const formKeys = Object.keys(state.form);
    const { loading } = form || false;
    return { form, formKeys, loading };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
      submitForm: (formKey, saveUrl) => dispatch(submitForm(formKey, saveUrl)),
      initForm: (form) => dispatch(initForm(form)),
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormWrapper);
};

export default form;
