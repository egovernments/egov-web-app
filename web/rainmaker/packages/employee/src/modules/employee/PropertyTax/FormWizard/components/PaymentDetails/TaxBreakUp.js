import React from "react";
import { Label, Divider } from "components";
import { Card, CardHeader, CardText } from "material-ui/Card";

const options = [
  { value: "Full Amount", label: <Label label="Full Amount" color="#4848484" /> },
  { value: "Partial Amount", label: <Label label="Partial Amount" color="#4848484" /> },
];

const AdditionalDetails = ({ importantDates }) => {
  const taxHeadEstimates = JSON.parse(
    '[{"taxHeadCode":"PT_TAX","estimateAmount":2222,"category":"TAX"},{"taxHeadCode":"PT_UNIT_USAGE_EXEMPTION","estimateAmount":0,"category":"EXEMPTION"},{"taxHeadCode":"PT_FIRE_CESS","estimateAmount":600,"category":"TAX"},{"taxHeadCode":"PT_OWNER_EXEMPTION","estimateAmount":0,"category":"EXEMPTION"},{"taxHeadCode":"PT_TIME_REBATE","estimateAmount":366.86,"category":"EXEMPTION"},{"taxHeadCode":"PT_TIME_PENALTY","estimateAmount":0,"category":"EXEMPTION"},{"taxHeadCode":"PT_TIME_INTEREST","estimateAmount":0,"category":"PENALTY"}]'
  );
  const totalAmount = 1000;
  const { fireCess, intrest, penalty, rebate } = importantDates;
  return (
    <Card style={{ "background-color": "white" }}>
      <CardHeader
        className="addl-details"
        actAsExpander
        showExpandableButton
        closeIcon={<div className="view-details">View Details</div>}
        iconStyle={{}}
        title={
          <div className="tax-header">
            <Label label="PT_MAKE_PAYMENT_PT_DUE" className="tax-due-header" />
            <Label className="total-amount" label={`INR ${10000}`} />
          </div>
        }
      />
      <CardText expandable={true}>
        <div className="bill-dates-payment">
          <div className="detaild-bill">
            <div className="tax-breakup">
              <div className="header">Detailed Bill</div>
              <ul className="tax-list">
                {taxHeadEstimates &&
                  taxHeadEstimates.map((taxDetails, index) => {
                    const { taxHeadCode, taxHeadEstimates, category, estimateAmount } = taxDetails;
                    return (
                      !!estimateAmount && (
                        <li className="tax-item" key={index}>
                          <Label label={taxHeadCode} />
                          <Label label={`${category === "EXEMPTION" ? "-" : ""}${estimateAmount}`} />
                        </li>
                      )
                    );
                  })}
              </ul>
            </div>
            <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0, height: 2 }} />
            <div className="total-section">
              <Label label="Total" />
              <Label label={`${totalAmount}`} />
            </div>
          </div>
          <div className="date-details">
            <Label label="Important Dates" className="date-header" />
            <ul>
              {rebate && (
                <li>
                  <span>
                    <Label label={`Last Date for Rebate (${rebate.rate}% of PT)`} />
                  </span>
                  <span>{`${rebate.endingDay}/${rebate.fromFY && rebate.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
              {penalty && (
                <li>
                  <span>
                    <Label label={`Penalty (${penalty.rate}% of PT) applied from`} />
                  </span>
                  <span>{`${penalty.startingDay}/${penalty.fromFY && penalty.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
              {intrest && (
                <li>
                  <span>
                    <Label label={`Interest (${intrest.rate}% p.a. daily) applied from`} />
                  </span>
                  <span>{`${intrest.startingDay}/${intrest.fromFY && intrest.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/*<div className="emp-date-details">
          <Label label="Important Dates" />
          <ul>
            {rebate && (
              <li>
                <span>
                  <Label label={`Last Date for Rebate (${rebate.rate}% of PT)`} />
                </span>
                <span>{`${rebate.endingDay}/${rebate.fromFY && rebate.fromFY.slice(0, 4)}`}</span>
              </li>
            )}
            {penalty && (
              <li>
                <span>
                  <Label label={`Penalty (${penalty.rate}% of PT) applied from`} />
                </span>
                <span>{`${penalty.startingDay}/${penalty.fromFY && penalty.fromFY.slice(0, 4)}`}</span>
              </li>
            )}
            {intrest && (
              <li>
                <span>
                  <Label label={`Interest (${intrest.rate}% p.a. daily) applied from`} />
                </span>
                <span>{`${intrest.startingDay}/${intrest.fromFY && intrest.fromFY.slice(0, 4)}`}</span>
              </li>
            )}
          </ul>
        </div>*/}
        {
          // <div className="clearfix fare-section">
          //   <div className="col-sm-6" style={{ backgroundColor: "#f2f2f2", marginRight: 100, padding: 16 }}>
          //     <Label containerStyle={{ marginBottom: 16 }} color="#484848" label="Detailed Bill" bold={true} />
          //     {taxHeadEstimates &&
          //       taxHeadEstimates.map((item, index) => {
          //         return (
          //           item.estimateAmount > 0 && (
          //             <div className="clearfix" style={{ marginBottom: 8 }}>
          //               <div className="col-sm-9" style={{ padding: 0 }}>
          //                 <Label label={item.taxHeadCode} />
          //               </div>
          //               <div className="col-sm-3">
          //                 <Label
          //                   containerStyle={{ textAlign: "right" }}
          //                   className="pt-rf-price"
          //                   label={(item.category === "EXEMPTION" ? "- " : "") + `${item.estimateAmount}`}
          //                 />
          //               </div>
          //             </div>
          //           )
          //         );
          //       })}
          //     <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0, height: 2 }} />
          //     <div className="clearfix" style={{ marginTop: 8 }}>
          //       <div className="col-sm-9" style={{ padding: 0 }}>
          //         <Label label="Total" />
          //       </div>
          //       <div className="col-sm-3">
          //         <Label
          //           containerStyle={{ textAlign: "right" }}
          //           labelStyle={{ fontSize: "20px", fontWeight: 500, color: "#fe7a51" }}
          //           label={`${totalAmount}`}
          //         />
          //       </div>
          //     </div>
          //   </div>
          //   <div className="col-sm-6">
          //     <div className="date-details">
          //       <Label containerStyle={{ marginBottom: 16 }} color="#484848" label="Important Dates" bold={true} />
          //       <ul>
          //         {rebate && (
          //           <li>
          //             <span>
          //               <Label label={`Last Date for Rebate (${rebate.rate}% of PT)`} />
          //             </span>
          //             <span>{`${rebate.endingDay}/${rebate.fromFY && rebate.fromFY.slice(0, 4)}`}</span>
          //           </li>
          //         )}
          //         {penalty && (
          //           <li>
          //             <span>
          //               <Label label={`Penalty (${penalty.rate}% of PT) applied from`} />
          //             </span>
          //             <span>{`${penalty.startingDay}/${penalty.fromFY && penalty.fromFY.slice(0, 4)}`}</span>
          //           </li>
          //         )}
          //         {intrest && (
          //           <li>
          //             <span>
          //               <Label label={`Interest (${intrest.rate}% p.a. daily) applied from`} />
          //             </span>
          //             <span>{`${intrest.startingDay}/${intrest.fromFY && intrest.fromFY.slice(0, 4)}`}</span>
          //           </li>
          //         )}
          //       </ul>
          //     </div>
          //   </div>
          // </div>
        }
      </CardText>
    </Card>
  );
};

export default AdditionalDetails;
