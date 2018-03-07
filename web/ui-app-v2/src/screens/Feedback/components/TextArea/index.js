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
        hintStyle={{ color: "#969696", fontSize: "16px", top: "25px", zIndex: 1, left: "9px" }}
      />
    </div>
  );
};

export default TextAreaComponent;
