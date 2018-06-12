import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../GenericForm";

class DuplicateCardsHOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicateCard: [],
    };
  }
  componentDidMount() {
    const { formKey } = this.props;
    const DuplicateCard = formHoc({ formKey: formKey, formConfigPath: null, makeCopy: true })(GenericForm);
    this.setState({
      duplicateCard: DuplicateCard,
    });
  }

  render() {
    console.log(this.state.duplicateCard);
    return <div>{[...this.state.duplicateCard]}</div>;
  }
}

export default DuplicateCardsHOC;
