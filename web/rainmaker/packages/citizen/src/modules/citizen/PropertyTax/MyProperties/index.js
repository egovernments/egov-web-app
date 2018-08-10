import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getAddress } from "egov-ui-kit/utils/commons";
import get from "lodash/get";

const innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0",
};

class MyProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
      items: [
        {
          primaryText: <Label label="EB-154, Maya Enclave, Jail Road, Harinagar" fontSize="16px" color="#484848" bold={true} />,
          route: "/my-properties/property",
          secondaryText: "Property ID: PQL-98-876",
        },
        {
          primaryText: <Label label="P-9/2, Balwinder Colony, Palwal Road, Indirapuram" fontSize="16px" color="#484848" bold={true} />,
          route: "/my-properties/property",
          secondaryText: "Property ID: JML-34-756",
        },
      ],
    };
  }

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  componentDidMount = () => {
    const { addBreadCrumbs, title, fetchProperties, userInfo } = this.props;
    fetchProperties([{ key: "accountId", value: userInfo.uuid }]); //Unnecessary API call to prevent page break on reload
    // const { pathname } = location;
    // let url = pathname && pathname.split("/").pop();
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  onNewPropertyButtonClick = () => {
    this.setState({
      dialogueOpen: true,
    });
  };

  onListItemClick = (item) => {
    const { route: propertyId } = item;
    this.props.history.push(`/property-tax/my-properties/property/${propertyId}`);
  };

  // onBreadcrumbsClick = (index, path) => {
  //   const { history } = this.props;
  //   this.setState({
  //     selected: index,
  //   });
  //   history.push(path);
  // };

  render() {
    const { urls, history, transformedProperties, loading } = this.props;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
          // pageTitle={`My Properties (${numProperties})`}
          onItemClick={this.onListItemClick}
          innerDivStyle={innerDivStyle}
          items={transformedProperties}
          history={this.props.history}
          noAssessmentMessage="PT_NO_ASSESSMENT_MESSAGE3"
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
  const { properties, common } = state;
  const { urls } = state.app;
  const { cities } = common;
  const { loading, propertiesById } = properties || {};
  const numProperties = propertiesById && Object.keys(propertiesById).length;
  const transformedProperties = Object.values(propertiesById).map((property, index) => {
    const cityValue = get(property, "address.city");
    const mohalla = get(property, "address.locality.code");
    return {
      primaryText: (
        <Label
          label={getAddress(cities, cityValue, mohalla)}
          fontSize="16px"
          color="#484848"
          bold={true}
          labelStyle={{ letterSpacing: 0.6, marginBottom: 15 }}
        />
      ),
      secondaryText: (
        <div className="rainmaker-displayInline">
          <Label label="PT_PROPERTY_ASSESSMENT_ID" dark={true} labelStyle={{ letterSpacing: 0.6 }} />
          <Label label={property.propertyId} dark={true} labelStyle={{ letterSpacing: 0.6, marginLeft: 5 }} />
        </div>
      ),
      route: property.propertyId,
    };
  });
  return { urls, transformedProperties, loading, numProperties };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProperties);
