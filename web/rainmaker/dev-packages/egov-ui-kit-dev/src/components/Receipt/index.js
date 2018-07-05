import React from "react";
import Label from "egov-ui-kit/utils/translationNode";

const Receipt = ({ receiptItems }) => {
  const getItems = (items) => {
    return (
      <div>
        <div className="col-xs-12 col-sm-6">
          {items &&
            items.map((item, index) => {
              return <Label label={item.key} />;
            })}
        </div>
        <div className="col-xs-12 col-sm-6">
          {items &&
            items.map((item, index) => {
              return <Label label={item.value} />;
            })}
        </div>
      </div>
    );
  };

  return (
    receiptItems && (
      <div className="clearfix" style={{ height: "inherit" }}>
        {receiptItems[0] && receiptItems[0].leftItems && <div className="col-xs-12 col-sm-6">{getItems(receiptItems[0].leftItems)}</div>}
        {receiptItems[0] && receiptItems[0].leftItems && <div className="col-xs-12 col-sm-6">{getItems(receiptItems[1].rightItems)}</div>}
      </div>
    )
  );
};
export default Receipt;

// <div className="clearfix">
// <div className="col-xs-12 col-sm-6">
//   <div className="col-xs-12 col-sm-6">
//     <Label label="House No:" />
//     <Label label="Street Name:" />
//     <Label label="Pincode:" />
//   </div>
//   <div className="col-xs-12 col-sm-6">
//     <Label label="E2/14" />
//     <Label label="Kandwa Road" />
//     <Label label="560098" />
//   </div>
// </div>
/* <div className="col-xs-12 col-sm-6">
        <div className="col-xs-12 col-sm-6">
          <Label label="Colony Name:" />
          <Label label="Mohalla:" />
          <Label label="Property ID:" />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Label label="Salunke Vihar" />
          <Label label="Harinagar" />
          <Label label="XC-345-76" />
        </div>
      </div> */
// </div>
