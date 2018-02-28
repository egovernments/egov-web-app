import React, { Component } from "react";
import Complaint from "../Complaint";

const Complaints = ({ complaints }) => {
  console.log(complaints);
  return (
    <div>
      {complaints.map((item, index) => {
        return <Complaint key={index} item={item} />;
      })}
      <div className="dummy-div-for-last-card" />
    </div>
  );
};

export default Complaints;
