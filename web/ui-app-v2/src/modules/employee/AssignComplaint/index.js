import React, { Component } from "react";
import Screen from "../../common/Screen";
import HeaderCard from "./components/HeaderCard";
import ListCard from "./components/ListCard";

class AssignComplaint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Screen>
        <HeaderCard />
        <ListCard />
      </Screen>
    );
  }
}

export default AssignComplaint;
