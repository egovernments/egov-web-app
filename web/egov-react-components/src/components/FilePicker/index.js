import React, { Component } from "react";
import PropTypes from "prop-types";

class FilePicker extends Component {
  handleFileChange = (event) => {
    let input = event.target;
    if (input.files && input.files.length > 0) {
      let files = input.files;
      Object.keys(files).forEach((key, index) => {
        var reader = new FileReader();
        reader.onload = (e) => {
          let fileurl = e.target.result;
          this.props.handleimage(files[key], fileurl);
        };

        reader.readAsDataURL(files[key]);
      });
    }
  };

  openFileDialog = () => {
    this.upload.click();
  };

  render() {
    const { inputProps, children } = this.props;
    const { handleFileChange, openFileDialog } = this;
    return (
      <div onClick={openFileDialog}>
        <input type="file" {...inputProps} ref={(ref) => (this.upload = ref)} style={{ display: "none" }} onChange={handleFileChange} />
        {children}
      </div>
    );
  }
}

FilePicker.propTypes = {
  "inputProps.accept": PropTypes.string,
  "inputProps.id": PropTypes.string,
  "inputProps.multiple": PropTypes.bool,
  "labelProps.icon": PropTypes.node,
};

export default FilePicker;
