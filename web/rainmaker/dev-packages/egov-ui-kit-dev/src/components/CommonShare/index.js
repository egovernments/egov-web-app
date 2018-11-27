import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

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
    let { shareCallback, classes, visible = true, roleDefination = {} } = this.props;
    if (visible && !isEmpty(roleDefination)) {
      const splitList = get(roleDefination, "rolePath").split(".");
      const localdata = JSON.parse(localStorage.getItem(splitList[0]));
      const localRoles = get(localdata, splitList.slice(1).join("."), localdata);

      const roleCodes = localRoles.map((elem) => {
        return get(elem, "code");
      });
      const roles = get(roleDefination, "roles");
      let found = roles.some((elem) => roleCodes.includes(elem));
      visible = found;
    }

    return (
      <div className={classes.root}>
        <div className={classes.menuItem}>
          {visible && (
            <Button
              variant="fab"
              className={classes.fab}
              visible="false"
              onClick={() => {
                shareCallback();
              }}
            >
              <ShareIcon />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

CommonShare.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonShare);
