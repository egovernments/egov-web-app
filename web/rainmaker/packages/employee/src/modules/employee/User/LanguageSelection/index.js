import React, { Component } from "react";
import { connect } from "react-redux";
import { Banner } from "modules/common";
import { LanguageSelectionForm } from "modules/common";
import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";

class LanguageSelection extends Component {
  state = {
    value: localStorage.getItem("locale"),
    items: [
      {
        label: "ENGLISH",
        value: "en_IN",
      },
      {
        label: "हिंदी",
        value: "hi_IN",
      },
      {
        label: "ਪੰਜਾਬੀ",
        value: "pn_IN",
      },
    ],
  };

  onClick = (value) => {
    this.setState({ value });
    this.props.fetchLocalizationLabel(value);
  };

  onLanguageSelect = () => {
    this.props.history.push("/employee/user/login");
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

const dispatchToProps = (dispatch) => {
  return {
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
  };
};

export default connect(
  null,
  dispatchToProps
)(LanguageSelection);
