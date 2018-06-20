import React, { Component } from "react";
import { Label, Icon } from "components";
import PTList from "../common/PTList";
import { Screen } from "modules/common";

class MyProperties extends Component {
  drafts = [
    {
      name: "Draft-1",
      date: "22-MAR-18",
      rightIcon: <Icon action="alert" name="warning" />,
    },
    {
      name: "Draft-2",
      date: "04-JUN-18",
      rightIcon: <Icon action="alert" name="warning" />,
    },
  ];

  getListItems = (drafts) => {
    return drafts.map((draft, index) => {
      return {
        primaryText: <Label label={`${draft.name}(${draft.date})`} fontSize="16px" color="#484848" />,
        leftIcon: <Icon action="image" name="edit" />,
      };
    });
  };

  render() {
    let { getListItems, drafts } = this;
    return (
      <Screen>
        <PTList items={getListItems(drafts)} label="Drafts" />
      </Screen>
    );
  }
}

export default MyProperties;
