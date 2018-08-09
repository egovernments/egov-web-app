import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
import Label from "egov-ui-kit/utils/translationNode";
import { Screen } from "modules/common";
import { BreadCrumbs } from "components";
import { addBreadCrumbs, toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import SearchPropertyForm from "./components/SearchPropertyForm";
import PropertyTable from "./components/PropertyTable";
import { validateForm } from "egov-ui-kit/redux/form/utils";
import { displayFormErrors } from "egov-ui-kit/redux/form/actions";
import { connect } from "react-redux";
import { Button } from "components";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";

import "./index.css";

const PropertySearchFormHOC = formHoc({ formKey: "searchProperty", path: "PropertyTaxPay" })(SearchPropertyForm);

class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      showTable:false
    };
  }

  componentDidMount = () => {
    const { location, addBreadCrumbs, title } = this.props;
    const { pathname } = location;
    if (!(localStorage.getItem("path") === pathname)) {
      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    }
  };

  onSearchClick = (form, formKey) => {
    const { city, ids, oldAssessmentNumber, mobileNumber } = form.fields || {};
    if (!validateForm(form)) {
      this.props.displayFormErrors(formKey);
    } else if (!oldAssessmentNumber.value && !ids.value && !mobileNumber.value) {
      this.props.toggleSnackbarAndSetText(true, "Please fill atleast one field along with city", true);
    } else {
      const queryParams = [];
      if (city.value) {
        queryParams.push({ key: "tenantId", value: city.value });
      }
      if (ids.value) {
        queryParams.push({ key: "ids", value: ids.value });
      }
      if (oldAssessmentNumber.value) {
        queryParams.push({ key: "oldAssessmentNumber", value: oldAssessmentNumber.value });
      }
      if (mobileNumber.value) {
        queryParams.push({ key: "mobileNumber", value: mobileNumber.value });
      }
      this.props.fetchProperties(queryParams);
      this.setState({showTable:true})
    }

  };

  extractTableData = (properties) => {
    const { history } = this.props;
    const tableData = properties.reduce((tableData, property, index) => {
      let { propertyId, oldPropertyId, address, propertyDetails } = property;
      let displayAddress = "StringFiled, Sarjapur Road";
      //let displayAddress = address.doorNo + "," + address.buildingName + "," + address.street;
      let name = propertyDetails[0].owners[0].name;
      let button = (
        <Button
          onClick={(e) => {
            propertyDetails[0] &&
              history.push(
                `/property-tax/assessment-form?FY=${propertyDetails[0].financialYear}&assessmentId=${
                  propertyDetails[0].assessmentNumber
                }&isReassesment=true&propertyId=${propertyId}`
              );
          }}
          label={<Label buttonLabel={true} label="PT_PAYMENT_ASSESS_AND_PAY" fontSize="12px" />}
          value={propertyId}
          primary={true}
          style={{ height: 20, lineHeight: "auto", minWidth: "inherit" }}
        />
      );
      let item = { index: index + 1, name: name, propertyId: propertyId, oldPropertyId: oldPropertyId, address: displayAddress, action: button };
      tableData.push(item);
      return tableData;
    }, []);
    return tableData;
  };

  onActionClick = (e) => {
    console.log(e);
  };

  render() {
    const { urls, location, history, propertiesFound, loading } = this.props;
    const {showTable}=this.state;
    let urlArray = [];
    const { pathname } = location;
    const tableData = this.extractTableData(propertiesFound);
    if (urls.length == 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls.length > 0 ? urls : urlArray} history={history} />
        <PropertySearchFormHOC history={this.props.history} onSearchClick={this.onSearchClick} />
        {(tableData.length > 0 && showTable) ? <PropertyTable tableData={tableData} onActionClick={this.onActionClick} /> : null}
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { properties } = state;
  const { urls } = state.app;
  const { propertiesById, loading } = properties && properties;
  const propertiesFound = Object.values(propertiesById);
  return { propertiesFound, urls, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    displayFormErrors: (formKey) => dispatch(displayFormErrors(formKey)),
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProperty);
