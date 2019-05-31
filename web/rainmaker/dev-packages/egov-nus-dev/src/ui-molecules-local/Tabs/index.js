import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#4A90E2",
    color:"white"
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes,menuItems } = this.props;
    const { value } = this.state;

    return (
      <div >
            <AppBar className={classes.root} color="#4A90E2" position="static">
            <Tabs value={value} onChange={this.handleChange}>
            {menuItems.map(item=>{
                //console.log(item.label);

              return <Tab label={item.label} />
            })}
            
           </Tabs>
        </AppBar>
        {/* {value === 0 && <TabContainer>NATIONAL URBUN STACK</TabContainer>}
        {value === 1 && <TabContainer>Item two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3&& <TabContainer>Item four</TabContainer>}
        {value === 4 && <TabContainer>Item five</TabContainer>}
        {value === 5 && <TabContainer>Item six</TabContainer>}
        {value === 6 && <TabContainer>Item eight</TabContainer>}
        {value === 7 && <TabContainer>Item  ten</TabContainer>} */}
         </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);