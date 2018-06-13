import React, { Component } from "react";
import { Card, Button } from "components";

const ActionFooter = ({ label1, label2 }) => {
  return (
    <div className="wizard-footer col-xs-12" style={{ textAlign: "right" }}>
      <div className="col-xs-6" style={{ float: "right" }}>
        {label1 && (
          <Button
            label={label1}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "50%" }}
          />
        )}
        <Button
          label={label2}
          style={{ width: "36%" }}
          backgroundColor="#fe7a51"
          labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
          buttonStyle={{ border: 0 }}
        />
      </div>
    </div>
  );
};

export default ActionFooter;
