import React, { Component } from "react";
import { Card } from "../../../../components";
import { Image } from "../../../../components";
import complaintImage from "../../../../assets/people.jpg";
import FlatButton from "material-ui/FlatButton";
import "./index.css";
import "../../../../styles/app.css";
import Location from "material-ui/svg-icons/maps/place";
import TextArea from "../../../../components/TextArea";
import TextField from "material-ui/TextField";

const TextAreaComponent = () => {
  return (
    <div>
      <TextField
        className="feedback-textarea"
        hintText="Problem Description"
        rows={5}
        multiLine={true}
        fullWidth={true}
        floatingLabelStyle={{ color: "#767676 !important", fontSize: "20px", whiteSpace: "nowrap" }}
        hintStyle={{ color: "#969696", fontSize: "14px", top: "20px", zIndex: 1, left: "5px" }}
      />
    </div>
  );
};

export default TextAreaComponent;
