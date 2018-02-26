import React from "react";
import PropTypes from "prop-types";

const PoweredBy = ({ style, poweredByStyle, icon }) => {
  return (
    <div {...style}>
      <span {...poweredByStyle}>Powered By</span>
      <img {...icon} />
    </div>
  );
};

export default PoweredBy;

PoweredBy.propTypes = {
  style: PropTypes.object,
  poweredByStyle: PropTypes.object,
  icon: PropTypes.object,
};
