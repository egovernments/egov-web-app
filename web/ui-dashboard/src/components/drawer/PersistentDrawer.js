import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    height: 80,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 5,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const drawer = (
      <Drawer
        anchor="left"
        open={open}
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {this.props.children}
        <Divider />
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="static"
            color="inherit"
            className={classNames(classes.appBar, classes.colorDefault, {
              [classes.appBarShift]: open,
              [classes['appBarShift-left']]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {drawer}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.PropTypes.arrayOf(PropTypes.element),
};

PersistentDrawer.defaultProps = {
  children: undefined,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
