import React, { Component } from "react";
import PropTypes from "prop-types";
import { getImageUrlByFile } from "utils/commons";

// pass the index
class FilePicker extends Component {
  handleFileChange = (event) => {
    let input = event.target;
    let { maxFiles } = this.props.inputProps;

    if (input.files && input.files.length > 0) {
      let files = input.files;
      Object.keys(files)
        .slice(0, maxFiles)
        .forEach(async (key, index) => {
          const file = files[key];
          const imageUri = await getImageUrlByFile(file);
          this.props.handleimage(file, imageUri);
        });
    }
  };

  openFileDialog = () => {
    this.upload.click();
  };

  render() {
    const { inputProps, children } = this.props;
    const { multiple, accept } = inputProps;
    const { handleFileChange, openFileDialog } = this;
    return (
      <div onClick={openFileDialog}>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          ref={(ref) => (this.upload = ref)}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
