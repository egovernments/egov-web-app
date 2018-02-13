import React, { Component } from "react";
import renderGroups from "./render-groups";

const Create = ({ submitFormData, groups, actionName }) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      {actionName !== "view" ? (
        <button onClick={() => submitFormData()}>Save</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Create;
