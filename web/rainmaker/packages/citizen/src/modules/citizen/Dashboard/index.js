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
      modulePrimaryCaption: "File Complaint",
      moduleSecondaryCaption: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "file-send",
    },
    {
      moduleTitle: "Property Tax",
      moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipis cing elit. Donec rutrum felis eu sem egestas",
      modulePrimaryCaption: "Assess & Pay",
      moduleSecondaryCaption: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      iconName: "file-send",
    },
    {
      moduleTitle: "Water & Sewerage",
      moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipis cing elit. Donec rutrum felis eu sem egestas",
      modulePrimaryCaption: "Pay",
      moduleSecondaryCaption: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #ffcc80" },
      iconAction: "custom",
      iconName: "file-send",
    },
  ];
  render() {
    const { name } = this.props;

    return (
      <div class="col-sm-12">
        <div class="col-sm-12">
          <Label className="landingPageUser" label={` Welcome ${name}, `} />
        </div>
        {this.moduleData.map((moduleNewData) => {
          return (
            <ModuleCard
              moduleCardTitle={moduleNewData.moduleTitle}
              moduleCardDescription={moduleNewData.moduleDescription}
              modulePrimaryCaption={moduleNewData.modulePrimaryCaption}
              moduleSecondaryCaption={moduleNewData.moduleSecondaryCaption}
              borderLeftColor={moduleNewData.borderLeftColor}
              iconAction={moduleNewData.iconAction}
              iconName={moduleNewData.iconName}
            />
          );
        })}
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
