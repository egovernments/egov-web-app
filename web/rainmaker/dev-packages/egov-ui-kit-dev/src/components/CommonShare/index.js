import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 999,
  },
  menuItem: {
    zIndex: 99999,
  },
});

class CommonShare extends React.Component {
  render() {
    const { shareCallback,classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.menuItem}>
          <Button
            variant="fab"
            className={classes.fab}
            onClick={() => {
              shareCallback();
            }}
          >
            <ShareIcon />
          </Button>
        </div>
      </div>
    );
  }
}

CommonShare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonShare);
