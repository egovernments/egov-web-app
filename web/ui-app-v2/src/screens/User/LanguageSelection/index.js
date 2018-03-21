import React, { Component } from "react";
import Banner from "../../common/Banner";
import LanguageSelectionForm from "./components/LanguageSelectionForm";

class LanguageSelection extends Component {
  state = {
    items: [
      {
        label: "ENGLISH",
        value: "English",
      },
      {
        label: "हिंदी",
        value: "Hindi",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "Marati",
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
  };

  onLanguageSelect = () => {
    this.props.history.push("/register");
  };

  render() {
    const { items, value } = this.state;
    const { onLanguageSelect, onClick } = this;

    return (
      <Banner className="language-selection col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <LanguageSelectionForm items={items} value={value} onLanguageSelect={onLanguageSelect} onClick={onClick} />
      </Banner>
    );
  }
}

export default LanguageSelection;
