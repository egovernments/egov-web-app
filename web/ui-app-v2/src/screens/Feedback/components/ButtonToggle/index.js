import React, { Component } from "react";
import { Card } from "../../../../components";
import { Image } from "../../../../components";
import "./index.css";
import "../../../../styles/app.css";
import ButtonToggle from "../../../../components/ButtonGroup";

const ButtonToggleComponent = ({ item, onClick }) => {
  return <ButtonToggle item={item} onClick={onClick} />;
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

export default ButtonToggleComponent;
