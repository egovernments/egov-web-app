import React from "react";
import { Card, Icon, MapLocation } from "components";
import pinIcon from "egov-ui-kit/assets/Location_pin.svg";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";
import Grid from "@material-ui/core/Grid";

const pStyle = {
  backgroundColor: "#EEEEEE",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "65%",
  width: "90%",
};
const divStyle = {
  backgroundColor: "#FC8019",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "35%",
  width: "90%",
};

const Notifications = ({ notifications = [], history }) => {
  const renderUpdate = (notification, index) => {
    const { description, dueTime, buttons, address, name, SLA, type, id, tenantId, eventDate } = notification;
    return (
      <Card
        className="home-notification"
        style={{ margin: "8px 0px", borderLeft: type === "EVENTSONGROUND" ? "none" : "4px solid #fe7a51" }}
        key={index}
        id={`home-notification${index}`}
        style={{ padding: "12px 8px" }}
        textChildren={
          <Grid container>
            {type === "EVENTSONGROUND" && (
              <Grid item xs={4} direction="column" style={{ maxWidth: "100px", maxHeight: "100px", minWidth: "100px", minHeight: "100px" }}>
                <div style={divStyle}>
                  <Label label={eventDate.split(":")[0]} color="#fff" fontSize="17px" />
                </div>
                <div style={pStyle}>
                  <Label label={eventDate.split(":")[1]} color="#FC8019" fontSize="34px" />
                </div>
              </Grid>
            )}
            <Grid item xs={type !== "EVENTSONGROUND" ? 12 : 8} sm container>
              <div
                className="update"
                onClick={() => (type === "EVENTSONGROUND" ? history.push(`/event-details?uuid=${id}&tenantId=${tenantId}`) : {})}
              >
                <Label
                  leftWrapperStyle
                  fontSize={16}
                  color="rgba(0, 0, 0, 0.87)"
                  label={name}
                  labelStyle={{ width: "100%", wordWrap: "break-word" }}
                  containerStyle={{ marginBottom: 10 }}
                />

                {type != "EVENTSONGROUND" && (
                  <Label
                    leftWrapperStyle
                    fontSize={14}
                    color="rgba(0, 0, 0, 0.60)"
                    label={description}
                    labelStyle={{ width: "100%", wordWrap: "break-word" }}
                    containerStyle={{ marginBottom: 10 }}
                  />
                )}
                {address && (
                  <div className="rainmaker-displayInline" style={{ marginBottom: 10 }}>
                    <Icon
                      name="place"
                      action="maps"
                      style={{
                        height: 22,
                        width: 33,
                        color: "#484848",
                      }}
                      viewBox="10 0 24 24"
                    />
                    <Label
                      leftWrapperStyle
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.60)"
                      label={address}
                      labelStyle={{ width: "100%", wordWrap: "break-word" }}
                      containerStyle={{ marginBottom: 10 }}
                    />
                  </div>
                )}
                {buttons && buttons.length > 1 && (
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
                            color={"#FC8019"}
                            fontSize={12}
                            containerStyle={index != buttons.length - 1 ? { marginRight: 30 } : {}}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {type === "EVENTSONGROUND" ? (
                  <div style={{ display: "flex" }}>
                    <Icon name="access-time" action="device" viewBox="10 0 24 24" style={{ height: "20px", width: "35px" }} /> {SLA}
                  </div>
                ) : (
                  SLA
                )}
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
