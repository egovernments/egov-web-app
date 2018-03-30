import React from "react";
import "./index.css";
import { TextArea } from "../../../../../components";

const TextAreaComponent = ({ onChange }) => {
  return (
    <TextArea
      id="feedback-comments"
      hintText="Type your comments"
      style={{ marginTop: "10px" }}
      underlineShow={true}
      hintStyle={{ letterSpacing: "0.7px" }}
      rowsMax={3}
      onChange={onChange}
    />
  );
};

export default TextAreaComponent;
