import React, { Component } from "react";
import { Label, Icon, Card } from "components";
import PTList from "../common/PTList";
import YearDialogue from "./components/YearDialogue";
import { Screen } from "modules/common";

class AssessPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
    };
  }
  items = [
    {
      primaryText: "My Properties",
      status: "Payment Pending",
      leftIcon: <Icon action="action" name="home" />,

      Addresses: [
        {
          address: "EB-154, Maya Enclave, Harinagar",
        },
        {
          address: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
        },
      ],
    },
    {
      primaryText: "Search Property",
      route: "/property-tax/search-property",
      status: "",
      leftIcon: <Icon action="action" name="search" />,
    },
  ];

  getYearList = () => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let yearRange = [];
    var counter = 0;
    if (month <= 3) {
      return this.getLastFourYear(yearRange, today.getFullYear() - 1, counter);
    } else {
      return this.getLastFourYear(yearRange, today.getFullYear(), counter);
    }
  };

  getLastFourYear(yearRange, currentYear, counter) {
    if (counter < 4) {
      counter++;
      yearRange.push(`${currentYear}-${currentYear + 1}`);
      this.getLastFourYear(yearRange, currentYear - 1, counter);
    }
    return yearRange;
  }

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  getListItems = (items) => {
    return items.map((item, index) => {
      return {
        primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        leftIcon: item.leftIcon,
        route: item.route,
        nestedItems:
          item.Addresses &&
          item.Addresses.map((address) => {
            return {
              primaryText: <Label label={address.address} fontSize="16px" color="#484848" />,
            };
          }),
      };
    });
  };

  render() {
    let { getListItems, items } = this;
    return (
      <Screen className="pt-home-screen">
        <Card
          textChildren={
            <div
              onClick={() => {
                this.setState({ dialogueOpen: true });
              }}
              className="rainmaker-displayInline"
              style={{ paddingLeft: "14px", alignItems: "center", cursor: "pointer" }}
            >
              <Icon action="content" name="add" color="#767676" style={{ height: "30px", width: "30px" }} />
              <Label label="Add New Property" containerStyle={{ marginLeft: "30px" }} labelStyle={{ fontWeight: 500 }} fontSize="16px" />
            </div>
          }
        />
        <PTList items={getListItems(items)} history={this.props.history} />;
        <YearDialogue open={this.state.dialogueOpen} yearList={this.getYearList()} closeDialogue={this.closeYearRangeDialogue} />
      </Screen>
    );
  }
}

export default AssessPay;
