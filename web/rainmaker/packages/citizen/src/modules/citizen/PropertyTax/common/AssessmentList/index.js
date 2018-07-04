import React from "react";
import Label from "egov-ui-kit/utils/translationNode";
import PTList from "../PTList";

const getListItems = (items) => {
  return items.map((item, index) => {
    return {
      primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
      secondaryText: <Label label={item.secondaryText} fontSize="14px" color="#484848" containerStyle={{ marginTop: "15px" }} />,
      route: item.route,
      nestedItems:
        item.nestedItems &&
        item.nestedItems.map((nestedItem) => {
          return {
            primaryText: nestedItem.leftIcon ? (
              <div style={{ alignItems: "center", display: "flex" }}>
                {nestedItem.leftIcon}
                <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" />
              </div>
            ) : (
              <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" />
            ),
            secondaryText: nestedItem.secondaryText,
          };
        }),
    };
  });
};

const AssessmentList = ({ items, history }) => {
  return <PTList items={getListItems(items)} history={history} />;
};

export default AssessmentList;
