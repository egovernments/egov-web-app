import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const PipeIcon = props => {
  return (
    <SvgIcon className="custom-icon" viewBox="0 0 24 24" {...props}>
      <path d="M22,14H20V16H14V13H16V11H14V6A2,2 0 0,0 12,4H4V2H2V10H4V8H10V11H8V13H10V18A2,2 0 0,0 12,20H20V22H22" />
    </SvgIcon>
  );
};

export default PipeIcon;
