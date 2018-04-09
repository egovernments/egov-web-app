import React, { Component } from "react";
import Screen from "../../common/Screen";
import ListCard from "../AssignComplaint/components/ListCard";
import "./index.css";

class AssignComplaint extends Component {
  render() {
    return (
      <div className="employee-directory-main-card">
        <ListCard />
      </div>
    );
  }
}

export default AssignComplaint;
