import React from "react";
import { Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import PTList from "../PTList";

const getItemStatus = (item) => {
  let status = item.status;
  let styles = {
    paidIconStyle: {
      marginLeft: "10px",
      height: "20px",
    },
  };
  switch (status) {
    case "Paid":
      return (
        <div className="rainmaker-displayInline" style={{ marginTop: "10px", marginLeft: "50px" }}>
          <Icon action="navigation" name="check" style={styles.paidIconStyle} color={"#22b25f"} />
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#22b25f"} />
        </div>
      );
      break;
    case "Payment failed":
      return (
        <div className="rainmaker-displayInline" style={{ marginTop: "10px" }}>
          <Icon action="alert" name="warning" style={styles.paidIconStyle} color={"#e74c3c"} />
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#e74c3c"} />
        </div>
      );
      break;
    case "Saved Draft":
      return (
        <div className="rainmaker-displayInline" style={{ marginTop: "10px" }}>
          <Icon action="image" name="edit" style={styles.paidIconStyle} color={"#00bbd3"} />
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#00bbd3"} />
        </div>
      );
      break;
    default:
      return "";
  }
};

const getListItems = (items) => {
  return (
    items &&
    items.map((item, index) => {
      return {
        primaryText:
          typeof item.secondaryText === "object" ? (
            item.primaryText
          ) : (
            <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />
          ),
        secondaryText:
          typeof item.secondaryText === "object" ? (
            item.secondaryText
          ) : (
            <Label label={item.secondaryText} fontSize="14px" color="#484848" containerStyle={{ marginTop: "15px" }} />
          ),
        route: item.route,
        leftIcon: item.leftIcon,
        rightIcon:
          item.date || item.status ? (
            <div style={{ width: "auto" }}>
              <Label label={item.date} labelStyle={{ textAlign: "right" }} />
              {getItemStatus(item)}
            </div>
          ) : (
            item.rightIcon
          ),
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

const AssessmentList = ({ items, history, onItemClick, innerDivStyle }) => {
  return <PTList items={getListItems(items)} history={history} onItemClick={onItemClick} innerDivStyle={innerDivStyle} />;
};

export default AssessmentList;
