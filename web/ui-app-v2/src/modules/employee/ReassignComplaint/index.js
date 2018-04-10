import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "../AssignComplaint/components/HeaderCard";
import ListCard from "../AssignComplaint/components/ListCard";
import Button from "../AssignComplaint/components/Button";
import Label from "utils/translationNode";

class ReassignComplaint extends Component {
  render() {
    return (
      <Screen>
        <HeaderCard />
        <ListCard />
        <Button label={<Label buttonLabel={true} label="RE-ASSIGN" />} />
      </Screen>
    );
  }
}

export default ReassignComplaint;
