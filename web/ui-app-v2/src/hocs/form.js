import React from "react";
import { LoadingIndicator } from "components";
import { connect } from "react-redux";
import { handleFieldChange, initForm, submitForm } from "redux/form/actions";

const form = (Form, formKey) => {
  class FormWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.formConfig = require(`config/forms/${formKey}`).default;
    }

    componentDidMount() {
      this.props.initForm(this.formConfig, formKey);
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
            <Form {...this.props} formKey={formKey} handleFieldChange={handleFieldChange} />
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
      initForm: (form, formKey) => dispatch(initForm(form, formKey)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
};

export default form;
