import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Label from "../../../utils/translationNode";
import ComplaintsIcon from "@material-ui/icons/LibraryBooks";
import AddIcon from "@material-ui/icons/Add";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: "#fe7a51",
  },
});

class ModuleLandingPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6} align="center">
          <Card>
            <CardContent>
              <AddIcon className={classes.icon} />
              <Label label={"File Complaints"} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} align="center">
          <Card>
            <CardContent>
              <ComplaintsIcon className={classes.icon} />
              <Label label={"My Complaints"} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ModuleLandingPage);
