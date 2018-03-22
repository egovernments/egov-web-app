import React from "react";
import { UploadDrawer, Icon, Label, Image } from "../../../../components";
import FloatingActionButton from "material-ui/FloatingActionButton";
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

const ImageUpload = ({ images, removeImage, addImage }) => {
  return (
    <div className="upload-photo-overlay" onClick={addImage}>
      {!images.length ? (
        <div>
          <div className="upload-icon-cont">
            <Icon action="image" name="add-a-photo" style={iconStyle} color={"#ffffff"} />
          </div>
          <Label label="UPLOAD" labelStyle={labelStyle} fontSize="12px" />
          <Label label="PHOTOS" labelStyle={labelStyle} fontSize="12px" />
        </div>
      ) : (
        <div className="upload-images-cont">
          {images.map((image, index) => {
            return (
              <div className="upload-image-cont" key={index}>
                <Image source={image.imageSource} style={{ height: "100%" }} />
                <div className="image-remove" onClick={removeImage}>
                  <Icon action="navigation" name="close" color="#ffffff" style={{ width: "14px", height: "14px" }} />
                </div>
              </div>
            );
          })}
          {images.length < 3 ? (
            <div className="upload-placeholder">
              <FloatingActionButton
                backgroundColor="#767676"
                iconStyle={{ height: "40px", width: "40px" }}
                style={{ boxShadow: 0, marginBottom: "4px" }}
              >
                <Icon name="add-a-photo" action="image" style={{ height: "20px", width: "20px" }} />
              </FloatingActionButton>
              <Label label="UPLOAD" labelStyle={labelStyle} fontSize="12px" />
              <Label label="PHOTOS" labelStyle={labelStyle} fontSize="12px" />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
