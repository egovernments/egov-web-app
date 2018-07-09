import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";

const innerDivStyle = {
  paddingLeft: 0,
};

class MyProperties extends Component {
  state = {
    items: [
      {
        primaryText: "EB-154, Maya Enclave, Jail Road, Harinagar",
        route: "/property",
        secondaryText: "Property ID: PQL-98-876",
      },
      {
        primaryText: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
        route: "/property",
        secondaryText: "Property ID: JML-34-756",
      },
    ],
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "receipt-dialogue":
        break;
      default:
        console.log(path);
        this.props.history.push(path);
        break;
    }
  };

  render() {
    return (
      <Screen className="pt-home-screen">
        <AssessmentList onItemClick={this.onListItemClick} innerDivStyle={innerDivStyle} items={this.state.items} history={this.props.history} />
      </Screen>
    );
  }
}

export default MyProperties;
