import React from "react";
import "./index.css";
import { TextArea } from "../../../../components";

const TextAreaComponent = () => {
  return (
    <div>
      <TextArea
        className="feedback-textarea"
        hintText="Problem Description"
        rows={4}
        hintStyle={{ color: "#969696", fontSize: "14px", top: "12px", left: "10px" }}
        underlineShow={false}
      />
    </div>
  );
};

export default TextAreaComponent;
