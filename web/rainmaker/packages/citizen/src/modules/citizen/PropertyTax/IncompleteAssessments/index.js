import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";

class IncompleteAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };
  state = {
    items: [
      {
        primaryText: "2016 - 2017",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Payment failed",
      },
      {
        primaryText: "2017 - 2018",
        secondaryText: "P-9/2, Banwinder Colony, alwal Road, Indirapuram",
        date: "12-06-2018",
        status: "Saved Draft",
      },
      {
        primaryText: "2015 - 2016",
        secondaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        date: "12-06-2018",
        status: "Payment failed",
      },
    ],
  };

  componentDidMount = () => {
    const { addBreadCrumTitle, title } = this.props;
    title && addBreadCrumTitle(title);
  };

  render() {
    const { urls } = this.props;
    return (
      <Screen>
        <BreadCrumbs url={urls} />
        <AssessmentList items={this.state.items} />
      </Screen>
    );
  }
}

const mapStateToProps = ({ app }) => {
  const { urls } = app;
  return { urls };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumTitle: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteAssessments);
