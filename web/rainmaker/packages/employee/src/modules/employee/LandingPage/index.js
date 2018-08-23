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
      button1: "mSeva Complaints",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "dashboard-complaint",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
    },
    PT: {
      moduleTitle: "Property Tax",
      button1: "mSeva Property Tax",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      route: "property-tax",
      iconName: "dashboard-propertytax",
      iconStyle: { width: "90px", height: "120px", marginTop: "15px", fill: "#767676" },
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
