import React, { Component } from "react";
import { Dashboard } from "modules/common";
import { connect } from "react-redux";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";

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
  componentDidMount = () => {
    const { fetchGeneralMDMSData } = this.props;
    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "citymodule",
              },
            ],
          },
        ],
      },
    };
    fetchGeneralMDMSData(requestBody, "tenant", ["citymodule"]);
  };

  getModuleItems = (generalMDMSDataById) => {
    const cityModule = (generalMDMSDataById && generalMDMSDataById.citymodule) || [];
    const { moduleData } = this;
    return (
      cityModule &&
      Object.keys(cityModule).reduce((acc, item) => {
        acc.push({
          cities: cityModule[item].tenants.map((item) => {
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
      button1: "mSeva Complaints",
      button2: "How it works?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "dashboard-complaint",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
      className: "pgr-landing-card",
      //cities :
    },
    PT: {
      moduleTitle: "Property Tax",
      moduleDescription: "Assess, pay and track your Property Taxes online with mSeva Property Tax.",
      button1: "mSeva Property Tax",
      button2: "FAQs",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      route: "property-tax",
      iconName: "dashboard-propertytax",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
      className: "pt-landing-card",
      // cities :
    },
  };

  render() {
    const { history, name, generalMDMSDataById } = this.props;
    const { getModuleItems, onPGRClick, onDialogueClose } = this;
    const moduleItems = getModuleItems(generalMDMSDataById) || [];
    return (
      <Dashboard
        moduleItems={moduleItems}
        history={history}
        userName={name}
        onPGRClick={onPGRClick}
        onDialogueClose={onDialogueClose}
        dialogueOpen={this.state.dialogueOpen}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, common } = state;
  const { generalMDMSDataById } = common || {};
  const { userInfo } = auth;
  const name = userInfo && userInfo.name;

  return { name, generalMDMSDataById };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
