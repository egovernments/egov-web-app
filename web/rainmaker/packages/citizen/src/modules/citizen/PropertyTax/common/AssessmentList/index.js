import React from "react";
import Label from "egov-ui-kit/utils/translationNode";
import PTList from "../PTList";

const getListItems = (items) => {
  return (
    items &&
    items.map((item, index) => {
      console.log(typeof item.secondaryText);
      return {
        primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        secondaryText:
          typeof item.secondaryText === "object" ? (
            item.secondaryText
          ) : (
            <Label label={item.secondaryText} fontSize="14px" color="#484848" containerStyle={{ marginTop: "15px" }} />
          ),
        route: item.route,
        leftIcon: item.leftIcon,
        nestedItems:
          item &&
          item.nestedItems &&
          item.nestedItems.map((nestedItem) => {
            return {
              primaryText: nestedItem.leftIcon ? (
                <div style={{ alignItems: "center", display: "flex" }}>
                  {nestedItem.leftIcon}
                  <Label label={nestedItem.primaryText} fontSize="14px" color="#484848" containerStyle={{ marginLeft: "8px" }} />
                </div>
              ) : (
                <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" />
              ),
              secondaryText: nestedItem.secondaryText,
              route: nestedItem.route,
            };
          }),
      };
    })
  );
};

const AssessmentList = ({ items, history, onItemClick }) => {
  return <PTList items={getListItems(items)} history={history} onItemClick={onItemClick} />;
};

export default AssessmentList;
