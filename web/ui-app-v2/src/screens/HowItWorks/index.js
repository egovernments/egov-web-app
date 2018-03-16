import React from "react";
import Screen from "../common/Screen";
import {Card,Label,TimeLine,Icon} from "../../components";

const timelineIconCommonStyle = {
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  marginLeft: "-7px",
};

const statusCommonIconStyle = {
  ...timelineIconCommonStyle,
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
  border: "solid 1px #f89a3f",
};

const HowItWorks =(props)=>{
  let steps = [
    {
      props: {
        active: true
      },
      contentProps: {
        style: {
          marginTop: "-43px",
          marginLeft: "25px",
          paddingBottom:"80px"
        },
      },
      contentChildren: <div style={{marginLeft:"16px"}}><Label labelClassName="dark-color" label="Raise a Complaint"/></div>,
      labelProps: {
        icon: <Icon action="custom" name="file-send" style={statusCommonIconStyle} color={"#f5a623"} />
      }
    },
    {
      props: {
        active: true,
      },
      contentProps: {
        style: {
          marginTop: "-43px",
          marginLeft: "25px",
          paddingBottom:"80px"
        },
      },
      contentChildren: <div style={{marginLeft:"16px"}}><Label labelClassName="dark-color" label="Connect to Concerned Officer"/></div>,
      // labelChildren:"Connect to Concerned Officer",
      labelProps: {
        icon: <Icon action="social" name="person" style={statusCommonIconStyle} color={"#f5a623"} />,
      }
    },
    {
      props: {
        active: true,
      },
      contentProps: {
        style: {
          marginTop: "-43px",
          marginLeft: "25px",
          paddingBottom:"80px"
        },
      },
      contentChildren: <div style={{marginLeft:"16px"}}><Label labelClassName="dark-color" label="Track Status"/></div>,
      labelProps: {
        icon: <Icon action="action" name="timeline" style={statusCommonIconStyle} color={"#f5a623"} />,
      }
    },
    {
      props: {
        active: true,
      },
      contentProps: {
        style: {
          marginTop: "-43px",
          marginLeft: "25px",
          paddingBottom:"80px"
        },
      },
      contentChildren: <div style={{marginLeft:"16px"}}><Label labelClassName="dark-color" label="Resolved"/></div>,
      labelProps: {
        icon: <Icon action="action" name="done" style={statusCommonIconStyle} color={"#f5a623"} />,
      }
    }
  ];
  return (
    <Screen>
      <Card
        textChildren={
          <div>
              <Label labelClassName="dark-color" containerStyle={{marginBottom:"40px"}} label={`We have made connecting with us easier than
        ever before. Once you raise the complaint, we
        will assign it to the responsible officer. You can
        track the status of your complaint on our web-
        site under “ My Complaints “ till your complaint
        is resolved.`}/>

              <TimeLine
                stepperProps={{
                  orientation: "vertical",
                }}
                steps={steps}
              />
          </div>
        }
      />
    </Screen>
  )
}


export default HowItWorks;
