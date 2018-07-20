import React, { Component } from "react";
import { Dialog } from "components";
import SingleButton from "./components/SingleButton";
import "./index.css";

const getYearList = () => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let yearRange = [];
  var counter = 0;
  if (month <= 3) {
    return getLastFourYear(yearRange, today.getFullYear() - 1, counter);
  } else {
    return getLastFourYear(yearRange, today.getFullYear(), counter);
  }
};

const getLastFourYear = (yearRange, currentYear, counter) => {
  if (counter < 4) {
    counter++;
    yearRange.push(`${currentYear}-${currentYear + 1}`);
    getLastFourYear(yearRange, currentYear - 1, counter);
  }
  return yearRange;
};

class YearDialog extends Component {
  render() {
    let { open, closeDialogue } = this.props;
    return (
      <Dialog
        open={open}
        children={[
          <div key={1}>
            <div className="dialogue-question">Which year’s taxes would you like to pay? </div>
            <div className="year-range-botton-cont">
              {getYearList().map((item, index) => <SingleButton key={index} label={item} handleClose={closeDialogue} />)}
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
