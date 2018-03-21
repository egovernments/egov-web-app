import React from "react";
import PropTypes from "prop-types";

// uses bootstrap classes img-responsive img-circle
const Image = ({ circular = false, className = "", style, source, height, width, onClick }) => {
  let classNames = circular ? `img-responsive img-circle` : `img-responsive`;
  classNames = className ? `${classNames} ${className}` : classNames;
  return <img className={classNames} style={style} src={source} height={height} width={width} onClick={onClick} />;
};

Image.propTypes = {
  source: PropTypes.string,
  circular: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Image;
