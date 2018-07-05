import React, { Component } from "react";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon } from "components";
import ReceiptDialog from "./components/ReceiptDialog";
import PropertyInformation from "./components/PropertyInformation";

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
      items: [
        {
          primaryText: "Property Information",
          leftIcon: <Icon action="action" name="info" />,
          nestedItems: PropertyInformation,
        },
        {
          primaryText: "Payment Record",
          leftIcon: <Icon action="action" name="receipt" />,
          nestedItems: [
            {
              primaryText: "2018 - 2019",
              route: "/receipt-dialogue",
            },
            {
              primaryText: "2017 - 2018",
              route: "/receipt-dialogue",
            },
            {
              primaryText: "Link Past Payments",
            },
          ],
        },
      ],
    };
  }

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "receipt-dialogue":
        this.setState({
          dialogueOpen: true,
        });
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  closeReceiptDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    return (
      <Screen className="pt-home-screen">
        <AssessmentList onItemClick={this.onListItemClick} items={this.state.items} history={this.props.history} />
        <ReceiptDialog open={this.state.dialogueOpen} closeDialogue={this.closeReceiptDialogue} />
      </Screen>
    );
  }
}

export default Property;
