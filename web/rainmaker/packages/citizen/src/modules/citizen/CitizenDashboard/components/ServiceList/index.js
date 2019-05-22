import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Icon from "egov-ui-kit/components/Icon";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Label from "egov-ui-kit/utils/translationNode";
import Grid from "@material-ui/core/Grid";
import "./index.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
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
    route: "",
  },
  { label: "Property Tax", icon: <Icon className="service-icon" action="custom" name="home-city-outline" />, route: "" },
  { label: "Trade License", icon: <Icon className="service-icon" action="action" name="work" />, route: "" },
  { label: "Fire Noc", icon: <Icon className="service-icon" action="custom" name="fire" />, route: "" },
  { label: "Water & Sewerage", icon: <Icon className="service-icon" action="custom" name="water-pump" />, route: "" },
  { label: "Trade License", icon: <Icon className="service-icon" action="alert" name="warning" />, route: "" },

  { label: "More", icon: <Icon className="service-icon" action="navigation" name="more-horiz" />, route: "" },
];

class ServiceList extends React.Component {
  render() {
    const { classes, history } = this.props;
    return (
      <Grid container>
        {services.map((service) => {
          return (
            <Grid item xs={3} align="center">
              <Card
                className={classes.paper}
                onClick={(e) => {
                  history.push(service.route);
                }}
              >
                <CardContent classes={{ root: "card-content-style" }}>
                  {service.icon}
                  <Label label={service.label} fontSize={12} color="rgba(0, 0, 0, 0.8700000047683716)" />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withStyles(styles)(ServiceList);
