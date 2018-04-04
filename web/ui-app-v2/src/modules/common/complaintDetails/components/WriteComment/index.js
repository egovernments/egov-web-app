import React from "react";
import { List, Icon, TextField } from "../../../../../components";
import MaterialUITextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../../assets/images/faceOne.jpg";
import Label from "utils/translationNode";

import "./index.css";

const iconStyle = {
  marginLeft: "20px",
  height: "20px",
  width: "20px",
  transform: "rotate(-15deg)",
  marginBottom: "5px",
  position: "absolute",
  right: 16,
  top: 8,
};

const textFieldStyle = {
  backgroundColor: "#f2f2f2",
  display: "flex",
  alignItems: "center",
  border: "none",
  height: "38px",
  border: "solid 1px #e6e6e6",
  fontSize: "14px",
};

const WriteComment = ({ form, formKey, onChange, submitForm }) => {
  const fields = form.fields || {};
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: 16, position: "relative" }}>
      <Avatar size={33} src={faceOne} style={{ marginRight: "5px" }} />
      <TextField
        {...fields.comment}
        hintText={<Label label="CS_COMMON_COMMENTS_PLACEHOLDER2" />}
        style={textFieldStyle}
        onChange={(e, value) => onChange(formKey, "comment", value)}
        className="write-complaint-chat-field"
        fullWidth={true}
        multiLine={true}
        underlineShow={false}
        hintStyle={{ left: 5, bottom: "initial", fontSize: 14 }}
        inputStyle={{ fontSize: 14, paddingLeft: 5, paddingBottom: 15 }}
      />
      <Icon action="content" name="send" style={iconStyle} color={"#00bcd1"} onClick={() => submitForm(formKey)} />
    </div>
  );
};

export default WriteComment;

//props types check yet to add
