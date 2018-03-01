import React, { Component } from "react";
import RatingsComponent from "./components/Ratings";
import ButtonGroupComponent from "./components/ButtonToggle";
import TextAreaComponent from "./components/TextArea";
import RaisedButton from "material-ui/RaisedButton";
import "./index.css";
import cloneDeep from "lodash/cloneDeep";

class Feedback extends Component {
  state = {
    items: [
      {
        label: "Service",
        style: {
          border: "1px solid #f5a623",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent",
          height: "auto",
          lineHeight: "30px",
        },
        labelStyle: {
          textTransform: "none",
          fontWeight: "900",
          color: "#484848",
        },
      },
      {
        label: "Resolution Time",
        style: {
          border: "1px solid #f5a623",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent",
          height: "auto",
          lineHeight: "30px",
        },
        labelStyle: {
          textTransform: "none",
          fontWeight: "900",
          color: "#484848",
        },
      },
      {
        label: "Other",
        style: {
          border: "1px solid #f5a623",
          borderRadius: "3px",
          marginRight: "5px",
          background: "transparent",
          height: "auto",
          lineHeight: "30px",
        },
        labelStyle: {
          textTransform: "none",
          fontWeight: "900",
          color: "#484848",
        },
      },
    ],
  };

  handleClick = (index) => {
    let { items } = this.state;
    let _items = cloneDeep(items);
    for (var i = 0; i < _items.length; i++) {
      _items[i].style["background"] = "transparent";
      _items[i].labelStyle["color"] = "#484848";
    }
    _items[index].style["background"] = "#f5a623";
    _items[index].labelStyle["color"] = "#ffffff";
    this.setState({ items: _items });
  };

  renderButtonGroups = () => {
    let { items } = this.state;
    return items.map((item, index) => {
      return (
        <ButtonGroupComponent
          key={index}
          item={item}
          onClick={() => {
            this.handleClick(index);
          }}
        />
      );
    });
  };

  render() {
    return (
      <div className="feedback-main-container">
        <div className="feedback-firstCard-container">
          <div className="feedback-firstCard-top">
            <span className="feedback-firstCard-heading">
              Your feedback is valuable to us.<br />rate our service.
            </span>
          </div>
          <RatingsComponent />
          <div className="feedback-firstCard-bottom">
            <span className="feedback-firstCard-subheading">What did you like from us?</span>
            <div className="feedback-buttongroup-cont">{this.renderButtonGroups()}</div>
          </div>
        </div>

        <div className="feedback-secondCard-container">
          <span className="feedback-textarea-label">Is there anything else you want to know?</span>
          <TextAreaComponent />
        </div>
        <div className="feedback-button-cont">
          <RaisedButton label="Submit" backgroundColor={`#f5a623`} style={{}} fullWidth={true} labelStyle={{ color: "#ffffff", fontWeight: "900" }} />
        </div>
      </div>
    );
  }
}

export default Feedback;
