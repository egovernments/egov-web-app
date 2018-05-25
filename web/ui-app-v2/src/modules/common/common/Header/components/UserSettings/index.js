import React, { Component } from "react";
import { DropDown, Icon, Image } from "components";
import person from "assets/images/faceTwo.jpg";
import "./index.css";

class UserSettings extends Component {
  state = {
    languageSelected: "English",
  };
  items = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Hindi",
      label: "Hindi",
    },
    {
      value: "Punjabi",
      label: "Punjabi",
    },
  ];

  onChange = (event, index, value) => {
    this.setState({ languageSelected: value });
  };

  render() {
    const { languageSelected } = this.state;
    const { items } = this;
    const { style } = this.props;
    return (
      <div className="userSettingsContainer">
        <DropDown onChange={this.onChange} style={style.baseStyle} labelStyle={style.label} dropDownData={items} value={languageSelected} />
        <Icon action="social" name="notifications" style={style.iconStyle} />
        <Image height={33} width={33} circular={true} source={person} />
      </div>
    );
  }
}

export default UserSettings;
