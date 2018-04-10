import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "./components/HeaderCard";
import ListCard from "./components/ListCard";
import Button from "./components/Button";
import Label from "utils/translationNode";

class AssignComplaint extends Component {
  render() {
    return (
      <Screen>
        <HeaderCard />
        <ListCard />
        <Button label={<Label buttonLabel={true} label="ASSIGN" />} />
      </Screen>
    );
  }
}

export default AssignComplaint;
