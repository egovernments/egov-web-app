import React from "react";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import {
  TaskDialog,
  TaskStatusComponents
} from "egov-ui-framework/ui-molecules";
import HistoryIcon from "@material-ui/icons/History";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "#FE7A51"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class TastStatusContainer extends React.Component {
  state = {
    open: false
  };

  handleViewHistory = () => {
    this.setState({
      open: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      open: false
    });
  };

  // getLatestObjectbyTime = object => {
  //   const sortedArray = orderBy(
  //     object,
  //     ["auditDetails.lastModifiedTime"],
  //     ["desc"]
  //   );
  //   return sortedArray[0];
  // };

  render() {
    const { classes, ProcessInstances } = this.props;
    const currentObj =
      ProcessInstances && ProcessInstances[ProcessInstances.length - 1];
    //ProcessInstances && this.getLatestObjectbyTime(ProcessInstances);
    return (
      <div>
        <Card className="">
          <CardContent>
            <Container
              children={
                <Grid container="true" sm="12" spacing={16} marginTop={16}>
                  <Grid
                    style={{ alignItems: "center", display: "flex" }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer
                        labelName="Task Status"
                        labelKey="TL_TASK_STATUS"
                      />
                    </Typography>
                  </Grid>
                  <Grid item sm={2}>
                    <Button
                      className={classes.button}
                      onClick={this.handleViewHistory}
                    >
                      <HistoryIcon className={classes.leftIcon} />
                      <LabelContainer
                        labelName="VIEW HISTORY"
                        labelKey="TL_VIEW_HISTORY"
                        color="#FE7A51"
                      />
                    </Button>
                  </Grid>
                  <TaskStatusComponents
                    currentObj={currentObj}
                    index={ProcessInstances.length - 1}
                  />
                </Grid>
              }
            />
          </CardContent>
        </Card>
        <TaskDialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          history={ProcessInstances}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TastStatusContainer);
