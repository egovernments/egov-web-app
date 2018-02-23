import React from 'react';
import PropTypes from "prop-types";

const PoweredBy = ({style,poweredBy,icon}) => {
  return (
    <div {...style}>
      <span {...poweredByStyle}>Powered By</span>
      <img {...icon}/>
    </div>
  );
};

export default PoweredBy;

PoweredBy.propTypes = {
  style:PropTypes.object,
  poweredBy:PropTypes.object,
  icon:PropTypes.object
}
