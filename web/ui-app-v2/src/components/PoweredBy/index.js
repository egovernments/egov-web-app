import React from "react";
import PropTypes from "prop-types";
import Image from "../Image";

const PoweredBy = ({ divProps, poweredByStyle, image }) => {
  return (
    <div {...divProps}>
      <span {...poweredByStyle}>Powered By</span>
      <Image {...image}/>
    </div>
  );
};

export default PoweredBy;

PoweredBy.propTypes = {
  style: PropTypes.object,
  poweredByStyle: PropTypes.object,
  icon: PropTypes.object,
};
