import React, { Component } from "react";
import { FilePicker, Icon, Image } from "components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Label from "utils/translationNode";
import "./index.css";

const iconStyle = {
  width: "19px",
  height: "19px",
  fontSize: "12px",
};

const labelStyle = {
  letterSpacing: "0.6px",
  lineHeight: 1,
  margin: "0 auto",
  width: "75px",
};

const Placeholder = ({ className, onFilePicked, inputProps, hide }) => {
  return (
    <div className={`${className} upload-placeholder`} style={hide ? { visibility: "hidden" } : {}}>
      <FloatingActionButton backgroundColor="#767676" iconStyle={{ height: "40px", width: "40px" }} style={{ boxShadow: 0, marginBottom: "4px" }}>
        <FilePicker inputProps={inputProps} handleimage={onFilePicked}>
          <Icon id="image-upload" name="add-a-photo" action="image" style={{ height: "20px", width: "20px" }} color={"#ffffff"} />
        </FilePicker>
      </FloatingActionButton>
      <Label label="CS_COMMON_UPLOAD_PHOTOS" labelStyle={labelStyle} fontSize="12px" />
    </div>
  );
};

class ImageUpload extends Component {
  state = {
    images: [],
  };

  fillPlaceholder = (images, onFilePicked, inputProps) => {
    const placeholders = [];
    for (let i = 0; i < 3 - images.length; i++) {
      placeholders.push(<Placeholder key={i} onFilePicked={onFilePicked} hide={i === 1 ? true : false} />);
    }
    return placeholders;
  };

  removeImage = (imageIndex) => {
    const images = this.state.images.filter((image, index) => imageIndex !== index);
    this.setState({ images });
  };

  onFilePicked = (file, imageUrl) => {
    const currentImages = this.state.images || [];
    this.props.sendFile(file);

    if (currentImages.length < 3) {
      this.setState({
        images: currentImages.concat(imageUrl),
      });
    }
  };

  render() {
    const { onFilePicked, removeImage } = this;
    const { images } = this.state;
    const inputProps = { accept: "image/*", multiple: true };

    return (
      <div className="upload-photo-overlay">
        {!images.length ? (
          <div>
            <div className="upload-icon-cont">
              <FilePicker inputProps={inputProps} handleimage={onFilePicked}>
                <Icon id="image-upload" action="image" name="add-a-photo" style={iconStyle} color={"#ffffff"} />
              </FilePicker>
            </div>
            <Label label="CS_COMMON_UPLOAD_PHOTOS" labelStyle={labelStyle} fontSize="12px" />
          </div>
        ) : (
          <div className="upload-images-cont">
            {images.map((image, index) => {
              return (
                <div key={index} className="upload-image-cont">
                  <Image source={image} style={{ height: "100%" }} />
                  <div className="image-remove" onClick={() => removeImage(index)}>
                    <Icon id="image-close-icon" action="navigation" name="close" color="#ffffff" style={{ width: "14px", height: "14px" }} />
                  </div>
                </div>
              );
            })}
            {this.fillPlaceholder(images, onFilePicked, inputProps)}
          </div>
        )}
      </div>
    );
  }
}

export default ImageUpload;
