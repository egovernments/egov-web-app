import React, { Component } from "react";
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
        hintStyle={{ color: "#969696", fontSize: "14px", top: "20px", zIndex: 1, left: "5px" }}
      />
    </div>
  );
};

export default TextAreaComponent;
