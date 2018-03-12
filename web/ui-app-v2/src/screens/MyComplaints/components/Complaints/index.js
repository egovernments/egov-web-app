import React from "react";
import Complaint from "../Complaint";

const Complaints = ({ complaints, onClick }) => {
  return (
    <div className="complaints-top-level-wrapper">
      {complaints.map((complaintItem, complaintIndex) => {
        return <Complaint key={complaintIndex} item={complaintItem} index={complaintIndex} onClick={onClick} />;
      })}
    </div>
  );
};

export default Complaints;
