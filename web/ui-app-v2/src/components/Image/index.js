import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Image = ({ className = "", style, source, height, width }) => {
  const classNames = className.trim().length
    ? `img-responsive ${className}`
    : `img-responsive`;
  return (
    <img
      className={classNames}
      style={style}
      src={source}
      height={height}
      width={width}
    />
  );
};

Image.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Image;
