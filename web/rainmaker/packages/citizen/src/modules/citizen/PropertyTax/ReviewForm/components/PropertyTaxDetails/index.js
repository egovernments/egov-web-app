import React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import "./index.css";

const PropertyTaxDetails = ({ form }) => {
  return (
    <Card style={{ marginBottom: 200 }}>
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
          <div className="">
            <div className="tax-header-price">
              <span>Property Tax Dues</span> <span className="pt-total">1,432.50</span>
            </div>
          </div>
        }
      />
      <CardText expandable={true}>
        <div className="pt-rf-detailed-bill">
          <div>
            <div className="pt-rf-detailed-bill-text col-md-6 col-lg-6">Detailed Bill</div>
            <div className="pt-rf-detailed-bill-text col-md-6 col-lg-6">Due Date: 20/05/2018</div>
          </div>

          <div className="pt-rf-detailed-bill-table">
            <div className="pt-rf-detailed-bill-points">
              <span className="">Property Tax</span>
              <span className="pt-rf-price">1432.50</span>
            </div>
            <div className="pt-rf-detailed-bill-points">
              <span className="">Fire Cess (10% of property tax)</span>
              <span className="pt-rf-price">103.20</span>
            </div>
            <div className="pt-rf-detailed-bill-points">
              <span className="">Rebate (Paid before 20/05/2018)</span>
              <span className="pt-rf-price">-103.20</span>
            </div>
          </div>
          <div className="pt-rf-detailed-bill-total">
            <span className="">Total</span>
            <span className="pt-rf-price">1432.50</span>
          </div>
        </div>
      </CardText>
    </Card>
  );
};

export default PropertyTaxDetails;
