import React from "react";
import { Label, Divider } from "components";
import { Card, CardHeader, CardText } from "material-ui/Card";
import "./index.css";

const PropertyTaxDetails = ({ estimationDetails, importantDates }) => {
  const { taxHeadEstimates, totalAmount } = estimationDetails[0] || {};
  const { fireCess, intrest, penalty, rebate } = importantDates;
  return (
    <Card style={{ marginBottom: 20, "background-color": "white" }}>
      <CardHeader
        className="tax-calculation-card-header"
        actAsExpander={true}
        showExpandableButton={true}
        closeIcon={
          <div>
            <div className="pt-tax-calc-details-btn">View Details</div>
          </div>
        }
        iconStyle={{}}
        title={
          <div className="tax-header-price rainmaker-displayInline">
            <Label label="PT_MAKE_PAYMENT_PT_DUE" fontSize="16px" color="#484848" />
            <Label
              className="property-dues-total-amount"
              label={`INR ${totalAmount ? `${totalAmount}` : totalAmount === 0 ? "0" : "NA"}`}
              fontSize="16px"
              color="#484848"
            />
          </div>
        }
      />
      <CardText expandable={true}>
        <div className="clearfix fare-section">
          <div className="col-sm-6" style={{ backgroundColor: "#f2f2f2", marginRight: 100, padding: 16 }}>
            <Label containerStyle={{ marginBottom: 16 }} color="#484848" label="PT_MAKE_PAYMENT_DETAILED_BILL" bold={true} />
            {taxHeadEstimates &&
              taxHeadEstimates.map((item, index) => {
                return (
                  item.estimateAmount > 0 && (
                    <div key={index} className="clearfix" style={{ marginBottom: 8 }}>
                      <div className="col-sm-9" style={{ padding: 0 }}>
                        <Label label={item.taxHeadCode} />
                      </div>
                      <div className="col-sm-3">
                        <Label
                          containerStyle={{ textAlign: "right" }}
                          className="pt-rf-price"
                          label={(item.category === "EXEMPTION" ? "- " : "") + `${item.estimateAmount}`}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0, height: 2 }} />
            <div className="clearfix" style={{ marginTop: 8 }}>
              <div className="col-sm-9" style={{ padding: 0 }}>
                <Label label="PT_MAKE_PAYMENT_TOTAL" />
              </div>
              <div className="col-sm-3">
                <Label
                  containerStyle={{ textAlign: "right" }}
                  labelStyle={{ fontSize: "20px", fontWeight: 500, color: "#fe7a51" }}
                  label={totalAmount ? `${totalAmount}` : totalAmount === 0 ? "0" : "NA"}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="date-details">
              <Label containerStyle={{ marginBottom: 16 }} color="#484848" label="PT_MAKE_PAYMENT_IMPORTANT_DATES" bold={true} />
              <ul>
                {rebate &&
                  rebate.endingDay && (
                    <li>
                      <span>
                        <Label label={`Last Date for Rebate (${rebate.rate}% of PT)`} />
                      </span>
                      <span>{`${rebate.endingDay}/${rebate.fromFY && rebate.fromFY.slice(0, 4)}`}</span>
                    </li>
                  )}
                {penalty &&
                  penalty.startingDay && (
                    <li>
                      <span>
                        <Label label={`Penalty (${penalty.rate}% of PT) applied from`} />
                      </span>
                      <span>{`${penalty.startingDay}/${penalty.fromFY && penalty.fromFY.slice(0, 4)}`}</span>
                    </li>
                  )}
                {intrest &&
                  intrest.startingDay && (
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
        </div>
      </CardText>
    </Card>
  );
};

export default PropertyTaxDetails;
