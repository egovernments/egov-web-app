import React, { Component } from "react";
import Label from "../Label";
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

  render() {
    let { inputProps, labelProps } = this.props;
    return (
      <div>
        {inputProps && <input type="file" {...inputProps} onChange={this.handleFileChange} />}
        {labelProps && <Label icon={<label htmlFor={inputProps.id}>{labelProps.icon}</label>} primary={true} />}
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
