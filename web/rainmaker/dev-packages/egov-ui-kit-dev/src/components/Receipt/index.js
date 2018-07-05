import React from "react";
import Label from "egov-ui-kit/utils/translationNode";

const Receipt = ({ receiptItems, innerDivStyle }) => {
  let { leftItems, rightItems } = receiptItems && receiptItems[0];
  const getItems = (items) => {
    return (
      <div>
        <div className={innerDivClass ? innerDivClass : "col-xs-12 col-sm-4"}>
          {items &&
            items.map((item, index) => {
              return <Label containerStyle={{ marginTop: 10 }} label={item.key} />;
            })}
        </div>
        <div className={innerDivClass ? innerDivClass : "col-xs-12 col-sm-4"}>
          {items &&
            items.map((item, index) => {
              return <Label containerStyle={{ marginTop: 10 }} label={item.value} />;
            })}
        </div>
      </div>
    );
  };

  return (
    receiptItems && (
      <div className="clearfix" style={{ height: "inherit", marginTop: "5px" }}>
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
