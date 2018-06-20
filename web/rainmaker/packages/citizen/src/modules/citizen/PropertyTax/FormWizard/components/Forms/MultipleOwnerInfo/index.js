import React from "react";
import formHoc from "egov-ui-kit/hocs/form";
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
    const index = owners.length + 1;
    const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", makeCopy: true, path: "PropertyTaxPay" })(OwnerInformation);
    let Component = <OwnerInfoHOC key={index} cardTitle={this.getTitle(index + 1)} deleteBtn={true} deleteOwner={this.deleteOwner} />;
    ownerArr.push(Component);
    this.setState({
      owners: ownerArr,
      showMultiple: true,
    });
  };

  deleteOwner = () => {};

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
