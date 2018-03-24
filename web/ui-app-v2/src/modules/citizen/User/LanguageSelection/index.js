import React, { Component } from "react";
import { connect } from "react-redux";
import Banner from "../../../common/Banner";
import LanguageSelectionForm from "../../../common/User/components/LanguageSelectionForm";
import { fetchLocalizationLabel } from "../../../../redux/actions/app";

class LanguageSelection extends Component {
  state = {
    value: "en_IN",
    items: [
      {
        label: "ENGLISH",
        value: "en_IN",
      },
      {
        label: "हिंदी",
        value: "hn_IN",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "pn_IN",
      },
    ],
  };

  componentDidMount = () => {
    this.props.fetchLocalizationLabel("en_IN");
  };

  onClick = (value) => {
    this.setState({ value });
    this.props.fetchLocalizationLabel(value);
  };

  onLanguageSelect = () => {
    this.props.history.push("/citizen/user/register");
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

const dispatchToProps = {
  fetchLocalizationLabel,
};

export default connect(null, dispatchToProps)(LanguageSelection);
