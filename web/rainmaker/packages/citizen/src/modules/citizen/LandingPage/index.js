import React, { Component } from "react";
import { Dashboard } from "modules/common";
import { connect } from "react-redux";

class LandingPage extends Component {
  state = { mdmsResponse: {}, dialogueOpen: false };

  onPGRClick = () => {
    this.setState({
      dialogueOpen: true,
    });
  };
  onDialogueClose = () => {
    this.setState({
      dialogueOpen: false,
    });
  };

  getModuleItems = (citiesByModule) => {
    const { moduleData } = this;
    const modulesToShow = Object.keys(moduleData);
    return (
      citiesByModule &&
      Object.keys(citiesByModule).reduce((acc, item) => {
        modulesToShow.indexOf(item) > -1 &&
          acc.push({
            cities: citiesByModule[item].tenants.map((item) => {
              return item.code;
            }),
            ...moduleData[item],
          });
        return acc;
      }, [])
    );
  };

  moduleData = {
    PGR: {
      moduleTitle: "Complaints",
      moduleDescription:
        "mSeva Complaints offers an easy to use interface which enables you to lodge civic works related complaints. It also lets you track the status of your complaint and facilitates direct interaction with your municipality till its resolution.",
      button1: "Complaints",
      button2: "How it works?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "dashboard-propertytax",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
      className: "pgr-landing-card",
      //cities :
    },
    PT: {
      moduleTitle: "Property Tax",
      moduleDescription: "Assess, pay and track your Property Taxes online with mSeva Property Tax.",
      button1: "Property Tax",
      button2: "How it works?",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      route: "property-tax",
      iconName: "dashboard-complaint",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
      className: "pt-landing-card",
      // cities :
    },
  };

  render() {
    const { history, name, citiesByModule } = this.props;
    const { getModuleItems, onPGRClick, onDialogueClose } = this;
    const moduleItems = getModuleItems(citiesByModule) || [];
    const renderCityPicker = moduleItems && moduleItems.findIndex((item) => item.moduleTitle === "Complaints") > -1;
    return (
      <Dashboard
        moduleItems={moduleItems}
        history={history}
        userName={name}
        onPGRClick={onPGRClick}
        onDialogueClose={onDialogueClose}
        dialogueOpen={this.state.dialogueOpen}
        renderCityPicker={renderCityPicker}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, common } = state;
  const { citiesByModule } = common || {};
  const { userInfo } = auth;
  const name = userInfo && userInfo.name;

  return { name, citiesByModule };
};

export default connect(
  mapStateToProps,
  null
)(LandingPage);
