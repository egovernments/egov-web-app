import React from "react";
import Label from "egov-ui-kit/utils/translationNode";

const Receipt = ({ receiptItems, innerDivClass }) => {
  let { leftItems, rightItems } = receiptItems && receiptItems[0];
  const getItems = (items) => {
    return (
      <div>
        <div className={innerDivClass ? innerDivClass : "col-xs-12 col-sm-4"}>
          {items &&
            items.map((item, index) => {
              return <Label key={index} containerStyle={{ marginTop: 10 }} label={item.key} />;
            })}
        </div>
        <div className={innerDivClass ? innerDivClass : "col-xs-12 col-sm-4"}>
          {items &&
            items.map((item, index) => {
              return <Label key={index} containerStyle={{ marginTop: 10 }} label={item.value} />;
            })}
        </div>
      </div>
    );
  };

  return (
    receiptItems && (
      <div className="clearfix" style={{ height: "inherit", marginTop: "10px", marginBottom: "15px" }}>
        <div className="col-xs-12 col-sm-5" style={{ padding: "0px" }}>
          {getItems(leftItems)}
        </div>

        <div className="col-xs-12 col-sm-5" style={{ padding: "0px" }}>
          {getItems(rightItems)}
        </div>
      </div>
    )
  );
};
export default Receipt;
