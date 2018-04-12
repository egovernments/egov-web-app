import React from "react";
import PropTypes from "prop-types";
import ImageLoader from "react-load-image";
import CircularProgress from "material-ui/CircularProgress";

function Preloader(props) {
  return <CircularProgress size={80} thickness={5} />;
}
// uses bootstrap classes img-responsive img-circle
const Image = ({ circular = false, className = "", style, source, height, width, onClick,isLazyLoading=true }) => {
  let classNames = circular ? `img-responsive img-circle` : `img-responsive`;
  classNames = className ? `${classNames} ${className}` : classNames;
  return isLazyLoading?(
    <ImageLoader src={source}>
      <img className={classNames} style={style} height={height} width={width} onClick={onClick} />
      <div>Error!</div>
      <Preloader />
    </ImageLoader>
  ):<img className={classNames} src={source} style={style} height={height} width={width} onClick={onClick} />
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
