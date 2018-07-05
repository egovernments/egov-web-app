import React from "react";
import { List, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const PTList = ({ items, history, label, onItemClick }) => {
  // const onListItemClick = (item, index) => {
  //   const { route } = item;
  //   console.log(item);
  //   console.log(route);
  //   let path = route && route.slice(1);

  //   switch (path) {
  //     case "receipt-dialogue":
  //       console.log(path);
  //       this.setState({
  //         logoutPopupOpen: true,
  //       });
  //       break;
  //     default:
  //       history.push(path);
  //       break;
  //   }
  // };
  return (
    <div>
      {label && (
        <Label
          label={label}
          containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
      )}
      <Card
        textChildren={
          <List
            items={items}
            listItemStyle={{ marginLeft: "10px", borderBottom: "1px solid #e0e0e0" }}
            nestedListStyle={{ marginLeft: "35px", padding: "0px" }}
            primaryTogglesNestedList={true}
            onItemClick={onItemClick}
          />
        }
      />
    </div>
  );
};

export default PTList;
