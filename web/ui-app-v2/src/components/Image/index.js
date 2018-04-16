import React from "react";
import PropTypes from "prop-types";
import ImageLoader from "react-load-image";
import CircularProgress from "material-ui/CircularProgress";

const Preloader = () => {
  return <CircularProgress size={80} thickness={5} />;
};

const getImageSource = (imageSource, size) => {
  const images = imageSource.split(",");
  if (!images.length) {
    return null;
  }
  switch (size) {
    case "small":
      imageSource = images[2];
      break;
    case "medium":
      imageSource = images[1];
      break;
    case "large":
    default:
      imageSource = images[0];
  }
  return imageSource || images[0];
};

const isImageSourceUrl = (imageSource) => {
  return /https?/.test(imageSource);
};

const Image = ({ circular = false, size = "large", className = "", style, source, height, width, onClick, isLazyLoading = false }) => {
  let classNames = circular ? `img-responsive img-circle` : `img-responsive`;
  const imageSource = (isImageSourceUrl(source) && getImageSource(source, size)) || source;
  classNames = className ? `${classNames} ${className}` : classNames;
  return isLazyLoading ? (
    <ImageLoader src={imageSource}>
      <img className={classNames} style={style} height={height} width={width} onClick={onClick} />
      <div>Error!</div>
      <Preloader />
    </ImageLoader>
  ) : (
    <img className={classNames} src={imageSource} style={style} height={height} width={width} onClick={onClick} />
  );
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
