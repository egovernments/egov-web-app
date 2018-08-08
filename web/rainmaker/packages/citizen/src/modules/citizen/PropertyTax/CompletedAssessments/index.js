import React, { Component } from "react";
import { Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { getTransformedItems } from "../common/TransformedAssessments";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";

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
    const { addBreadCrumbs, title, userInfo, fetchProperties } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
    fetchProperties([{ key: "accountId", value: userInfo.uuid }], null, null);
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
    const { urls, history, transformedProperties, loading } = this.props;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
          innerDivStyle={innerDivStyle}
          items={transformedProperties}
          noAssessmentMessage="PT_NO_ASSESSMENT_MESSAGE1"
          button={true}
          yearDialogue={this.state.dialogueOpen}
          closeDialogue={this.closeYearRangeDialogue}
          onNewPropertyButtonClick={this.onNewPropertyButtonClick}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { properties } = state;
  const { urls } = state.app;
  const { loading, propertiesById } = properties || {};
  const numProperties = propertiesById && Object.keys(propertiesById).length;

  const transformedProperties = getTransformedItems(propertiesById);
  return { urls, transformedProperties, loading, numProperties };
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
)(CompletedAssessments);
