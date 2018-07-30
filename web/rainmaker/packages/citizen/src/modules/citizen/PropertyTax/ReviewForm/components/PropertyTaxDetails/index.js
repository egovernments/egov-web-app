import React from "react";
import { Label } from "components";
import { Card, CardHeader, CardText } from "material-ui/Card";
import "./index.css";

const PropertyTaxDetails = ({ estimationDetails, importantDates }) => {
  const { taxHeadEstimates, totalAmount } = estimationDetails[0];
  const { fireCess, intrest, penalty, rebate } = importantDates;
  return (
    <Card style={{ marginBottom: 200, "background-color": "white" }}>
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
          <div className="tax-header-price">
            <span>Property Tax Dues</span>
            <span className="pt-total">{totalAmount}</span>
          </div>
        }
      />
      <CardText expandable={true}>
        <div className="fare-section">
          <div className="pt-rf-detailed-bill">
            <div className="pt-rf-detailed-bill-text col-md-6 col-lg-6">Detailed Bill</div>
            <div className="pt-rf-detailed-bill-table">
              {taxHeadEstimates &&
                taxHeadEstimates.map((item, index) => {
                  return (
                    item.estimateAmount > 0 && (
                      <div className="pt-rf-detailed-bill-points">
                        <Label label={item.taxHeadCode} />
                        <Label className="pt-rf-price" label={(item.category === "EXEMPTION" ? "- " : "") + `${item.estimateAmount}`} />
                      </div>
                    )
                  );
                })}
            </div>

            <div className="pt-rf-detailed-bill-total">
              <span className="">Total</span>
              <span className="pt-rf-price">{totalAmount}</span>
            </div>
          </div>
          <div className="date-details">
            <span className="header">Important Dates</span>
            <ul>
              {rebate && (
                <li>
                  <span>
                    <Label label={`Last Date for Rebate (${rebate.rate}% of PT)`} />
                  </span>
                  <span>{`${rebate.endingDay}/${rebate.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
              {penalty && (
                <li>
                  <span>
                    <Label label={`Penalty (${penalty.rate}% of PT) applied from`} />
                  </span>
                  <span>{`${penalty.startingDay}/${penalty.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
              {intrest && (
                <li>
                  <span>
                    <Label label={`Interest (${intrest.rate}% p.a. daily) applied from`} />
                  </span>
                  <span>{`${intrest.startingDay}/${intrest.fromFY.slice(0, 4)}`}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardText>
    </Card>
  );
};

export default PropertyTaxDetails;
