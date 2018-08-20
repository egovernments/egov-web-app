import React, { Component } from "react";
import { Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { getCommaSeperatedAddress, getDateFromEpoch } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import { resetFormWizard } from "egov-ui-kit/utils/PTCommon";
import { getCompletedTransformedItems } from "../common/TransformedAssessments";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchProperties, getAssesmentsandStatus } from "egov-ui-kit/redux/properties/actions";
import orderby from "lodash/orderBy";

const innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0",
};

const secondaryTextLabelStyle = {
  letterSpacing: 0.5,
};

const primaryTextLabelStyle = {
  letterSpacing: 0.6,
};

const secondaryTextContainer = {
  marginTop: 5,
};
class CompletedAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };
  state = {
    dialogueOpen: false,
    items: [
      {
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" bold={true} labelStyle={primaryTextLabelStyle} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} />
            <Label
              label="P-9/2, Banwinder Colony, alwal Road, Indirapuram"
              containerStyle={secondaryTextContainer}
              labelStyle={secondaryTextLabelStyle}
            />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
    ],
  };

  componentDidMount = () => {
    const { addBreadCrumbs, title, userInfo, fetchProperties, getAssesmentsandStatus, form, removeForm } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
    // fetchProperties([{ key: "accountId", value: userInfo.uuid }], null, null, [
    //   { key: "userUuid", value: userInfo.uuid },
    //   { key: "txnStatus", value: "SUCCESS" },
    // ]);
    getAssesmentsandStatus([{ key: "accountId", value: userInfo.uuid }]);
    resetFormWizard(form, removeForm);
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
    const { urls, history, loading, sortedProperties } = this.props;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        {sortedProperties && (
          <AssessmentList
            innerDivStyle={innerDivStyle}
            items={sortedProperties}
            noAssessmentMessage="PT_NO_ASSESSMENT_MESSAGE1"
            button={true}
            history={history}
            yearDialogue={this.state.dialogueOpen}
            closeDialogue={this.closeYearRangeDialogue}
            onNewPropertyButtonClick={this.onNewPropertyButtonClick}
            hoverColor="#fff"
          />
        )}
      </Screen>
    );
  }
}
const mapStateToProps = (state) => {
  const { properties, common, app, form } = state;
  const { localizationLabels } = app;
  const { cities } = common;
  const { urls } = state.app;
  const { assessmentsByStatus, loading } = properties || {};
  const completedAssessments = getCompletedTransformedItems(assessmentsByStatus, cities, localizationLabels);
  const sortedProperties = completedAssessments && orderby(completedAssessments, ["epocDate"], ["desc"]);
  return { sortedProperties, urls, loading, form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    getAssesmentsandStatus: (queryObj) => dispatch(getAssesmentsandStatus(queryObj)),
    removeForm: (formkey) => dispatch(removeForm(formkey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedAssessments);
