import React from "react";
import { Card } from "components";
import { connect } from "react-redux";


class FloorDetails extends React.Component {

  renderFloors=(noFloors,Component)=>{
    return [...Array(parseInt(noFloors))].map((item,key)=>{
      return (
        <Card key={key}
            textChildren={
              <div className={`${key} col-xs-12`}>
                <Component/>
              </div>
            }
          />
      )
    })
  }

  render()
  {
    let {renderFloors}=this;
    let {component:Component,noFloors}=this.props;
    return (
      <div>
        {
          renderFloors(noFloors,Component)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { form } = state || {};
  let {plotDetails} =form;
  return { noFloors:plotDetails && plotDetails.fields && plotDetails.fields.floorCount && plotDetails.fields.floorCount.value || 1 };
};



export default connect(
  mapStateToProps,
  null
)(FloorDetails);
