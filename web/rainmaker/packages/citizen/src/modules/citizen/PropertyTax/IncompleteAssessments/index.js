import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getDateFromEpoch, getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import get from "lodash/get";

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
    fetchProperties(null, [{ key: "userId", value: userInfo.uuid }]);
  };

  render() {
    const { urls, history, transformedDrafts, loading } = this.props;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
          history={history}
          items={transformedDrafts}
          innerDivStyle={innerDivStyle}
          noAssessmentMessage="You have no incomplete assessments!"
          button={false}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { properties } = state;
  const { urls } = state.app;
  const { loading, draftsById } = properties || {};
  const numDrafts = draftsById && Object.keys(draftsById).length;
  get(JSON.parse(localStorage.getItem("user-info")), "uuid");
  const transformedDrafts = Object.values(draftsById).map((draft, index) => {
    return {
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
            // label={getCommaSeperatedAddress(get(draft, "draftRecord.financialYear.fields.button.value"))}
            label="Gold Plaza, Bellandur"
            labelStyle={secondaryTextLabelStyle}
            fontSize="14px"
            containerStyle={secondaryTextContainer}
            color="#484848"
          />
        </div>
      ),
      assessmentNo: draft.id,
      date: getDateFromEpoch(get(draft, "auditDetails.lastModifiedTime")),
      status: "Saved Draft",
    };
  });
  return { urls, loading, numDrafts, transformedDrafts };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchProperties: (queryObjectproperty, queryObjectDraft) => dispatch(fetchProperties(queryObjectproperty, queryObjectDraft)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteAssessments);
