import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { BreadCrumbs, Icon } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";

const secondaryTextLabelStyle = {
  letterSpacing: 0.5,
};

const primaryTextLabelStyle = {
  letterSpacing: 0.6,
};

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
        status: "Partially Paid",
        statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
        receipt: true,
      },
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
    fetchProperties([{ key: "uuid", value: userInfo.uuid }]);
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

const mapStateToProps = (state) => {
  const { properties } = state;
  const { urls } = state.app;
  const { loading, propertiesById } = properties || {};
  const numProperties = propertiesById && Object.keys(propertiesById).length;
  const transformedProperties = Object.values(propertiesById).map((property, index) => {
    return {
      primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" bold={true} labelStyle={primaryTextLabelStyle} />,

      secondaryText: (
        <div style={{ height: "auto" }}>
          <Label
            label={property.propertyDetails[0] && property.propertyDetails[0].financialYear}
            containerStyle={secondaryTextContainer}
            labelStyle={secondaryTextLabelStyle}
            color="#484848"
          />
          <Label
            label={getCommaSeperatedAddress(property.address.buildingName, property.address.street)}
            containerStyle={secondaryTextContainer}
            labelStyle={secondaryTextLabelStyle}
            color="#484848"
          />
          <Label
            label={`Assessment No.: (${property.propertyDetails[0].assessmentNumber})`}
            containerStyle={secondaryTextContainer}
            labelStyle={secondaryTextLabelStyle}
            color="#484848"
          />
        </div>
      ),
      date: "12-06-2018",
      status: "Paid",

      receipt: true,
    };
  });

  return { urls, transformedProperties, loading, numProperties };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedAssessments);
