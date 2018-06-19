import React, { Component } from "react";
import { Card, Button } from "components";

const ActionFooter = ({ label1, label2, primaryAction, secondaryAction }) => {
  return (
    <div className="wizard-footer col-xs-12" style={{ textAlign: "right", padding: 0 }}>
      <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
        {label1 && (
          <Button
            label={label1}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "36%" }}
            onClick={secondaryAction}
          />
        )}
        <Button
          label={label2}
          style={{ width: "36%" }}
          backgroundColor="#fe7a51"
          labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
          buttonStyle={{ border: 0 }}
          onClick={primaryAction}
        />
      </div>
    </div>
  );
};

export default ActionFooter;
