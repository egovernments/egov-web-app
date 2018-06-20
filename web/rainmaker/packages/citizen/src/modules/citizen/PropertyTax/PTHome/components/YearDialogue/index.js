import React, { Component } from "react";
import { Dialog } from "components";
import SingleButton from "./components/SingleButton/index";
import "./index.css";

class YearDialog extends Component {
  render() {
    let { open, yearList, closeDialogue } = this.props;
    return (
      <Dialog
        open={open}
        children={[
          <div key={1}>
            <div className="dialogue-question">Which year’s taxes would you like to pay? </div>
            <div className="year-range-botton-cont">
              {yearList.map((item, index) => <SingleButton key={index} label={item} handleClose={closeDialogue} />)}
            </div>
          </div>,
        ]}
        bodyStyle={{ backgroundColor: "#ffffff" }}
        isClose={false}
        onRequestClose={closeDialogue}
        contentStyle={{ width: "20%" }}
      />
    );
  }
}

export default YearDialog;
