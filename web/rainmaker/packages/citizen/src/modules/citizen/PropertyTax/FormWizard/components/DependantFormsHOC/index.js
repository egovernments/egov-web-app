import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../GenericForm";

class DependantFormsHOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dependentForms: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.combination !== nextProps.combination) {
      this.setFormContent(nextProps.combination);
    }
  }

  componentDidMount() {
    const { formsToAdd, combination } = this.props;
    this.setFormContent(combination);
  }

  setFormContent = (combination) => {
    const { formsToAdd, removeForm } = this.props;
    formsToAdd &&
      formsToAdd.removeForms.forEach((formKey) => {
        this.props.removeForm(formKey);
      });
    this.setState({
      dependentForms: this.getAllForms(combination),
    });
  };

  getAllForms = (combination) => {
    const { formsToAdd, moduleName, removeForm } = this.props;
    return (
      formsToAdd &&
      formsToAdd.formKeys.map((formKey, index) => {
        let DependantForm = formHoc({ formKey: formKey, formConfigPath: { moduleName: moduleName, combination: combination } })(GenericForm);
        return (
          <div key={index}>
            <DependantForm />
          </div>
        );
      })
    );
  };

  render() {
    const { dependentForms } = this.state;
    return <div>{dependentForms && [...this.state.dependentForms]}</div>;
  }
}

export default DependantFormsHOC;
