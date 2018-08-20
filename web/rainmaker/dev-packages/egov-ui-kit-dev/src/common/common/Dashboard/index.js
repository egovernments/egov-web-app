import React from "react";
import ModuleCard from "./component";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const onButton1Click = (item, history) => {
  const { route } = item;
  if (item.moduleTitle === "Property Tax") {
    history && history.push(route);
  }
};
const onButton2Click = (item, history) => {
  let userType = JSON.parse(localStorage.getItem("user-info")).type;

  if (userType === "CITIZEN") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
  }
};

const Dashboard = ({ moduleItems, userName, history }) => {
  return (
    <div class="col-sm-12">
      <Label className="landingPageUser" label={` Welcome ${userName}, `} />
      <ModuleCard items={moduleItems} onButton2Click={onButton2Click} onButton1Click={onButton1Click} history={history} />
    </div>
  );
};
export default Dashboard;
