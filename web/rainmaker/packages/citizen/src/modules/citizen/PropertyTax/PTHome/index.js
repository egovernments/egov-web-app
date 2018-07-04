import React, { Component } from "react";
import { Label, List, Icon, Card } from "components";
import { Link } from "react-router-dom";
import { Screen } from "modules/common";
import "./index.css";

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

  listItems = [
    {
      primaryText: <Label label="Completed Assessments" />,
      route: "/citizen/property-tax/my-receipts",
      leftIcon: <Icon action="action" name="done" />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
    {
      primaryText: <Label label="PT_HOW_IT_WORKS" />,
      leftIcon: <Icon action="action" name="help" />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
    {
      primaryText: <Label label="PT_EXAMPLES" />,
      leftIcon: <Icon action="custom" name="pt-example" />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
  ];

  handleItemClick = (item, index) => {
    const { route } = item;
    this.props.history.push(route);
  };

  render() {
    let { listItems, handleItemClick } = this;
    return (
      <Screen className="pt-home-screen">
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon style={{ marginLeft: "8px" }} action="action" name="credit-card" color="#767676" />
                <Label label="PT_HOME_PAY" containerStyle={{ marginLeft: "33px" }} />
              </div>
              <div className="col-xs-12 row pt-service-list">
                <Link to="/citizen/property-tax/assess-pay">
                  <div
                    // onClick={() => {
                    //   this.setState({ dialogueOpen: true });
                    // }}
                    className="col-xs-4 text-center pt-new-property"
                  >
                    <Icon style={iconStyle} action="communication" name="business" />
                    <Label label="Assess & Pay" fontSize="20px" containerStyle={labelContainerStyle} />
                  </div>
                </Link>
                <Link to="/citizen/property-tax/incomplete-assessments">
                  <div className="col-xs-4 text-center pt-search-property">
                    <Icon style={iconStyle} action="image" name="edit" />
                    <Label label="Incomplete Assessments" fontSize="20px" containerStyle={labelContainerStyle} />
                  </div>
                </Link>
                <Link to="/citizen/property-tax/my-properties">
                  <div className="col-xs-4 text-center pt-my-properties">
                    <Icon style={iconStyle} action="custom" name="property-tax" />
                    <Label label="My Properties (2)" fontSize="20px" containerStyle={labelContainerStyle} />
                  </div>
                </Link>
              </div>
            </div>
          }
        />
        <List
          onItemClick={handleItemClick}
          listContainerStyle={{ marginTop: "16px" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
          nestedListStyle={{ padding: "0px", background: "#f2f2f2" }}
          autoGenerateNestedIndicator={false}
          primaryTogglesNestedList={true}
          items={listItems}
        />
      </Screen>
    );
  }
}

export default PTHome;
