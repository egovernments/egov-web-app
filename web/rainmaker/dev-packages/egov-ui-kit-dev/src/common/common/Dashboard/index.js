import React from "react";
import ModuleCard from "./component";
import Label from "egov-ui-kit/utils/translationNode";
import CityPicker from "./component/CityPicker";
import "./index.css";

const onButton1Click = (item, history, onPGRClick) => {
  const { route } = item;
  if (item.moduleTitle === "Property Tax") {
    history && history.push(route);
  }
  if (item.moduleTitle === "Complaints") {
    onPGRClick();
  }
};
const onButton2Click = (item, history) => {
  if (process.env.REACT_APP_NAME === "Citizen") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
    if (item.moduleTitle === "Complaints") {
      history && history.push("how-it-works");
    }
  }
};

const Dashboard = ({ moduleItems, userName, history, onPGRClick, onDialogueClose, dialogueOpen }) => {
  return (
    <div class="col-sm-12 ">
      <Label className="landingPageUser" label={` Welcome ${userName}, `} />
      <ModuleCard onPGRClick={onPGRClick} items={moduleItems} onButton2Click={onButton2Click} onButton1Click={onButton1Click} history={history} />
      <CityPicker history={history} moduleItems={moduleItems} onDialogueClose={onDialogueClose} dialogueOpen={dialogueOpen} />
    </div>
  );
};
export default Dashboard;
