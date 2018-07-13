import React from "react";
import { Card } from "components";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import CustomSelectForm from "../CustomSelectForm";
import GenericForm from "../../GenericForm";
// import DynamicForm from "../../DynamicForm";
import get from "lodash/get";


class FloorDetails extends React.Component {
  state = {
    floors: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.noFloors !== this.props.noFloors) {
      const { noFloors,componentDetails } = nextProps;
      const { floors } = this.state;
      let updatedFloors = [...Array(parseInt(noFloors))].map((item, key) => {
        let units = [];
        units.push(formHoc({ ...componentDetails ,copyName:`${componentDetails.copyName}_${key}_unit_0`})(GenericForm));
        return {
          floorId: key,
          floorDropDown:formHoc({ formKey: "customSelect", makeCopy: true,copyName:"customSelect_"+key, path: "PropertyTaxPay" })(CustomSelectForm),
          units,
        };
      });
      this.setState({
        floors:noFloors>0?[...floors,...updatedFloors]:[],
      });
    }
  }

  renderFloors = (floors, noFloors) => {
    const {renderUnits}=this;
    return floors.map((floor, key) => {
      const { floorId, floorDropDown: FloorDropDown,units } = floor;
      return (
        <Card
          key={key}
          textChildren={
            <div>
              <FloorDropDown noFloors={noFloors}/>
              <div className={`col-xs-12`}>{renderUnits(units,floorId)}</div>
            </div>
          }
        />
      );
    });
  };

  addUnit=(floorIndex)=>{
    const { componentDetails } = this.props;
    let {floors}=this.state;
    floors[floorIndex].units.push(formHoc({ ...componentDetails ,copyName:`${componentDetails.copyName}_${floorIndex}_unit_${floors[floorIndex].units.length+1}`})(GenericForm));
    this.setState({
      floors
    })
  }

  renderUnits = (units,floorId) => {
      return (
        <div>
          {
            units.map((unit,key)=>{
              const Unit=unit;
              return (<Unit key={key}/>)
            })
          }
          <div className="pt-add-owner-btn" onClick={()=>this.addUnit(floorId)} style={{ color: "#fe7a51", float: "right",cursor:"pointer" }}>
            + ADD ONE MORE UNIT
          </div>
        </div>
      );
  };

  render() {
    const { renderFloors } = this;
    const { floors } = this.state;
    const { noFloors } = this.props;
    return <div>{renderFloors(floors, noFloors)}</div>;
  }
}

const mapStateToProps = ({ form }) => {
  let { plotDetails } = form;
  let noFloors=parseInt(get(plotDetails, "fields.floorCount.value")) || 0;
  return { noFloors };
};

export default connect(mapStateToProps, null)(FloorDetails);
