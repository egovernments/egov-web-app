import React from "react";
import "./index.css";
import Ratings from "../../../../components/Ratings";

const RatingsComponent = ({ size, count }) => {
  return (
    <div className="feedback-ratings-cont">
      <Ratings className="feedback-ratings" size={25} count={6} />
    </div>
  );
};

export default RatingsComponent;
