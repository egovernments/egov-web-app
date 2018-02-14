import React from "react";
import { Button } from "../components";
import renderGroups from "./render-groups";

const Create = ({
  resetFormData,
  isFormValid,
  submitFormData,
  groups,
  actionName
}) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      {actionName !== "view" ? (
        <div>
          <Button
            primary={true}
            disabled={!isFormValid}
            label="Save"
            onClick={() => submitFormData()}
          />
          <Button label="Reset" onClick={() => resetFormData()} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Create;
