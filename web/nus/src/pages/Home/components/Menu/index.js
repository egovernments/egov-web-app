import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#4A90E2",
    color: "white"
  },
  menuItem:{
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "17px"
  }
});

class Menu extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

   mylinkfunction=(e,target)=> {

       window.location.href=target;

       /* need to stop the form sending of the form

        UPDATE as comment: This may not be exactly correct syntax
        for stopping a form , look up preventing form submission */

       e.preventDefault();
       e.stopPropagation();

  }

  render() {
    const { classes, menuItems } = this.props;
    const { value } = this.state;
    const {mylinkfunction}=this;

    return (
      <div>
        <AppBar className={classes.root} position="static">
          <Tabs
            value={value}
            indicatorColor="primary"
            onChange={this.handleChange}
          >
            {menuItems.map((item,key) => {
              //console.log(item.label);
              return <Tab key={key} classes={{root:classes.menuItem}} label={item.label} onClick={(e)=>{
                mylinkfunction(e,item.target)
              }}/>;
            })}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
