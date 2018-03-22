import React from "react";
import "./index.css";
import Ratings from "../../../../../components/Ratings";

const RatingsComponent = ({ size, count }) => {
  return (
    <div className="feedback-ratings-cont">
      <Ratings id="feedback-ratings" className="feedback-ratings" size={40} count={5} half={false} />
    </div>
  );
};

export default RatingsComponent;
