import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "../components/Label";

const mapStateToProps = (state, ownProps) => {
  const { label, ...rest } = ownProps;
  let translatedLabel = state.app.localizationLabels[label];
  if (translatedLabel && typeof translatedLabel === "object" && translatedLabel.hasOwnProperty("message")) {
    translatedLabel = translatedLabel.message;
  }
  return { ...rest, label: translatedLabel };
};

export default connect(mapStateToProps)(Label);
