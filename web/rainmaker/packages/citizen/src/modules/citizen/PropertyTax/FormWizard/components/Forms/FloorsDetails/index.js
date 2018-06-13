import React from "react";
import { Card } from "components";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import CustomSelectForm from "../CustomSelectForm";

const CustomSelectHOC = formHoc({ formKey: "customSelect", path: "PropertyTaxPay" })(CustomSelectForm);

class FloorDetails extends React.Component {
  renderFloors = (noFloors, Component) => {
    const { renderUnit } = this;
    return [...Array(parseInt(noFloors))].map((item, key) => {
      return (
        <Card
          key={key}
          textChildren={
            <div>
              <CustomSelectHOC noFloors={noFloors} />
              <div className={`${key} col-xs-12`}>{renderUnit(key, Component)}</div>
            </div>
          }
        />
      );
    });
  };

  renderUnit = (floorNo, Component) => {
    return (
      <div>
        <Component />
        <div className="pt-add-owner-btn" onClick={this.addOwner} style={{ color: "#fe7a51", float: "right" }}>
          + ADD ONE MORE UNIT
        </div>
      </div>
    );
  };

  render() {
    let { renderFloors } = this;
    let { component: Component, noFloors } = this.props;
    return <div>{renderFloors(noFloors, Component)}</div>;
  }
}

const mapStateToProps = (state) => {
  const { form } = state || {};
  let { plotDetails } = form;
  return { noFloors: (plotDetails && plotDetails.fields && plotDetails.fields.floorCount && plotDetails.fields.floorCount.value) || 1 };
};

export default connect(
  mapStateToProps,
  null
)(FloorDetails);
