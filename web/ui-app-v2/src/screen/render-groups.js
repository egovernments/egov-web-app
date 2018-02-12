import React from "react";
import Group from "./group";

const renderGroups = groups => {
  return groups.map((group, groupIndex) => {
    return <Group key={groupIndex} group={group} />;
  });
};

export default renderGroups;
