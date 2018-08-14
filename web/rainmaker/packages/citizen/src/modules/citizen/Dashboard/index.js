import React, { Component } from "react";
import { connect } from "react-redux";
import ModuleCard from "./component";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

class Dashboard extends Component {
  moduleData = [
    {
      moduleTitle: "Complaints",
      moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipis cing elit. Donec rutrum felis eu sem egestas",
      modulePrimaryCaption: "COMPLAINTS HOME",
      moduleSecondaryCaption: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "file-send",
    },
    {
      moduleTitle: "Property Tax",
      moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipis cing elit. Donec rutrum felis eu sem egestas",
      modulePrimaryCaption: "PT HOME",
      moduleSecondaryCaption: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      iconName: "file-send",
      route: "property-tax",
    },
    // {
    //   moduleTitle: "Water & Sewerage",
    //   moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipis cing elit. Donec rutrum felis eu sem egestas",
    //   modulePrimaryCaption: "Pay",
    //   moduleSecondaryCaption: "How do i do?",
    //   borderLeftColor: { borderLeft: "4px solid #ffcc80" },
    //   iconAction: "custom",
    //   iconName: "water-tap",
    // },
  ];

  onButton1Click = (item) => {
    const { history } = this.props;
    const { route } = item;
    if (item.moduleTitle === "Property Tax") {
      history && history.push(route);
    }
  };
  onButton2Click = (item) => {
    const { history } = this.props;
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    } else if (item.moduleTitle === "Complaints") {
      history && history.push("how-it-works");
    }
  };

  render() {
    const { name, history } = this.props;
    const { onButton1Click, onButton2Click } = this;
    return (
      <div class="col-sm-12">
        <Label className="landingPageUser" label={` Welcome ${name}, `} />
        <ModuleCard items={this.moduleData} onButton1Click={onButton1Click} onButton2Click={onButton2Click} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { userInfo } = auth;
  const name = userInfo && userInfo.name;

  return { name };
};
export default connect(
  mapStateToProps,
  null
)(Dashboard);
