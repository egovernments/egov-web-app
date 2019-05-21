import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Star from "@material-ui/icons/Star";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Open, shared, extensible national digital infrastructure" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Acts as a Public Good with a federated architecture" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="State Government(s) have strategic control" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Free of cost Technology Platform" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Provide locally relevant solutions for cities" />
        </ListItem>
        
      </List>

      <List component="nav" />
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
