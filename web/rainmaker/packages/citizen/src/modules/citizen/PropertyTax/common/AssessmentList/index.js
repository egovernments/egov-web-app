import React from "react";
import { Label } from "components";
import PTList from "../PTList";

const getListItems = (items) => {
  return items.map((item, index) => {
    return {
      primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
      secondaryText: <Label label={item.secondaryText} fontSize="14px" color="#484848" containerStyle={{ marginTop: "15px" }} />,
    };
  });
};

const AssessmentList = ({ items }) => {
  return <PTList items={getListItems(items)} />;
};

export default AssessmentList;
