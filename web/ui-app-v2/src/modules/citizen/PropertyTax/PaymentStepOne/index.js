import React from "react";
import {Tabs,Label,List,Icon} from "components";
import Screen from "modules/common/Screen";

const tabStyle = {
  letterSpacing: "0.6px",
};

const PaymentStepOne=()=>{
  return (
    <div>
    <Tabs
      tabs={[
        {
          label: (
            <div>
              <Label
                color={"#ffffff"}
                label={`Access & Pay`}
                labelStyle={tabStyle}
              />
            </div>
          ),
          children: (
            <Screen>
              <List
                onItemClick={()=>{console.log("clicked");}}
                listContainerStyle={{marginTop:"16px"}}
                listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
                nestedListStyle={{ padding: "0px", background: "#f2f2f2" }}
                autoGenerateNestedIndicator={false}
                primaryTogglesNestedList={true}
                items={
                [
                  {
                    primaryText:"New Property Assessment",
                    leftIcon:<Icon action="action" name="home"/>,
                    rightIcon:<Icon action="hardware" name="keyboard-arrow-right"/>,
                  },
                  {
                    primaryText:"Drafts",
                    leftIcon:<Icon action="image" name="brightness-1" color="#d8d8d8"/>,
                    rightIcon:<Icon action="hardware" name="keyboard-arrow-right"/>,
                  },
                  {
                    primaryText:"Pending Assessments",
                    leftIcon:<Icon action="image" name="brightness-1" color="#d8d8d8"/>,
                    rightIcon:<Icon action="hardware" name="keyboard-arrow-right"/>,
                  },
                  {
                    primaryText:"Paid Assessments",
                    leftIcon:<Icon action="image" name="brightness-1" color="#d8d8d8"/>,
                    rightIcon:<Icon action="hardware" name="keyboard-arrow-right"/>,
                  }
                ]
               }
              />
            </Screen>
          ),
        },
        {
          label: (
            <div>
              <Label
                color={"#ffffff"}
                bold={true}
                label={`Receipts`}
                labelStyle={tabStyle}
              />
            </div>
          ),
          children: (
            <Screen>
              <div className="tab2-content">
                Receipts
              </div>
            </Screen>
          ),
        },
        {
          label: (
            <div>
              <Label
                color={"#ffffff"}
                bold={true}
                label={`About`}
                labelStyle={tabStyle}
              />
            </div>
          ),
          children: (
            <Screen>
              <div className="tab2-content">
                About
              </div>
            </Screen>
          ),
        }
      ]}
    />
    </div>
  )
}

export default PaymentStepOne;
