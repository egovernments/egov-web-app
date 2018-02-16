import React from "react";
import { Button } from "../components";
import renderGroups from "./render-groups";

const Create = ({ resetFormData, isFormValid, submitFormData, groups }) => {
  return (
    <div className="row">
      {renderGroups(groups)}
      <div className="textcenter">
        <Button
          primary={true}
          disabled={!isFormValid}
          label="Save"
          style={{ marginRight: "20px" }}
          onClick={() => submitFormData()}
        />
        <Button label="Reset" onClick={() => resetFormData()} />
      </div>
    </div>
  );
};

export default Create;
