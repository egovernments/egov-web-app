import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../GenericForm";

let DuplicateCard = [];

class DuplicateCardsHOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DuplicateCard: [],
    };
  }
  componentDidMount() {
    const { formKey } = this.props;
    // console.log(formKey);
    this.setState({
      DuplicateCard: this.setFormContent(),
    });
  }

  setFormContent = () => {
    const Comp = formHoc({ formKey: this.props.formKey, path: "PropertyTaxPay", makeCopy: true })(GenericForm);
    return <Comp />;
  };

  render() {
    // console.log(this.state.DuplicateCard);
    const { DuplicateCard } = this.state;
    return <div>{[...DuplicateCard]}</div>;
  }
}

export default DuplicateCardsHOC;
