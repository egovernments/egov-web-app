import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../../GenericForm";
import { OwnerInfoHOC, OwnerInformation } from "..";
import { Icon } from "components";

let ownerArr = [];
const titleStyle = {
  display: "flex",
  alignItems: "center",
};
class MultipleOwnerInfoHOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMultiple: false,
      owners: [],
    };
  }

  addOwner = () => {
    const { owners } = this.state;
    const length = owners.length;
    const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", makeCopy: true, path: "PropertyTaxPay" })(OwnerInformation);
    let Component = <OwnerInfoHOC key={length + 1} cardTitle={this.getTitle(length + 2)} deleteBtn={true} />;
    ownerArr.push(Component);
    this.setState({
      owners: ownerArr,
      showMultiple: true,
    });
  };

  getTitle = (length) => {
    return (
      <div className="pt-ownerinfo-title" style={titleStyle}>
        <span>
          <Icon action="social" name="person" />
        </span>
        <span style={{ marginLeft: 4 }}>Owner-{length}</span>
      </div>
    );
  };

  render() {
    return (
      <div>
        <OwnerInfoHOC cardTitle={this.getTitle(1)} />
        {this.state.showMultiple && [...this.state.owners]}
        <div className="pt-add-owner-btn" onClick={this.addOwner} style={{ color: "#fe7a51", float: "right" }}>
          + Add Owner
        </div>
      </div>
    );
  }
}

export default MultipleOwnerInfoHOC;
