import React from "react";
import { Card } from "components";
import { connect } from "react-redux";
import formHoc from "egov-ui-kit/hocs/form";
import CustomSelectForm from "../CustomSelectForm";
import GenericForm from "../../GenericForm";
// import DynamicForm from "../../DynamicForm";
import get from "lodash/get";


class FloorDetails extends React.Component {
  // cacheFloors=JSON.parse(localStorage.getItem("floors"));
  state = {
    floors:this.cacheFloors?this.cacheFloors:[],
  };

  // updatedFloorsInCache=(floors)=>{
  //   localStorage.setItem("floors",JSON.stringify(floors))
  // }

  componentDidMount() {
    this.configureFloors(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.noFloors !== this.props.noFloors) {
      this.configureFloors(nextProps)
    }
  }

  configureFloors=(props)=>{
    const { noFloors,componentDetails, disabled } = props;
    const { floors } = this.state;
    let updatedFloors = [...Array(parseInt(noFloors))].map((item, key) => {
      let units = [];
      units.push(formHoc({ ...componentDetails ,copyName:`${componentDetails.copyName}_${key}_unit_0`, disabled })(GenericForm));
      return {
        floorId: key,
        floorDropDown:formHoc({ formKey: "customSelect", makeCopy: true,copyName:"customSelect_"+key, path: "PropertyTaxPay", disabled })(CustomSelectForm),
        units,
      };
    });
    this.setState({
      floors:noFloors>0?[...floors,...updatedFloors]:[],
    });
    // this.updatedFloorsInCache(floors)
  }

  renderFloors = (floors, noFloors) => {
    const {renderUnits}=this;
    const { disabled } = this.props
    return floors.map((floor, key) => {
      const { floorId, floorDropDown: FloorDropDown,units } = floor;
      return (
        <Card
          key={key}
          textChildren={
            <div>
              <FloorDropDown noFloors={noFloors} />
              <div className={`col-xs-12`}>{renderUnits(units,floorId)}</div>
            </div>
          }
        />
      );
    });
  };

  handleAddUnit=(floorIndex)=>{
    const { componentDetails } = this.props;
    let {floors}=this.state;
    floors[floorIndex].units.push(formHoc({ ...componentDetails ,copyName:`${componentDetails.copyName}_${floorIndex}_unit_${floors[floorIndex].units.length+1}`})(GenericForm));
    this.setState({
      floors
    })
    // this.updatedFloorsInCache(floors)
  }

  handleRemoveUnit=(floorIndex,unitIndex)=>{
    let {floors}=this.state;
    floors[floorIndex].units=floors[floorIndex].units.splice(floors[floorIndex].units,unitIndex);
    this.setState({
      floors
    })
    // this.updatedFloorsInCache(floors)
  }

  renderUnits = (units,floorId) => {
    const { disabled } = this.props
    const {handleAddUnit,handleRemoveUnit}=this;
      return (
        <div>
          {
            units.map((unit,key)=>{
              const Unit=unit;
              return (<Unit key={key} className={disabled ? "grayout" : ""} handleRemoveItem={key!==0?()=>handleRemoveUnit(floorId,key):undefined} disabled={disabled} />)
            })
          }
          <div className="pt-add-owner-btn" onClick={()=>this.handleAddUnit(floorId)} style={{ color: "#fe7a51", float: "right",cursor:"pointer" }}>
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
