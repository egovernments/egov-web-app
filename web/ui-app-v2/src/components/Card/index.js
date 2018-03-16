import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const CardUi = ({ id, card, style = {}, textChildren, className = "" }) => {
  return (
    <div style={style} id={id} className={`rainmaker-card ${className}`}>
      {textChildren}
    </div>
  );
};

export default CardUi;

CardUi.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  textChildren: PropTypes.element,
};
