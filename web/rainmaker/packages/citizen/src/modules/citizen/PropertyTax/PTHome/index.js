import React, { Component } from "react";
import { List, Icon, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { Link } from "react-router-dom";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import get from "lodash/get";
import "./index.css";

const iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51",
};

const listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit",
};

const labelContainerStyle = {
  marginTop: "25px",
};

const innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0",
};

const labelStyle = {
  letterSpacing: 0.6,
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
      primaryText: <Label label="Completed Assessments" color="#484848" fontSize="16px" bold={true} labelStyle={labelStyle} />,
      route: "/property-tax/completed-assessments",
      leftIcon: (
        <div style={listIconStyle}>
          <Icon action="action" name="done" />
        </div>
      ),
      rightIcon: (
        <div style={listIconStyle}>
          <Icon action="hardware" name="keyboard-arrow-right" />
        </div>
      ),
    },
    {
      primaryText: <Label label="How it works" color="#484848" fontSize="16px" bold={true} labelStyle={labelStyle} />,
      leftIcon: (
        <div style={listIconStyle}>
          <Icon action="action" name="help" />
        </div>
      ),
      rightIcon: (
        <div style={listIconStyle}>
          <Icon action="hardware" name="keyboard-arrow-right" />
        </div>
      ),
    },
    {
      primaryText: <Label label="Examples" color="#484848" fontSize="16px" bold={true} labelStyle={labelStyle} />,
      leftIcon: (
        <div style={listIconStyle}>
          <Icon action="custom" name="pt-example" />
        </div>
      ),
      rightIcon: (
        <div style={listIconStyle}>
          <Icon action="hardware" name="keyboard-arrow-right" />
        </div>
      ),
    },
  ];
  componentDidMount = () => {
    const { addBreadCrumTitle, title, location, fetchProperties, userInfo } = this.props;
    const { pathname } = location;
    let url = pathname && pathname.split("/").pop();
    (title || url) && addBreadCrumTitle(url && url === "property-tax" ? "" : title);
    fetchProperties([{ key: "accountId", value: userInfo.uuid }], [{ key: "userId", value: userInfo.uuid }]);
  };

  handleItemClick = (item, index) => {
    const { route } = item;
    this.props.history.push(route);
  };

  render() {
    let { listItems, handleItemClick } = this;
    const { numProperties, numDrafts, loading } = this.props;
    return (
      <Screen loading={loading} className="pt-home-screen">
        <Card
          textChildren={
            <div>
              <div className="rainmaker-displayInline">
                <Icon style={{ marginLeft: "18px" }} action="action" name="credit-card" color="#767676" />
                <Label
                  label="Pay Property Tax"
                  containerStyle={{ marginLeft: 25, marginTop: 3 }}
                  labelStyle={labelStyle}
                  color="#484848"
                  fontSize="16px"
                  bold={true}
                />
              </div>
              <div className="col-xs-12 row pt-service-list">
                <Link to="/property-tax/assess-pay">
                  <div className="col-xs-4 text-center pt-new-property">
                    <Icon style={iconStyle} action="communication" name="business" />
                    <Label label="Assess & Pay" fontSize="20px" containerStyle={labelContainerStyle} color="#484848" bold={true} />
                  </div>
                </Link>
                <Link to="/property-tax/incomplete-assessments">
                  <div className="col-xs-4 text-center pt-search-property">
                    <Icon style={iconStyle} action="image" name="edit" />
                    <Label
                      label={`Incomplete Assessments (${numDrafts})`}
                      fontSize="20px"
                      containerStyle={labelContainerStyle}
                      color="#484848"
                      bold={true}
                    />
                  </div>
                </Link>
                <Link to="/property-tax/my-properties">
                  <div className="col-xs-4 text-center pt-my-properties">
                    <Icon style={iconStyle} action="custom" name="property-tax" />
                    <Label label={`My Properties (${numProperties})`} fontSize="20px" containerStyle={labelContainerStyle} color="#484848" />
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
              listItemStyle={{ padding: "0px 20px", borderWidth: "10px 10px 0px" }}
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

const mapStateToProps = (state) => {
  const { properties } = state;
  const { propertiesById, draftsById, loading } = properties || {};
  const numProperties = propertiesById && Object.keys(propertiesById).length;
  // const numDrafts = draftsById && Object.keys(draftsById).length;
  const transformedDrafts = Object.values(draftsById).reduce((result, draft) => {
    if (
      (!draft.draftRecord.assessmentNumber || draft.draftRecord.assessmentNumber === "") &&
      get(draft, "draftRecord.financialYear.fields.button.value")
    ) {
      result.push(draft);
    }
    return result;
  }, []);

  const numDrafts = transformedDrafts.length;
  return { numProperties, numDrafts, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumTitle: (url) => dispatch(addBreadCrumbs(url)),
    fetchProperties: (queryObjectProperty, queryObjectDraft, queryObjectFailedPayments) =>
      dispatch(fetchProperties(queryObjectProperty, queryObjectDraft, queryObjectFailedPayments)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PTHome);
