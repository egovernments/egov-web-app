import React from "react";
import "./index.css";
import TextField from "material-ui/TextField";

const TextAreaComponent = () => {
  return (
    <div>
      <TextField
        className="feedback-textarea"
        hintText="Problem Description"
        rows={4}
        multiLine={true}
        fullWidth={true}
        floatingLabelStyle={{ color: "#767676 !important", fontSize: "20px", whiteSpace: "nowrap" }}
        hintStyle={{ color: "#969696", fontSize: "14px", top: "12px", left: "10px" }}
        underlineShow={false}
      />
    </div>
  );
};

export default TextAreaComponent;
