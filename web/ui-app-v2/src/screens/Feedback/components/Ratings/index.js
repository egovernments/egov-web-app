import React, { Component } from "react";
import { Card } from "../../../../components";
import { Image } from "../../../../components";
import complaintImage from "../../../../assets/people.jpg";
import FlatButton from "material-ui/FlatButton";
import "./index.css";
import "../../../../styles/app.css";
import Location from "material-ui/svg-icons/maps/place";
import Ratings from "../../../../components/Ratings";
import ButtonToggle from "../../../../components/ButtonGroup";

const RatingsComponent = ({ size, count }) => {
  return (
    <div className="feedback-ratings-cont">
      <Ratings className="feedback-ratings" size={25} count={6} />
    </div>
  );
};

// class RatingComponent extends Component {
//   render() {
//     return (
//       <div className="feedback-main-container">
//         <div style={{ textAlign: "center" }}>
//           <span>
//             Your feedback is valuable to us.<br />rate our service.
//           </span>
//         </div>
//         <div>
//           <Ratings />
//         </div>
//         <div style={{ textAlign: "center" }}>
//           <span>What did you like from us?</span>
//         </div>
//       </div>
//     );
//   }
// }

export default RatingsComponent;
