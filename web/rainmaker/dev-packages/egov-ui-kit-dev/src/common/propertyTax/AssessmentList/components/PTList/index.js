import React from "react";
import { List, Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

import AssessmentInfo from '../../../Property/components/AssessmentInfo';
import PropertyAddressInfo from '../../../Property/components/PropertyAddressInfo';
import OwnerInfo from '../../../Property/components/OwnerInfo';

// AssessmentInfo

const PTList = ({ items, label, onItemClick, innerDivStyle, hoverColor ,properties ,style}) => {
  console.log(items,"jagan--items");
  console.log(onItemClick,"jagan--onItemClick");
  let val='';
 
const items2=[items[1]];
  return (
    <div className="form-without-button-cont-generic" >
      {label && (
        <Label
          label={label}
          containerStyle={{ padding: "24px 0px 24px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
      )}
      <div>
        <Card
          textChildren={
            <div className="col-sm-12 col-xs-12" style={{ alignItems: "center" }}>
              <PropertyAddressInfo properties={properties}></PropertyAddressInfo>
              <AssessmentInfo properties={properties} ></AssessmentInfo>
              <OwnerInfo properties={properties} ></OwnerInfo>
              <List
            innerDivStyle={innerDivStyle}
            items={items2}
            listItemStyle={{ padding: "0px 20px", borderWidth: "10px 10px 0px"  }}
            nestedListStyle={{ padding: "0px" }}
            primaryTogglesNestedList={true}
            onItemClick={onItemClick}
            hoverColor={hoverColor}
          />
            </div>
          }
          
        />
        {/* <Card
        className="property-tax-card"
        textChildren={
          <List
            innerDivStyle={innerDivStyle}
            items={items}
            listItemStyle={{ padding: "0px 20px", borderWidth: "10px 10px 0px"  }}
            nestedListStyle={{ padding: "0px" }}
            primaryTogglesNestedList={true}
            onItemClick={onItemClick}
            hoverColor={hoverColor}
          />
        }
      /> */}
      <button onClick={()=>{val=onItemClick()}}>

      </button>
<div>
{val}
{console.log(val,'val')
}
</div>
      </div>

    </div>
  );
};

export default PTList;
