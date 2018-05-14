import React, { Component } from "react";
import { Tabs, Label, List, Icon } from "components";
import Screen from "modules/common/Screen";
import YearDialogue from "./components/YearDialogue";

const tabStyle = {
  letterSpacing: "0.6px",
};

class PaymentStepOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
    };
  }

  getYearList() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let yearRange = [];
    var counter = 0;
    if (month <= 3) {
      return this.getLastFiveYear(yearRange, today.getFullYear() - 1, counter);
    } else {
      return this.getLastFiveYear(yearRange, today.getFullYear(), counter);
    }
  }

  getLastFiveYear(yearRange, currentYear, counter) {
    if (counter < 5) {
      counter++;
      yearRange.push(`${currentYear}-${currentYear + 1}`);
      this.getLastFiveYear(yearRange, currentYear - 1, counter);
    }
    return yearRange;
  }

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    return (
      <div>
        <Tabs
          tabs={[
            {
              label: (
                <div>
                  <Label color={"#ffffff"} label={`Access & Pay`} labelStyle={tabStyle} />
                </div>
              ),
              children: (
                <Screen>
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
                        primaryText: "New Property Assessment",
                        leftIcon: <Icon action="custom" name="property-tax" />,
                        rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
                      },
                      {
                        primaryText: "Drafts",
                        leftIcon: <Icon action="image" name="edit" />,
                        rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
                      },
                      {
                        primaryText: "Pending Assessments",
                        leftIcon: <Icon action="alert" name="warning" />,
                        rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
                      },
                      {
                        primaryText: "Paid Assessments",
                        leftIcon: <Icon action="action" name="check-circle" />,
                        rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
                      },
                    ]}
                  />
                  <YearDialogue open={this.state.dialogueOpen} yearList={this.getYearList()} closeDialogue={this.closeYearRangeDialogue} />
                </Screen>
              ),
            },
            {
              label: (
                <div>
                  <Label color={"#ffffff"} bold={true} label={`Receipts`} labelStyle={tabStyle} />
                </div>
              ),
              children: (
                <Screen>
                  <div className="tab2-content">Receipts</div>
                </Screen>
              ),
            },
            {
              label: (
                <div>
                  <Label color={"#ffffff"} bold={true} label={`About`} labelStyle={tabStyle} />
                </div>
              ),
              children: (
                <Screen>
                  <div className="tab2-content">About</div>
                </Screen>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

export default PaymentStepOne;
