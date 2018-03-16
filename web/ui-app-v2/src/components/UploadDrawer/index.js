import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import FilePicker from "../FilePicker";
import Label from "../Label";
import "./index.css";

const iconStyle = {
  backgroundColor: "#3498db",
  marginLeft: "15px",
};
const inputProps = {
  accept: "image/*",
  multiple: false, //for selecting single or multiple files
};
const galleryIconBtn = (
  <Icon className="gallery-upload-drawer" id="uploadDrawerIcon" style={iconStyle} action="image" name={"image"} onClick={this.onGalleryClick} />
);

class UploadDrawer extends Component {
  onCameraClick = () => {
    //onCameraClick
  };
  onRemoveClick = () => {
    this.props.setProfilePic("");
  };
  picUpload = (file, url) => {
    this.props.setProfilePic(url);
  };
  onOverlayBodyClick = () => {
    this.props.onClickAddPic(false);
  };
  render() {
    return (
      <div>
        <div className="overlayBody" onClick={this.onOverlayBodyClick} />
        <div className="drawerContainer">
          <div className="iconContainer">
            {this.props.cameraIcon && (
              <div className="labelIconBox">
                <Icon
                  className="camera-upload-drawer"
                  id="uploadDrawerIcon"
                  style={iconStyle}
                  action="image"
                  name={"photo-camera"}
                  onClick={this.onCameraClick}
                />
                <Label className="cameraUploadlabel" label="Camera" color={"#484848"} labelStyle={this.props.labelStyle} />
              </div>
            )}
            {this.props.videoCamIcon && (
              <Icon className="video-upload-drawer" id="uploadDrawerIcon" style={iconStyle} action="image" name={"photo-camera"} />
            )}
            {this.props.galleryIcon && (
              <div className="labelIconBox">
                <FilePicker inputProps={inputProps} pickIcon={galleryIconBtn} handleimage={this.picUpload} />
                <Label className="galleryUploadlabel" label="Gallery" color={"#484848"} labelStyle={this.props.labelStyle} />
              </div>
            )}
            {this.props.removeIcon && (
              <div className="labelIconBox">
                <Icon
                  className="remove-upload-drawer"
                  id="uploadDrawerIcon"
                  style={iconStyle}
                  action="action"
                  name={"delete"}
                  onClick={this.onRemoveClick}
                />
                <Label className="removeUploadlabel" label="Remove" color={"#484848"} labelStyle={this.props.labelStyle} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

UploadDrawer.propTypes = {
  cameraIcon: PropTypes.bool,
  videoCamIcon: PropTypes.bool,
  galleryIcon: PropTypes.bool,
  removeIcon: PropTypes.bool,
  openUploadSlide: PropTypes.bool,
  labelStyle: PropTypes.object,
  setProfilePic: PropTypes.func,
  onClickAddPic: PropTypes.func,
};
export default UploadDrawer;
