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
        <div className="assessment-displayInline" style={item.date ? { marginTop: "10px" } : { marginTop: "0px" }}>
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
            label={<Label buttonLabel={true} label="Access & Pay" fontSize="12px" />}
            primary={true}
            style={{
              height: 20,
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
      {item.receipt && (
        <div className="assessment-displayInline" style={{ marginTop: "10px" }}>
          <Label label="DOWNLOAD RECEIPT" labelStyle={{ marginLeft: "8px" }} color={"#fe7a51"} fontSize="12px" />
          <Icon style={{ marginLeft: 10, height: "18px" }} action="editor" name="vertical-align-bottom" color={"#fe7a51"} />
        </div>
      )}
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
        primaryText: item.primaryText, //<Label label="2018 - 2019" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />
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
                nestedItem.primaryText
                // <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />
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
  listItemStyle,
  noAssessmentMessage,
  yearDialogue,
  closeDialogue,
  onNewPropertyButtonClick,
  pageTitle,
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
    <PTList
      items={getListItems(items)}
      history={history}
      // label={pageTitle}
      onItemClick={onItemClick}
      innerDivStyle={innerDivStyle}
      listItemStyle={listItemStyle}
    />
  );
};

export default AssessmentList;
