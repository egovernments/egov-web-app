import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs, Icon } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";

class CompletedAssessments extends Component {
  iconStyle = {
    marginLeft: "10px",
    height: "20px",
  };
  state = {
    items: [
      {
        primaryText: "INR 1300.00",
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" />
            <Label label="Assessment No.: ZRN-453-98" />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "INR 1300.00",

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" />
            <Label label="Assessment No.: ZRN-453-98" />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "INR 1300.00",

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" />
            <Label label="Assessment No.: ZRN-453-98" />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "INR 1300.00",

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" />
            <Label label="Assessment No.: ZRN-453-98" />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
      {
        primaryText: "INR 1300.00",

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={{ marginTop: 3 }} fontSize="14px" fontWeight="500" />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" fontSize="14px" containerStyle={{ marginTop: 3 }} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={{ marginTop: 3 }} fontSize="14px" />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      },
    ],
  };

  componentDidMount = () => {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  render() {
    const { urls, history } = this.props;
    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
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
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedAssessments);
