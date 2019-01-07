import React from "react";
import { connect } from "react-redux";
import { Card, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { Container } from "mihy-ui-framework/ui-atoms";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import { TaskStatusComponents, TaskDialog } from "../../ui-molecules-local";
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

  render() {
    const { classes, ProcessInstances } = this.props;
    const currentStatus = ProcessInstances && ProcessInstances[0];
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
                      <LabelContainer labelName="Task Status" />
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
                        color="#FE7A51"
                      />
                    </Button>
                  </Grid>
                  <TaskStatusComponents currentStatus={currentStatus} />
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

const mapStateToProps = (state, ownprops) => {
  const { workflow } = state;
  const { ProcessInstances } = workflow;

  return { ProcessInstances };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(TastStatusContainer)
);
