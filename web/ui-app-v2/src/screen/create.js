import React from "react";
import renderGroups from "./render-groups";

const Create = ({ groups, actionName }) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      {actionName !== "view" ? <button>Save</button> : ""}
    </div>
  );
};

export default Create;
