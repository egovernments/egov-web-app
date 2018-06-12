import React, { Component } from "react";
import { Tabs, Label, List, Icon, Card } from "components";
import { Link } from "react-router-dom";
import { Screen } from "modules/common";
import YearDialogue from "./components/YearDialogue";
import "./index.css";

const tabStyle = {
  letterSpacing: "0.6px",
};

const iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51",
};

const labelContainerStyle = {
  marginTop: "25px",
};

class PTHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
    };
  }

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

  render() {
    return (
      <Screen>
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon style={{ marginLeft: "8px" }} action="action" name="credit-card" color="#767676" />
                <Label label="PT_HOME_PAY" containerStyle={{ marginLeft: "33px" }} />
              </div>
              <div className="col-xs-12 row pt-service-list">
                <div
                  onClick={() => {
                    this.setState({ dialogueOpen: true });
                  }}
                  className="col-xs-4 text-center pt-new-property"
                >
                  <Icon style={iconStyle} action="communication" name="business" />
                  <Label label="New Property" fontSize="20px" containerStyle={labelContainerStyle} />
                </div>
                <div className="col-xs-4 text-center pt-search-property">
                  <Icon style={iconStyle} action="action" name="search" />
                  <Label label="Search Property" fontSize="20px" containerStyle={labelContainerStyle} />
                </div>
                <Link to="/citizen/property-tax/my-properties">
                  <div className="col-xs-4 text-center pt-my-properties">
                    <Icon style={iconStyle} action="custom" name="property-tax" />
                    <Label label="My Properties" fontSize="20px" containerStyle={labelContainerStyle} />
                  </div>
                </Link>
              </div>
            </div>
          }
        />
        <List
          onItemClick={() => {
            this.setState({ dialogueOpen: true });
          }}
          listContainerStyle={{ marginTop: "16px" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
          nestedListStyle={{ padding: "0px", background: "#f2f2f2" }}
          autoGenerateNestedIndicator={false}
          primaryTogglesNestedList={true}
          items={[
            {
              primaryText: <Label label="PT_PAYMENT_DRAFTS" />,
              leftIcon: <Icon action="image" name="edit" />,
              rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
            },
            {
              primaryText: <Label label="PT_MY_RECEIPTS" />,
              leftIcon: <Icon action="action" name="receipt" />,
              rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
            },
            {
              primaryText: <Label label="PT_EXAMPLES" />,
              leftIcon: <Icon action="custom" name="pt-example" />,
              rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
            },
            {
              primaryText: <Label label="PT_HOW_IT_WORKS" />,
              leftIcon: <Icon action="action" name="help" />,
              rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
            },
          ]}
        />
        <YearDialogue open={this.state.dialogueOpen} yearList={this.getYearList()} closeDialogue={this.closeYearRangeDialogue} />
      </Screen>
    );
  }
}

export default PTHome;
