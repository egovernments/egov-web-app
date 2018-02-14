import React from "react";
import { Button } from "../components";
import renderGroups from "./render-groups";

const Create = ({
  resetFormData,
  isFormValid,
  submitFormData,
  groups,
  moduleAction
}) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      {moduleAction !== "view" ? (
        <div className="textcenter">
          <Button
            primary={true}
            disabled={!isFormValid}
            label="Save"
            style={{marginRight:"20px"}}
            onClick={() => submitFormData()}
          />
          {moduleAction === "create" ? (
            <Button label="Reset" onClick={() => resetFormData()} />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Create;
