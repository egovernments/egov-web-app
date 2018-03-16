import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
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
    let { inputProps, pickIcon } = this.props;
    return (
      <div>
        <FlatButton icon={pickIcon} containerElement="label" disableTouchRipple={true}>
          <input type="file" {...inputProps} onChange={this.handleFileChange} style={{ display: "none" }} />
        </FlatButton>
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
