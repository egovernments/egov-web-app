import React, { Component } from "react";
import Complaint from "../Complaint";

const Complaints = ({ complaints }) => {
  console.log(complaints);
  return (
    <div>
      {complaints.map((complaintItem, complaintIndex) => {
        return <Complaint key={complaintIndex} item={complaintItem} />;
      })}
      <div className="dummy-div-for-last-card" />
    </div>
  );
};

export default Complaints;
