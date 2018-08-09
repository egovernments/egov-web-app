import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { getAddress } from "egov-ui-kit/utils/commons";

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
      [{ key: "userUuid", value: userInfo.uuid }, { key: "txnStatus", value: "FAILURE" }]
    );
  };

  render() {
    const { urls, history, loading, incompleteAssessments } = this.props;
    console.log(incompleteAssessments);
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        {incompleteAssessments && (
          <AssessmentList
            history={history}
            items={incompleteAssessments}
            innerDivStyle={innerDivStyle}
            noAssessmentMessage="PT_NO_ASSESSMENT_MESSAGE2"
            button={false}
          />
        )}
      </Screen>
    );
  }
}

const getfailedPropertiesById = (propertiesById, failedTransactions) => {
  return (
    failedTransactions &&
    Object.keys(failedTransactions).reduce((result, moduleId) => {
      if (propertiesById[moduleId] && !result[moduleId]) result[moduleId] = [];
      result[moduleId] = propertiesById[moduleId];
      return result;
    }, {})
  );
};

/* console.log(failedTransObj); */

const filterData = (propertiesById, propertyName, ids) => {
  return {
    [propertyName]: {
      ...propertiesById[propertyName],
      propertyDetails:
        propertiesById &&
        propertiesById[propertyName]["propertyDetails"] &&
        propertiesById[propertyName]["propertyDetails"].filter((item) => ids.indexOf(item.assessmentNumber) !== -1),
    },
  };
};

const mergeFinalData = (propertiesById, failedTransObj) => {
  return (
    propertiesById &&
    Object.keys(propertiesById).reduce((result, current) => {
      result[current] = filterData(propertiesById, current, failedTransObj[current])[current];
      return result;
    }, {})
  );
};

const getTransformedItems = (propertiesById, cities) => {
  return (
    propertiesById &&
    Object.values(propertiesById).reduce((acc, curr) => {
      const cityValue = get(curr, "address.city");
      const mohalla = get(curr, "address.locality.code");
      const propertyDetail =
        curr.propertyDetails &&
        curr.propertyDetails.map((item) => {
          return {
            primaryText: <Label label={get(item, "financialYear")} fontSize="16px" color="#484848" labelStyle={primaryTextLabelStyle} bold={true} />,
            secondaryText: (
              <div style={{ height: "auto" }}>
                <Label
                  label={getAddress(cities, cityValue, mohalla)}
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
  const failedTransactionsConsumercode =
    failedPayments &&
    Object.values(failedPayments).map((transaction) => {
      return transaction.moduleId;
    });

  const failedTransObj =
    failedTransactionsConsumercode &&
    failedTransactionsConsumercode.reduce((result, current) => {
      if (!result[current.split(":")[0]]) result[current.split(":")[0]] = [];
      result[current.split(":")[0]].push(current.split(":")[1]);
      return result;
    }, {});
  let transformedDrafts = Object.values(draftsById).reduce((result, draft) => {
    if (
      (!draft.draftRecord.assessmentNumber || draft.draftRecord.assessmentNumber === "") &&
      get(draft, "draftRecord.financialYear.fields.button.value")
    ) {
      const cityValue = get(draft, "draftRecord.propertyAddress.fields.city.value");
      const mohalla = get(draft, "draftRecord.propertyAddress.fields.mohalla.value");
      result.push({
        primaryText: (
          <Label
            label={get(draft, "draftRecord.financialYear.fields.button.value")}
            fontSize="16px"
            color="#484848"
            labelStyle={primaryTextLabelStyle}
            bold={true}
          />
        ),
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label
              label={getAddress(cities, cityValue, mohalla)}
              labelStyle={secondaryTextLabelStyle}
              fontSize="14px"
              containerStyle={secondaryTextContainer}
              color="#484848"
            />
          </div>
        ),
        financialYear: get(draft, "draftRecord.financialYear.fields.button.value"),
        assessmentNo: draft.id,
        date: draft.auditDetails ? getDateFromEpoch(get(draft, "auditDetails.lastModifiedTime")) : "",
        status: "Saved Draft",
      });
    }
    return result;
  }, []);

  const failedProperties = getfailedPropertiesById(propertiesById, failedTransObj);
  const mergedData = failedProperties && mergeFinalData(failedProperties, failedTransObj);
  let finalFailedTransactions = mergedData && getTransformedItems(mergeFinalData(failedProperties, failedTransObj), cities);
  const incompleteAssessments = transformedDrafts && finalFailedTransactions && [...transformedDrafts, ...finalFailedTransactions];

  return { urls, loading, incompleteAssessments };
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
