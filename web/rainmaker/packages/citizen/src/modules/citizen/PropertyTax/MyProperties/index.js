import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";

const innerDivStyle = {
  paddingTop: "16px",
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
    const { addBreadCrumbs, title, fetchProperties, numProperties, userInfo } = this.props;
    fetchProperties([{ key: "uuid", value: userInfo.uuid }]); //Unnecessary API call to prevent page break on reload
    // const { pathname } = location;
    // let url = pathname && pathname.split("/").pop();
    title && addBreadCrumbs({ title: `${title}(${numProperties})`, path: window.location.pathname });
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
          noAssessmentMessage="You have yet to assess for a property. Start Now:"
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
      primaryText: (
        <Label
          label={getCommaSeperatedAddress(property.address.buildingName, property.address.street)}
          fontSize="16px"
          color="#484848"
          bold={true}
          labelStyle={{ letterSpacing: 0.6, marginBottom: 15 }}
        />
      ),
      secondaryText: (
        <div className="rainmaker-displayInline">
          <Label label="Property Tax Assessment ID: " dark={true} labelStyle={{ letterSpacing: 0.6 }} />
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
    fetchProperties: (queryObject) => dispatch(fetchProperties(queryObject)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProperties);
