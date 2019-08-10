import React from "react";
import "./index.css";

const CountDetails = ({ count, total,status }) => {
  return (
    <div className="box">
      <div className="count-details">
        Showing {count} of {total} {status} complaints
      </div>
    </div>
  );
};

export default CountDetails;
