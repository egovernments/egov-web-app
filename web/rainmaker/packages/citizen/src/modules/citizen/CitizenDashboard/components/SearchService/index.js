import React from "react";
import { Icon } from "components";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    position: "relative",
    top: "6px",
    height: "56px",
    zIndex: "1100",
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxShadow: "0px 2px rgba(0, 0, 0, 0.23)",
    backgroundColor: "#fff",
    borderRadius: "28px",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  underline: {
    "&:before": {
      borderBottom: "none",
    },
  },
});

class SearchService extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Icon action="action" name="search" />
        <TextField disableUnderline={true} className={classes.input} placeholder={"Search Services & Information"} />
        <Icon action="av" name="mic" />
      </div>
    );
  }
}

export default withStyles(styles)(SearchService);
