import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
//import GenericForm from "../FormWizard/components/GenericForm";
import SearchPropertyForm from "./components/SearchPropertyForm";
import { Screen } from "modules/common";

const PropertyFormHOC = formHoc({ formKey: "searchProperty", path: "PropertyTaxPay" })(SearchPropertyForm);

class AddComplaints extends Component {
  render() {
    return (
      <Screen>
        <PropertyFormHOC history={this.props.history} />
        {/* <div className="responsive-action-button-cont">
          <Button
            primary={true}
            fullWidth={true}
            style={{ width: 230, boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
            {...submit}
            className="responsive-action-button"
          />
        </div> */}
      </Screen>
    );
  }
}

export default AddComplaints;
