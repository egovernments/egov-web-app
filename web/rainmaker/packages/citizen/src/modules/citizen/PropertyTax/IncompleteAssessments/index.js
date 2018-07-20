import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";

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
      {
        primaryText: <Label label="2017 - 2018" fontSize="16px" labelStyle={primaryTextLabelStyle} color="#484848" bold={true} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label
              label="P-9/2, Banwinder Colony, alwal Road, Indirapuram"
              labelStyle={secondaryTextLabelStyle}
              fontSize="14px"
              containerStyle={secondaryTextContainer}
            />
          </div>
        ),
        date: "12-06-2018",
        status: "Saved Draft",
      },
      {
        primaryText: <Label label="2018 - 2019" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label
              label="EB-154, Maya Enclave, Jail Road, Harinagar"
              labelStyle={secondaryTextLabelStyle}
              fontSize="14px"
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
    const { urls, history } = this.props;
    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
          items={this.state.items}
          innerDivStyle={innerDivStyle}
          noAssessmentMessage="You have no incomplete assessments!"
          button={false}
        />
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
)(IncompleteAssessments);
