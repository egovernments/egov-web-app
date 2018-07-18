import React from "react";
import { Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import PTList from "../PTList";
import BlankAssessment from "../BlankAssessment";
import "./index.css";

const getItemStatus = (item) => {
  let status = item.status;
  let styles = {
    paidIconStyle: {
      marginLeft: "10px",
      height: "18px",
    },
  };
  switch (status) {
    case "Paid":
      return (
        <div className="assessment-displayInline" style={{ marginTop: "10px", marginLeft: "50px" }}>
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#22b25f"} />
          <Icon action="navigation" name="check" style={styles.paidIconStyle} color={"#22b25f"} />
        </div>
      );
      break;
    case "Partially Paid":
      return (
        <div className="assessment-displayInline" style={{ marginTop: "10px" }}>
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#22b25f"} />
          <Icon action="navigation" name="check" style={styles.paidIconStyle} color={"#22b25f"} />
        </div>
      );
      break;
    case "Payment failed":
      return (
        <div className="assessment-displayInline" style={{ marginTop: "10px" }}>
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#e74c3c"} />
          <Icon action="alert" name="warning" style={styles.paidIconStyle} color={"#e74c3c"} />
        </div>
      );
      break;
    case "Saved Draft":
      return (
        <div className="assessment-displayInline" style={{ marginTop: "10px" }}>
          <Label label={item.status} labelStyle={{ marginLeft: "8px" }} color={"#00bbd3"} />
          <Icon action="image" name="edit" style={styles.paidIconStyle} color={"#00bbd3"} />
        </div>
      );
      break;
    case "ACCESS & PAY":
      return (
        <div className="assessment-displayInline">
          <Button
            label="Access & Pay"
            primary={true}
            style={{
              height: 25,
              lineHeight: "auto",
              minWidth: "inherit",
            }}
          />
        </div>
      );
    default:
      return "";
  }
};

const getRightIconItems = (item) => {
  return item.date || item.status || item.receipt || item.action ? (
    <div style={{ width: "auto" }}>
      {item.date && <Label label={item.date} labelStyle={{ textAlign: "right" }} />}
      {getItemStatus(item)}
      <div className="assessment-displayInline" style={{ marginTop: "10px" }}>
        <Label label="DOWNLOAD RECEIPT" labelStyle={{ marginLeft: "8px" }} color={"#fe7a51"} />
        <Icon style={{ marginLeft: 10, height: "18px" }} action="editor" name="vertical-align-bottom" color={"#fe7a51"} />
      </div>
    </div>
  ) : (
    item.rightIcon
  );
};

const getListItems = (items) => {
  return (
    items &&
    items.map((item, index) => {
      return {
        primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        secondaryText:
          item.secondaryText &&
          (typeof item.secondaryText === "object" ? (
            item.secondaryText
          ) : (
            <Label label={item.secondaryText} fontSize="14px" color="#484848" containerStyle={{ marginTop: "15px" }} />
          )),
        route: item.route,
        leftIcon: item.leftIcon,
        rightIcon: getRightIconItems(item),
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
                <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />
              ),
              secondaryText: nestedItem.secondaryText,
              route: nestedItem.route,
              rightIcon: getRightIconItems(nestedItem),
            };
          }),
      };
    })
  );
};

const AssessmentList = ({
  items,
  history,
  onItemClick,
  button,
  innerDivStyle,
  noAssessmentMessage,
  yearDialogue,
  closeDialogue,
  onNewPropertyButtonClick,
}) => {
  return items.length == 0 ? (
    <BlankAssessment
      noAssessmentMessage={noAssessmentMessage}
      button={button}
      dialogueOpen={yearDialogue}
      closeDialogue={closeDialogue}
      onButtonClick={onNewPropertyButtonClick}
    />
  ) : (
    <PTList items={getListItems(items)} history={history} onItemClick={onItemClick} innerDivStyle={innerDivStyle} />
  );
};

export default AssessmentList;
