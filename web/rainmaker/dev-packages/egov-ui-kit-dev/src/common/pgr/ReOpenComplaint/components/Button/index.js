import React from "react";

const hintStyle = {
  color: "rgba(0, 0, 0, 0.3799999952316284)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0.3px",
};
const handleCommentChange = () => {};
const TextAreaUi = () => {
  return (
    <TextArea
      id="reopencomplaint-comment-field"
      hintText="Type your comments"
      hintStyle={hintStyle}
      rowsMax={2}
      onChange={handleCommentChange}
      underlineShow={true}
      underlineStyle={{ borderColor: "#e0e0e0" }}
      underlineFocusStyle={{ borderColor: "#e0e0e0" }}
    />
  );
};

export default TextAreaUi;
