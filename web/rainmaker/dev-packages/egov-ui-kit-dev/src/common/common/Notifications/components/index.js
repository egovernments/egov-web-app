import React, { Component } from "react";
import { Screen } from "modules/common";
import { Card, Icon, MapLocation } from "components";
import pinIcon from "egov-ui-kit/assets/Location_pin.svg";
import Label from "egov-ui-kit/utils/translationNode";
import "../index.css";
import {
  getQueryArg
} from "egov-ui-framework/ui-utils/commons";
import Grid from "@material-ui/core/Grid";
import { getAccessToken } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { getTransformedNotifications } from "egov-ui-kit/utils/commons"



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

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      openMap: false
    };
  }

  openMapHandler = (isOpen) => {
    this.setState({ openMap: isOpen });
  }

  componentDidMount = async () => {
    const uuid = getQueryArg(window.location.href, "uuid");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const queryObject = [
      {
        key: "tenantId",
        value: tenantId,
      },
      {
        key: "ids",
        value: uuid,
      },
    ];

    const requestBody = {
      apiId: "org.egov.pt",
      ver: "1.0",
      ts: 1502890899493,
      action: "asd",
      did: "4354648646",
      key: "xyz",
      msgId: "654654",
      requesterId: "61",
      authToken: getAccessToken(),
    };

    try {
      const response = await httpRequest("post", "/egov-user-event/v1/events/_search", "_search", queryObject, requestBody);
      if (response) {
        this.setState({
          response: response.events
        });

      }
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    const { response, openMap } = this.state;
    const { openMapHandler } = this;
    const notification = getTransformedNotifications(response)[0];
    const { description, SLA, address, locationObj, eventCategory, type, id, tenantId, eventDate } = notification || "";
    return (
      <Screen>
        {
          <Card
            className="home-notification"
            style={{ margin: "8px 0px" }}
            style={{ padding: "12px 8px" }}
            textChildren={
              <Grid container>
                {eventDate && <Grid item xs={4} direction="column" style={{ maxWidth: "100px", maxHeight: "100px", minWidth: "100px", minHeight: "100px" }}>
                  <div style={divStyle}>
                    <Label label={eventDate.split(":")[0]} color="#fff" fontSize="17px" />
                  </div>
                  <div style={pStyle}>
                    <Label label={eventDate.split(":")[1]} color="#FC8019" fontSize="34px" />
                  </div>
                </Grid>}
                <Grid item xs={8} sm container>
                  <div
                    className="update"
                  >
                    <Label
                      leftWrapperStyle
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.60)"
                      label={description}
                      labelStyle={{ width: "100%", wordWrap: "break-word" }}
                      containerStyle={{ marginBottom: 5 }}
                    />
                    <Label
                      leftWrapperStyle
                      fontSize={13}
                      color="rgba(0, 0, 0, 0.55)"
                      label={"MSEVA_EVENTCATEGORIES_" + eventCategory}
                      labelStyle={{ width: "100%", wordWrap: "break-word" }}
                      containerStyle={{ marginBottom: 5, marginTop: 10 }}
                    />
                  </div>
                </Grid>
              </Grid>
            }
          />
        }
        {/* {response && response.length > 0 && <SingleEvent notifications={getTransformedNotifications(response)} flag={1} />} */}
        {/* <EventDescription notifications={getTransformedNotifications(response)} history={this.props.history} openMap={this.state.openMap} openMapHandler={this.openMapHandler} />} */}
        {
          <Card
            style={{ margin: "8px 0px" }}
            // key={index}
            // id={`home-notification${index}`}
            style={{ padding: "12px 8px" }}
            textChildren={
              <Grid container>
                <Grid item xs={8} sm container>
                  <div >

                    <Label
                      leftWrapperStyle
                      fontSize={16}
                      color="rgba(0, 0, 0, 0.60)"
                      label={description}
                      labelStyle={{ width: "100%", wordWrap: "break-word" }}
                      containerStyle={{ marginBottom: 5 }}
                    />

                    {address && (
                      <div className="rainmaker-displayInline">
                        <Icon name="place" action="maps" style={{ height: "20px", width: "30px", marginRight: 5 }} />
                        <Label
                          leftWrapperStyle
                          fontSize={15}
                          color="rgba(0, 0, 0, 0.87)"
                          label={address}
                          labelStyle={{ width: "100%", wordWrap: "break-word" }}
                          containerStyle={{ marginBottom: 5 }}
                        />
                      </div>
                    )}

                    {
                      <div onClick={() => {
                        openMapHandler(true);
                      }}
                        style={{ cursor: "pointer", marginBottom: 10, marginLeft: 10, height: "16px" }}
                      >
                        <Label
                          label={`GET DIRECTIONS`}
                          color="#FC8019"
                          fontSize={14}

                        />

                      </div>
                    }
                    {SLA}
                  </div>
                </Grid>
                {openMap && <div>
                  <div className="back-btn" style={{ top: 24 }}>
                    <Icon
                      className="mapBackBtn"
                      onClick={() => {
                        openMapHandler(false);
                      }}
                      style={{
                        height: 24,
                        width: 24,
                        color: "#484848",
                      }}
                      action="navigation"
                      name={"arrow-back"}
                    />
                  </div>
                  <MapLocation currLoc={locationObj} icon={pinIcon} hideTerrainBtn={true} viewLocation={true} />
                </div>}
              </Grid>
            }
          />
        }
      </Screen>
    )
  }
}

export default EventDetails