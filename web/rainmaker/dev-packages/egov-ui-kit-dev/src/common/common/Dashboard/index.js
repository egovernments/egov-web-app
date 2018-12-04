import React from "react";
import ModuleCard from "./component";
import Label from "egov-ui-kit/utils/translationNode";
import CityPicker from "./component/CityPicker";
import "./index.css";

const onButton1Click = (item, history, onPGRClick) => {
  const { route } = item;
  history && history.push(route);
  // if (item.moduleTitle === "Property Tax") {
  //   history && history.push(route);
  // } else if (item.moduleTitle === "Complaints") {
  //   //onPGRClick();
  //   history && history.push(route);
  // } else if (item.moduleTitle === "Finance") {
  //   history && history.push(route);
  // } else if (item.moduleTitle === "TradeLicense") {
  //   history && history.push(route);
  // }
};
const onButton2Click = (item, history) => {
  if (process.env.REACT_APP_NAME === "Citizen") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
    if (item.moduleTitle === "Complaints") {
      history && history.push("how-it-works");
    }
    if (item.moduleTitle === "TradeLicense") {
      history && history.push("trade-license/how-it-works");
    }
  }
};

const Dashboard = ({ moduleItems, userName, history, onPGRClick, onDialogueClose, dialogueOpen, renderCityPicker }) => {
  return (
    <div className="col-sm-12 landing-page-main-container">
      <Label className="landingPageUser" label={` Welcome ${userName}, `} />
      <ModuleCard onPGRClick={onPGRClick} items={moduleItems} onButton2Click={onButton2Click} onButton1Click={onButton1Click} history={history} />
      {/* {renderCityPicker && <CityPicker history={history} moduleItems={moduleItems} onDialogueClose={onDialogueClose} dialogueOpen={dialogueOpen} />} */}
    </div>
  );
};
export default Dashboard;
