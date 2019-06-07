import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "egov-ui-kit/components/Icon";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Label from "egov-ui-kit/utils/translationNode";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import "./index.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "12.5%",
  },
  paper: {
    borderRadius: 0,
    marginTop: 0,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
  },
  icon: {
    color: "#fe7a51",
  },
  item: {
    padding: 8,
  },
});

const services = [
  {
    label: "Complaints",
    icon: <Icon className="service-icon" action="custom" name="comment-plus" />,
    route: "/pgr-home",
  },
  { label: "Property Tax", icon: <Icon className="service-icon" action="custom" name="home-city-outline" />, route: "/property-tax" },
  { label: "Trade License", icon: <Icon className="service-icon" action="custom" name="trade-license" />, route: "/tradelicense-citizen/home" },
  { label: "Download Forms", icon: <Icon className="service-icon" action="custom" name="water-pump" />, route: "" },
  { label: "Water & Sewerage", icon: <Icon className="service-icon" action="custom" name="water-pump" />, route: "" },
  { label: "Fire Noc", icon: <Icon className="service-icon" action="custom" name="fire" />, route: "" },
  { label: "Document Locker", icon: <Icon className="service-icon" action="custom" name="file-download" />, route: "" },
  { label: "More", icon: <Icon className="service-icon" action="navigation" name="more-horiz" />, route: "" },
];

class ServiceList extends React.Component {
  render() {
    const { classes, history } = this.props;
    return (
      <Grid container>
        <Hidden smUp>
          {services.map((service) => {
            return (
              <Grid item xs={3} sm={1} align="center">
                <Card
                  className={classes.paper}
                  onClick={(e) => {
                    history.push(service.route);
                  }}
                >
                  <CardContent classes={{ root: "card-content-style" }}>
                    {service.icon}
                    <Label className="service-label-cont" label={service.label} fontSize={12} color="rgba(0, 0, 0, 0.87)" />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Hidden>

        <Hidden xsDown>
          {services.map((service) => {
            return (
              <Grid className={classes.root} item align="center">
                <Card
                  className={`${classes.paper} service-module-style`}
                  onClick={(e) => {
                    history.push(service.route);
                  }}
                >
                  <CardContent classes={{ root: "card-content-style" }}>
                    <div>{service.icon}</div>
                    <Label className="service-label-cont" label={service.label} fontSize={14} color="rgba(0, 0, 0, 0.87)" />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Hidden>
      </Grid>
    );
  }
}

export default withStyles(styles)(ServiceList);
