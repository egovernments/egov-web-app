import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "./components/HeaderCard";
import ListCard from "./components/ListCard";
import Button from "./components/Button";
import Label from "utils/translationNode";

class AssignComplaint extends Component {
  onAssignClick = () => {
    let { history } = this.props;
    history.push("/employee/complaint-assigned");
  };

  render() {
    return (
      <Screen>
        <HeaderCard />
        <ListCard />
        <Button label={<Label buttonLabel={true} label="ASSIGN" />} onClick={this.onAssignClick} />
      </Screen>
    );
  }
}

export default AssignComplaint;
