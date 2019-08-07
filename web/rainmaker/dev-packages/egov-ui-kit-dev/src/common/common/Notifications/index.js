import React from "react";
import { Card, Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";
import Grid from "@material-ui/core/Grid";


const pStyle = {
 
  backgroundColor: "#EEEEEE",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "65%",
  width: '90%',
};
const divStyle = {

  backgroundColor: "#FC8019",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "35%" ,
  width: '90%',
};

const Notifications = ({ notifications = [], history }) => {
  const renderUpdate = (notification, index) => {
    const { title, dueTime, buttons, address, name, SLA ,eventDate} = notification;
      return (
      <Card
        className="home-notification"
        style={{ margin: "8px 0px" }}
        key={index}
        id={`home-notification${index}`}
        style={{ padding: "12px 8px" }}
        textChildren={
          <Grid container >
            <Grid item xs={4} direction="column">
              <div style={divStyle}>
                 <Label label={eventDate.split(":")[0]} color="#fff"  fontSize='17px'/>
              </div>
              <div style={pStyle}>
                 <Label label={eventDate.split(":")[1]}  color="#FC8019"   fontSize='34px'/>
              </div> 

            </Grid>
            <Grid item xs={8} sm container>

            <div className="update">
            <Label

              leftWrapperStyle
              fontSize={16}
              color="rgba(0, 0, 0, 0.87)"
              label={name}
              labelStyle={{ width: "100%", wordWrap: "break-word" }}
              containerStyle={{ marginBottom: 5 }}
            />
            <Label
              leftWrapperStyle
              fontSize={14}
              color="rgba(0, 0, 0, 0.60)"
              label={title}
              labelStyle={{ width: "100%", wordWrap: "break-word" }}
              containerStyle={{ marginBottom: 5 }}
            />
            {address && (
              <div className="rainmaker-displayInline">
                <Icon name="place" action="maps" style={{ height: "20px", width: "35px", marginRight: 5 }} />
                <Label
                  leftWrapperStyle
                  fontSize={14}
                  color="rgba(0, 0, 0, 0.60)"
                  label={address}
                  labelStyle={{ width: "100%", wordWrap: "break-word" }}
                  containerStyle={{ marginBottom: 5 }}
                />
              </div>
            )}

            {buttons && (
              <div style={{ marginTop: 5, display: "flex" }}>
                {buttons.map((button, index) => {
                  return (
                    <div
                      onClick={() => {
                        history.push(button.route);
                      }}
                      style={{ cursor: "pointer", marginBottom: 10 }}
                    >
                      <Label
                        label={`CS_COMMON_${button.label}`}
                        color="primary"
                        fontSize={14}
                        containerStyle={index != buttons.length - 1 ? { marginRight: 30 } : {}}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            { SLA }
          </div>
            </Grid>
          </Grid>
         
        }
      />
    );
  };

  return <div>{notifications.map((notification, index) => renderUpdate(notification, index))}</div>;
};

export default Notifications;
