import React, { Component } from "react";
import { Label, List, Icon, Card } from "components";
import { Link } from "react-router-dom";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import "./index.css";

const iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51",
};

const labelContainerStyle = {
  marginTop: "25px",
};

const innerDivStyle = {
  paddingLeft: 50,
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
      primaryText: <Label label="Completed Assessments" color="#484848" />,
      route: "/property-tax/completed-assessments",
      leftIcon: <Icon action="action" name="done" style={{ marginLeft: 0 }} />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
    {
      primaryText: <Label label="PT_HOW_IT_WORKS" color="#484848" />,
      leftIcon: <Icon action="action" name="help" style={{ marginLeft: 0 }} />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
    {
      primaryText: <Label label="PT_EXAMPLES" color="#484848" />,
      leftIcon: <Icon action="custom" name="pt-example" style={{ marginLeft: 0 }} />,
      rightIcon: <Icon action="hardware" name="keyboard-arrow-right" />,
    },
  ];
  componentDidMount = () => {
    const { addBreadCrumTitle, title, location } = this.props;
    const { pathname } = location;
    let url = pathname && pathname.split("/").pop();
    (title || url) && addBreadCrumTitle(url && url === "property-tax" ? "" : title);
  };

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
                <Label label="PT_HOME_PAY" containerStyle={{ marginLeft: "25px" }} color="#484848" />
              </div>
              <div className="col-xs-12 row pt-service-list">
                <Link to="/property-tax/assess-pay">
                  <div className="col-xs-4 text-center pt-new-property">
                    <Icon style={iconStyle} action="communication" name="business" />
                    <Label label="Assess & Pay" fontSize="20px" containerStyle={labelContainerStyle} color="#484848" />
                  </div>
                </Link>
                <Link to="/property-tax/incomplete-assessments">
                  <div className="col-xs-4 text-center pt-search-property">
                    <Icon style={iconStyle} action="image" name="edit" />
                    <Label label="Incomplete Assessments" fontSize="20px" containerStyle={labelContainerStyle} color="#484848" />
                  </div>
                </Link>
                <Link to="/property-tax/my-properties">
                  <div className="col-xs-4 text-center pt-my-properties">
                    <Icon style={iconStyle} action="custom" name="property-tax" />
                    <Label label="My Properties (2)" fontSize="20px" containerStyle={labelContainerStyle} color="#484848" />
                  </div>
                </Link>
              </div>
            </div>
          }
        />
        <Card
          className="property-tax-card"
          textChildren={
            <List
              innerDivStyle={innerDivStyle}
              onItemClick={handleItemClick}
              // listContainerStyle={{ marginTop: "16px" }}
              listItemStyle={{ paddingLeft: "10px", borderBottom: "1px solid #e0e0e0" }}
              nestedListStyle={{ padding: "0px", background: "#f2f2f2" }}
              autoGenerateNestedIndicator={false}
              primaryTogglesNestedList={true}
              items={listItems}
            />
          }
        />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumTitle: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PTHome);
