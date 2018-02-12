import React from "react";
import CreateHoC from "../hocs/create";
import Create from "./create";
import Search from "./search";

const Screen = ({ specs, actionName }) => {
  const renderScreen = () => {
    const groups = specs.hasOwnProperty("groups") ? specs.groups : [];

    switch (actionName) {
      case "create":
        return <Create actionName={actionName} groups={groups} />;
      case "update":
      case "view":
        const CreateWrapper = CreateHoC(Create, actionName);
        return <CreateWrapper actionName={actionName} groups={groups} />;
      case "search":
        return <Search groups={groups} />;

      default:
        break;
    }
  };

  return <div>{renderScreen()}</div>;
};

export default Screen;
