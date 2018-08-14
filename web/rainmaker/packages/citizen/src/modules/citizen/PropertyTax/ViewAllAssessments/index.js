import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { getTransformedItems } from "../common/TransformedAssessments";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import isEqual from "lodash/isEqual";

const innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0",
};

class ViewAllAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };
  state = {
    dialogueOpen: false,
  };

  componentDidMount = () => {
    const { renderCustomTitleForPt, customTitle } = this.props;
    renderCustomTitleForPt(customTitle);
  };

  componentWillReceiveProps = (nextProps) => {
    const { customTitle, renderCustomTitleForPt } = this.props;
    if (!isEqual(customTitle, nextProps.customTitle)) {
      renderCustomTitleForPt(nextProps.customTitle);
    }
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
    const { urls, history, loading, transformedItems, location } = this.props;
    let urlArray = [];
    const { pathname } = location;
    if (urls.length == 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls.length > 0 ? urls : urlArray} history={history} />
        {transformedItems && (
          <AssessmentList
            innerDivStyle={innerDivStyle}
            items={transformedItems}
            noAssessmentMessage="You have no past assessments."
            button={true}
            history={history}
            yearDialogue={this.state.dialogueOpen}
            closeDialogue={this.closeYearRangeDialogue}
            onNewPropertyButtonClick={this.onNewPropertyButtonClick}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { properties, common } = state;
  const { cities } = common;
  const { urls } = state.app;
  const { loading, propertiesById } = properties || {};
  const propertyId = ownProps.match.params.propertyId;
  const selPropertyDetails = propertiesById[propertyId];
  const customTitle = selPropertyDetails && selPropertyDetails.address && getCommaSeperatedAddress(selPropertyDetails.address, cities);
  const transformedItems = selPropertyDetails && getTransformedItems([selPropertyDetails]); // function implements Object.values for iteration

  return { urls, loading, transformedItems, urls, customTitle };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAllAssessments);
