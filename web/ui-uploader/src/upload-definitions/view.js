import React from "react";
import DropDown from "../components/DropDownUi";
import FlatButton from "material-ui/FlatButton";

const View = ({
  templateDisabled,
  selectedModuleTemplate,
  moduleItems,
  selectedModule,
  moduleDefinitons,
  handleModuleDropDownChange,
  handleFileTypeDropDownChange,
  selectedModuleDefinition
}) => {
  return (
    <div>
      <DropDown
        style={{ marginRight: "15px" }}
        options={moduleItems}
        label="Module Name"
        selected={selectedModule}
        handleChange={handleModuleDropDownChange}
      />
      <DropDown
        options={moduleDefinitons}
        label="Module Definition"
        selected={selectedModuleDefinition}
        handleChange={handleFileTypeDropDownChange}
      />
      <FlatButton
        primary={true}
        disabled={templateDisabled}
        style={{ height: "60px" }}
        label={templateDisabled ? "No Template Found" : "Download Template"}
        target="_blank"
        href={selectedModuleTemplate}
      />
    </div>
  );
};
export default View;
