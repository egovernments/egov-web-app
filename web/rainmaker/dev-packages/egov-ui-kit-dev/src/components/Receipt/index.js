import React from "react";
import Label from "egov-ui-kit/utils/translationNode";

const Receipt = ({ receiptItems, header }) => {
  return (
    receiptItems && (
      <div className="clearfix" style={{ height: "inherit", marginTop: "10px", marginBottom: "15px" }}>
        {header && <Label label={header} dark={true} bold={true} containerStyle={{ margin: "5px 0 10px 0" }} />}
        <div className="col-xs-12 col-sm-12" style={{ padding: "0px" }}>
          {receiptItems.map((item, index) => {
            return (
              <div key={index} className="col-sm-3 col-xs-12" style={{ marginBottom: 10 }}>
                <div className="col-sm-12 col-xs-12" style={{ padding: 0 }}>
                  <Label dark={false} labelStyle={{ letterSpacing: 0 }} label={item.key} fontSize="12px"/>
                </div>
                <div className="col-sm-12 col-xs-12" style={{ padding:"5px 0px 0px 0px" }}>
                  <Label dark={true} labelStyle={{ letterSpacing: 0 }} label={item.value} fontSize="16px"/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};
export default Receipt;
