import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Image from "../Image";
import pickerIcon from "./OpenCamera.png";
import FlatButton from "material-ui/FlatButton";

export default class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  // this function should be called in the container
  handleFileChange = (event) => {
    let input = event.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        let source = e.target.result;
        this.setState({
          file: source,
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  render() {
    return (
      <div>
        <div>
          <Image source={this.state.file} />
          <div>
            <input id="file1" type="file" onChange={this.handleFileChange} accept="image/x-png,image/gif,image/jpeg" style={{ display: "none" }} />
            <FlatButton icon={<Image source={pickerIcon} width="35" />} primary={true} />
          </div>
        </div>
      </div>
    );
  }
}
