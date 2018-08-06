import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";

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
  state = {
    items: [
      {
        primaryText: <Label label="2016 - 2017" fontSize="16px" labelStyle={primaryTextLabelStyle} color="#484848" bold={true} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label
              label="EB-154, Maya Enclave, Jail Road"
              fontSize="14px"
              labelStyle={secondaryTextLabelStyle}
              containerStyle={secondaryTextContainer}
            />
            <Label label="Assessment No.: ZRN-453-98" fontSize="13px" labelStyle={secondaryTextLabelStyle} containerStyle={secondaryTextContainer} />
          </div>
        ),
        date: "12-06-2018",
        status: "Payment failed",
      },
    ],
  };

  componentDidMount = () => {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
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
  const transformedDrafts = Object.values(draftsById).map((draft, index) => {
    return {
      primaryText: (
        <Label
          label={draft.draftRecord.propertyDetails[0] && draft.draftRecord.propertyDetails[0].financialYear}
          fontSize="16px"
          color="#484848"
          labelStyle={primaryTextLabelStyle}
          bold={true}
        />
      ),
      secondaryText: (
        <div style={{ height: "auto" }}>
          <Label
            label={getCommaSeperatedAddress(draft.draftRecord.address.buildingName, draft.draftRecord.address.street)}
            labelStyle={secondaryTextLabelStyle}
            fontSize="14px"
            containerStyle={secondaryTextContainer}
            color="#484848"
          />
          {/* <Label label="Assessment No.: ZRN-453-98" fontSize="13px" labelStyle={secondaryTextLabelStyle} containerStyle={secondaryTextContainer} /> */}
        </div>
      ),
      assessmentNo: draft.id,
      date: draft.draftRecord.propertyDetails[0] && draft.draftRecord.propertyDetails[0].assessmentDate,
      status: "Saved Draft",
    };
  });
  return { urls, loading, numDrafts, transformedDrafts };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteAssessments);
