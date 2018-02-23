import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Image = ({ source, height, width }) => {
  return (
    <img
      className="img-responsive"
      src={source}
      height={height}
      width={width}
    />
  );
};

Image.propTypes = {
  source: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Image;
