import React, { Component } from "react";
import { Dashboard } from "modules/common";
import { connect } from "react-redux";

class LandingPage extends Component {
  state = { mdmsResponse: {}, dialogueOpen: false };

  onPGRClick = () => {
    this.props.history.push("all-complaints");
  };
  onDialogueClose = () => {
    this.setState({
      dialogueOpen: false,
    });
  };

  getModuleItems = (citiesByModule) => {
    const { moduleData } = this;
    const tenantId = localStorage.getItem("tenant-id");
    const modulesToShow = Object.keys(moduleData);

    return (
      citiesByModule &&
      Object.keys(citiesByModule).reduce((acc, item) => {
        const index = citiesByModule[item].tenants.findIndex((tenant) => {
          return tenant.code === tenantId;
        });
        if (index > -1) {
          modulesToShow.indexOf(item) > -1 &&
            acc.push({
              cities: citiesByModule[item].tenants.map((item, key) => {
                return item.code;
              }),
              ...moduleData[item],
            });
        }
        return acc;
      }, [])
    );
  };

  moduleData = {
    PGR: {
      moduleTitle: "Complaints",
      button1: "mSeva Complaints",
      //borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "action",
      route: "all-complaints",
      iconName: "announcement",
      iconStyle: { width: "50px", height: "50px", marginTop: "10px", fill: "rgba(0, 0, 0, 0.6000000238418579)" },
    },
    PT: {
      moduleTitle: "Property Tax",
      button1: "mSeva Property Tax",
      //borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      iconName: "dashboard-complaint",
      route: "property-tax",
      iconStyle: { width: "60px", height: "60px", marginTop: "10px", fill: "rgba(0, 0, 0, 0.6000000238418579)" },
    },
    Finance: {
      moduleTitle: "Finance",
      button1: "Inbox",
      //borderLeftColor: { borderLeft: "4px solid #add8e6" },
      iconAction: "custom",
      iconName: "rupee",
      route: "services/EGF/inbox",
      iconStyle: { width: "50px", height: "50px", marginBottom: "10px", fill: "rgba(0, 0, 0, 0.6000000238418579)" },
    },
    TL: {
      moduleTitle: "TradeLicense",
      button1: "Mseva TradeLicense",
      // borderLeftColor: { borderLeft: "4px solid #add8e6" },
      iconAction: "places",
      iconName: "business-center",
      route: "tradelicense/search",
      iconStyle: { width: "50px", height: "50px", marginBottom: "10px", fill: "rgba(0, 0, 0, 0.6000000238418579)" },
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
        renderCityPicker={false}
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
