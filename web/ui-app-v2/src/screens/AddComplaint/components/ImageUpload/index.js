import React from "react";
import { UploadDrawer, Icon, Label } from "../../../../components";
import "./index.css";

const iconStyle = {
  width: "19px",
  height: "19px",
  fontSize: "12px",
};

const labelStyle = {
  letterSpacing: "0.6px",
  lineHeight: 1,
};
const ImageUpload = () => {
  return (
    <div className="upload-photo-overlay">
      <div className="upload-icon-cont">
        <Icon action="image" name="add-a-photo" style={iconStyle} color={"#ffffff"} />
      </div>
      <Label label="UPLOAD" labelStyle={labelStyle} />
      <Label label="PHOTOS" labelStyle={labelStyle} />
    </div>
  );
};

export default ImageUpload;
