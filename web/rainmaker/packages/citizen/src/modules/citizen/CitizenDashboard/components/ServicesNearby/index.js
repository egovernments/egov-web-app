import React from "react";
import { Icon } from "components";
import Grid from "@material-ui/core/Grid";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const iconStyle = {
  width: "30px",
  height: "30px",
  fill: "#00bbd3",
};

const servicesNearBy = [
  {
    label: "My City",
    icon: <Icon style={iconStyle} className="service-icon" action="custom" name="home-city-outline" />,
  },
  { label: "Places Near Me", icon: <Icon style={iconStyle} className="service-icon" action="custom" name="map-marker" /> },
  { label: "Events", icon: <Icon style={iconStyle} className="service-icon" action="custom" name="calendar" /> },
  { label: "Key Documents", icon: <Icon style={iconStyle} className="service-icon" action="av" name="library-books" /> },
];

const ServicesNearby = () => {
  return (
    <Grid container>
      {servicesNearBy.map((service) => {
        return (
          <Grid item xs={3} sm={2} align="center" style={{ padding: "0px 8px" }}>
            <div className="service-nearby-icon-cont">{service.icon}</div>
            <Label dark={true} className="service-label-cont" fontSize={14} label={service.label} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ServicesNearby;
