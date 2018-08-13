import React, { Component } from "react";
import formHoc from "egov-ui-kit/hocs/form";
import Label from "egov-ui-kit/utils/translationNode";
import Screen from "egov-ui-kit/common/common/Screen";
import { Button } from "egov-ui-kit/components";
import { BreadCrumbs } from "egov-ui-kit/components";
import { addBreadCrumbs, toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import SearchPropertyForm from "./components/SearchPropertyForm";
import PropertyTable from "./components/PropertyTable";
import { validateForm } from "egov-ui-kit/redux/form/utils";
import { displayFormErrors } from "egov-ui-kit/redux/form/actions";
import { connect } from "react-redux";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import BlankAssessment from "../AssessmentList/components/BlankAssessment";

import "./index.css";

const userType = localStorage.getItem("user-info") && JSON.parse(localStorage.getItem("user-info")).type;

const PropertySearchFormHOC = formHoc({ formKey: "searchProperty", path: "PropertyTaxPay" })(SearchPropertyForm);

class SearchProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogueOpen: false,
      searchResult: [],
      showTable: false,
    };
  }

  componentDidMount = () => {
    const { location, addBreadCrumbs, title } = this.props;
    const pathname = location && location.pathname;
    if (userType === "CITIZEN" && !(localStorage.getItem("path") === pathname)) {
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
      this.setState({ showTable: true });
    }
  };

  extractTableData = (properties) => {
    const { history } = this.props;
    const tableData = properties.reduce((tableData, property, index) => {
      let { propertyId, oldPropertyId, address, propertyDetails } = property;
      const { doorNo, buildingName, street, locality } = address;
      let displayAddress = doorNo
        ? `${doorNo ? doorNo + "," : ""}` + `${buildingName ? buildingName + "," : ""}` + `${street ? street + "," : ""}`
        : `${locality.name ? locality.name : ""}`;
      let name = propertyDetails[0].owners[0].name;
      let button = (
        <Button
          onClick={
            userType === "CITIZEN"
              ? (e) => {
                  history.push(
                    `/property-tax/assessment-form?FY=${propertyDetails[0].financialYear}&assessmentId=${propertyDetails[0] &&
                      propertyDetails[0].assessmentNumber}&isReassesment=true&propertyId=${propertyId}`
                  );
                }
              : (e) => {
                  history.push(`/property-tax/property/${propertyId}`);
                }
          }
          label={<Label buttonLabel={true} label={userType === "CITIZEN" ? "PT_PAYMENT_ASSESS_AND_PAY" : "View"} fontSize="12px" />}
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

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onNewPropertyButtonClick = () => {
    this.setState({
      dialogueOpen: true,
    });
  };

  render() {
    const { urls, location, history, propertiesFound, loading } = this.props;
    const { showTable } = this.state;
    let urlArray = [];
    const pathname = location && location.pathname;
    const tableData = this.extractTableData(propertiesFound);
    if (userType === "CITIZEN" && urls.length == 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }
    return (
      <Screen loading={loading}>
        {userType === "CITIZEN" ? <BreadCrumbs url={urls.length > 0 ? urls : urlArray} history={history} /> : []}
        {/* <BreadCrumbs url={urls.length > 0 ? urls : urlArray} history={history} /> */}
        <PropertySearchFormHOC history={this.props.history} onSearchClick={this.onSearchClick} />
        {tableData.length > 0 && showTable ? <PropertyTable tableData={tableData} onActionClick={this.onActionClick} /> : null}
        {showTable &&
          tableData.length === 0 && (
            <div className="search-no-property-found">
              <div className="no-search-text">No property records found</div>
              <div className="new-assess-btn">
                <Button
                  label={"New Property Assessment"}
                  labelStyle={{ fontSize: 12 }}
                  className="new-property-assessment"
                  onClick={() => history.push("/property-tax")}
                  primary={true}
                  fullWidth={true}
                />
              </div>
            </div>
          )}
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
