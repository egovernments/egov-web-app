import React from "react";
import renderGroups from "./render-groups";

const Create = ({ resetFormData, submitFormData, groups, actionName }) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      {actionName !== "view" ? (
        <div>
          <button onClick={() => submitFormData()}>Save</button>
          <button onClick={() => resetFormData()}>Reset</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Create;
