import React from "react";
import { LoadingIndicator } from "components";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

const form = ({ formKey }) => (Form) => {
  class FormWrapper extends React.Component {
    constructor(props) {
      super(props);
      try {
        this.formConfig = require(`config/forms/specs/${formKey}`).default;
      } catch (error) {
        // the error is assumed to have occured due to absence of config; so ignore it!
      }
    }

    componentDidMount() {
      this.formConfig && this.props.initForm(this.formConfig);
    }

    submitForm = () => {
      this.props.submitForm(formKey);
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
    const { loading } = form || false;
    return { form, loading };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
      submitForm: (formKey) => dispatch(submitForm(formKey)),
      initForm: (form) => dispatch(initForm(form)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
};

export default form;
