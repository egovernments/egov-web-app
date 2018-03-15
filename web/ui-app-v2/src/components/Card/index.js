import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const CardUi = props => {
  let { id, card, textChildren, className = "" } = props;
  return (
    <div id={id} className={`rainmaker-card ${className}`} {...card}>
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
