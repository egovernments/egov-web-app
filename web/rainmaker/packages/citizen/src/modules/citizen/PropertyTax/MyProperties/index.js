import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import Label from "egov-ui-kit/utils/translationNode";
import { connect } from "react-redux";
import { Screen } from "modules/common";
import { BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/action";

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
          primaryText: <Label label="EB-154, Maya Enclave, Jail Road, Harinagar" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          route: "/my-properties/property",
          secondaryText: "Property ID: PQL-98-876",
        },
        {
          primaryText: (
            <Label label="P-9/2, Balwinder Colony, Palwal Road, Indirapuram" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />
          ),

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
    const { addBreadCrumbs, title, fetchProperties } = this.props;
    fetchProperties();
    // const { pathname } = location;
    // let url = pathname && pathname.split("/").pop();
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  onNewPropertyButtonClick = () => {
    this.setState({
      dialogueOpen: true,
    });
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "receipt-dialogue":
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  // onBreadcrumbsClick = (index, path) => {
  //   const { history } = this.props;
  //   this.setState({
  //     selected: index,
  //   });
  //   history.push(path);
  // };

  render() {
    const { urls, location, history, transformedProperties, loading } = this.props;
    const { pathname } = location;
    return (
      <Screen loading={loading}>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList
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

const getCommaSeperatedAddress = (buildingName, street) => {
  return `${buildingName}, ${street}`;
};

const mapStateToProps = (state) => {
  const { urls } = state.app;
  const { loading } = state.properties;
  const { propertiesById } = state.properties || {};
  const transformedProperties = Object.values(propertiesById).map((property, index) => {
    return {
      primaryText: getCommaSeperatedAddress(property.address.buildingName, property.address.street),
      secondaryText: property.propertyId,
    };
  });
  return { urls, transformedProperties, loading };
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
