import React from "react";
import Complaint from "../Complaint";

const Complaints = ({ complaints }) => {
  return (
    <div className="complaints-top-level-wrapper">
      {complaints.map((complaintItem, complaintIndex) => {
        return <Complaint key={complaintIndex} item={complaintItem} index={complaintIndex} />;
      })}
    </div>
  );
};

export default Complaints;
