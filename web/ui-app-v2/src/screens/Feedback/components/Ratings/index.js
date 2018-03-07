import React from "react";
import "./index.css";
import Ratings from "../../../../components/Ratings";

const RatingsComponent = ({ size, count }) => {
  return (
    <div className="feedback-ratings-cont">
      <Ratings className="feedback-ratings" size={23} count={6} half={false} />
    </div>
  );
};

export default RatingsComponent;
