import React from "react";
import Group from "./group";

const renderGroups = (groups, moduleAction) => {
  return groups.map((group, groupIndex) => {
    return <Group key={groupIndex} moduleAction={moduleAction} group={group} />;
  });
};

export default renderGroups;
