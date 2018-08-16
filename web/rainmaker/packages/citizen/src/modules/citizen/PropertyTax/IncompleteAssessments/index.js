import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import orderby from "lodash/orderBy";
import get from "lodash/get";
import { getFinalAssessments } from "../common/TransformedAssessments";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
getFinalAssessments;

const secondaryTextLabelStyle = {
  letterSpacing: 0.5,
};

const primaryTextLabelStyle = {
  letterSpacing: 0.6,
};

const secondaryTextContainer = {
  marginTop: 5,
};

const innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0",
};
class IncompleteAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };

  componentDidMount = () => {
    const { addBreadCrumbs, title, userInfo, fetchProperties } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
    fetchProperties(
      [{ key: "accountId", value: userInfo.uuid }],
      [{ key: "userId", value: userInfo.uuid }, { key: "isActive", value: true }, { key: "limit", value: 100 }],
      [{ key: "userUuid", value: userInfo.uuid }, { key: "txnStatus", value: "FAILURE" }, { key: "limit", value: 100 }]
    );
  };

  onListItemClick = (item) => {
    const { route } = item;
    localStorage.setItem("draftId","");
    this.props.history.push(route);
  };

  render() {
    const { urls, history, loading, sortedProperties } = this.props;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        {sortedProperties && (
          <AssessmentList
            onItemClick={this.onListItemClick}
            history={history}
            items={sortedProperties}
            innerDivStyle={innerDivStyle}
            noAssessmentMessage="PT_NO_ASSESSMENT_MESSAGE2"
            button={false}
          />
        )}
      </Screen>
    );
  }
}

// const getfailedPropertiesById = (propertiesById, failedTransactions) => {
//   return (
//     failedTransactions &&
//     Object.keys(failedTransactions).reduce((result, moduleId) => {
//       if (propertiesById[moduleId] && !result[moduleId]) result[moduleId] = [];
//       result[moduleId] = propertiesById[moduleId];
//       return result;
//     }, {})
//   );
// };

// const filterData = (propertiesById, propertyName, ids) => {
//   return {
//     [propertyName]: {
//       ...propertiesById[propertyName],
//       propertyDetails:
//         propertiesById &&
//         propertiesById[propertyName]["propertyDetails"] &&
//         propertiesById[propertyName]["propertyDetails"].filter((item) => ids.indexOf(item.assessmentNumber) !== -1),
//     },
//   };
// };

// const mergeFinalData = (propertiesById, failedTransObj) => {
//   return (
//     propertiesById &&
//     Object.keys(propertiesById).reduce((result, current) => {
//       result[current] = filterData(propertiesById, current, failedTransObj[current])[current];
//       return result;
//     }, {})
//   );
// };

const getTransformedItems = (propertiesById, cities) => {
  return (
    propertiesById &&
    Object.values(propertiesById).reduce((acc, curr) => {
      const propertyDetail =
        curr.propertyDetails &&
        curr.propertyDetails.map((item) => {
          return {
            primaryText: <Label label={item.financialYear} fontSize="16px" color="#484848" labelStyle={primaryTextLabelStyle} bold={true} />,
            secondaryText: (
              <div style={{ height: "auto" }}>
                <Label
                  label={getCommaSeperatedAddress(curr.address, cities)}
                  labelStyle={secondaryTextLabelStyle}
                  fontSize="14px"
                  containerStyle={secondaryTextContainer}
                  color="#484848"
                />
                <Label
                  label={`Assessment No.: ${get(item, "assessmentNumber")}`}
                  labelStyle={secondaryTextLabelStyle}
                  fontSize="13px"
                  containerStyle={secondaryTextContainer}
                  color="#767676"
                />
              </div>
            ),
            epocDate: get(item, "auditDetails.lastModifiedTime"),
            route: `/property-tax/assessment-form?FY=${item.financialYear}&assessmentId=${item.assessmentNumber}&isReassesment=true&propertyId=${
              curr.propertyId
            }&tenantId=${item.tenantId}`,
            date: item.auditDetails ? getDateFromEpoch(get(item, "auditDetails.lastModifiedTime")) : "",
            status: "Payment failed",
          };
        });
      acc = [...acc, ...propertyDetail];
      return acc;
    }, [])
  );
};

const mapStateToProps = (state) => {
  const { properties, common } = state;
  const { urls } = state.app;
  const { cities } = common;
  const { loading, draftsById, propertiesById, failedPayments } = properties || {};

  let transformedDrafts = Object.values(draftsById).reduce((result, draft) => {
    if (
      (!draft.draftRecord.assessmentNumber || draft.draftRecord.assessmentNumber === "") &&
      get(draft, "draftRecord.financialYear.fields.button.value")
    ) {
      const address = {
        doorNo: get(draft, "draftRecord.propertyAddress.fields.houseNumber.value"),
        buildingName: get(draft, "draftRecord.propertyAddress.fields.colony.value"),
        street: get(draft, "draftRecord.propertyAddress.fields.street.value"),
        pincode: get(draft, "draftRecord.propertyAddress.fields.pincode.value"),
        locality: {
          name: get(draft, "draftRecord.propertyAddress.fields.mohalla.value"),
        },
        city: get(draft, "draftRecord.propertyAddress.fields.city.value"),
      };
      const financialYear = get(draft, "draftRecord.financialYear.fields.button.value");
      result.push({
        primaryText: <Label label={financialYear} fontSize="16px" color="#484848" labelStyle={primaryTextLabelStyle} bold={true} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label
              label={getCommaSeperatedAddress(address, cities)}
              labelStyle={secondaryTextLabelStyle}
              fontSize="14px"
              containerStyle={secondaryTextContainer}
              color="#484848"
            />
          </div>
        ),
        epocDate: get(draft, "auditDetails.lastModifiedTime"),
        route: `/property-tax/assessment-form?FY=${financialYear}&assessmentId=${draft.id}&tenantId=${draft.tenantId}`,
        financialYear: financialYear,
        assessmentNo: draft.id,
        date: draft.auditDetails ? getDateFromEpoch(get(draft, "auditDetails.lastModifiedTime")) : "",
        status: "Saved Draft",
      });
    }
    return result;
  }, []);

  const mergedData = failedPayments && propertiesById && getFinalAssessments(failedPayments, propertiesById);
  let finalFailedTransactions = mergedData && getTransformedItems(mergedData, cities);
  const incompleteAssessments = transformedDrafts
    ? finalFailedTransactions
      ? [...transformedDrafts, ...finalFailedTransactions]
      : [...transformedDrafts]
    : [];

  const sortedProperties = incompleteAssessments && orderby(incompleteAssessments, ["epocDate"], ["desc"]);

  return { urls, loading, sortedProperties };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchProperties: (queryObjectProperty, queryObjectDraft, queryObjectFailedPayments) =>
      dispatch(fetchProperties(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteAssessments);
