import React, { Component } from "react";
import Complaint from "../Complaint";

const Complaints = ({ complaints }) => {
  return (
    <div className="complaints-top-level-wrapper">
      {complaints.map((complaintItem, complaintIndex) => {
        return <Complaint key={complaintIndex} item={complaintItem} />;
      })}
    </div>
  );
};

export default Complaints;
