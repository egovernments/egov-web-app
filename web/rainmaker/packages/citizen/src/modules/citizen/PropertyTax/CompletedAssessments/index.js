import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs, Icon } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";

const secondaryTextContainer = {
  marginTop: 3,
};

const innerDivStyle = {
  paddingTop: "16px",
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
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" containerStyle={secondaryTextContainer} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
      {
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" containerStyle={secondaryTextContainer} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} />
          </div>
        ),
        date: "12-06-2018",
        status: "Partially Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
      {
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" containerStyle={secondaryTextContainer} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
      {
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" containerStyle={secondaryTextContainer} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} />
          </div>
        ),
        date: "12-06-2018",
        status: "Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
      {
        primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,

        secondaryText: (
          <div style={{ height: "auto" }}>
            <Label label="2016-2017" containerStyle={secondaryTextContainer} />
            <Label label="P-9/2, Banwinder Colony, alwal Road, Indirapuram" containerStyle={secondaryTextContainer} />
            <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} />
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
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
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
    const { urls, history } = this.props;
    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
          innerDivStyle={innerDivStyle}
          items={this.state.items}
          noAssessmentMessage="You have no complete assessments."
          button={true}
          yearDialogue={this.state.dialogueOpen}
          closeDialogue={this.closeYearRangeDialogue}
          onNewPropertyButtonClick={this.onNewPropertyButtonClick}
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
)(CompletedAssessments);
