import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import jp from 'jsonpath';
import _ from 'lodash';


const styles = {
  menuStyle: {
    width: '128px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
};

class ActionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      menu: [],
      filterMenu: [],
      level: 0,
      parentLevel: 0,
      modules: [],
      items: [],
      path: '',
      menuItems: [],
    };
    // this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidMount() {
      this.resetMenu();
  }

  resetMenu = () => {
    let { actionList } = this.props;
    let menuItems = [];
    for (var i = 0; i < actionList.length; i++) {
      if (actionList[i].path != '') {
        let splitArray = actionList[i].path.split('.');
        if (splitArray.length > 1) {
          if (!_.some(menuItems, { name: splitArray[0] })) {
            menuItems.push({
              path: '',
              name: splitArray[0],
              url: '',
              queryParams: actionList[i].queryParams,
              orderNumber: actionList[i].orderNumber,
            });
          }
        } else {
          menuItems.push({
            path: '',
            name: actionList.displayName,
            url: actionList.url,
            queryParams: actionList[i].queryParams,
            orderNumber: actionList[i].orderNumber,
          });
        }
      }
    }

    // console.log(_.orderBy(menuItems, ['orderNumber'], ['asc']));
    this.setState({
      menuItems,
      path: '',
    });
  };

  changeModulesActions(modules, items) {
    this.setState({
      modules,
      items,
    });
  }

  handleChange = e => {
    this.setState({
      searchText: e.target.value,
    });
  };

  menuChange = (nextLevel, parentLevel) => {
    this.setState({
      level: nextLevel,
      parentLevel,
    });
  };

  menuChangeTwo = path => {
    // let tempPath=path;
    let { actionList } = this.props;
    let menuItems = [];
    for (var i = 0; i < actionList.length; i++) {
      // actionList[i].path.startsWith(path)
      if (actionList[i].path != '' && actionList[i].path.startsWith(path + '.')) {
        let splitArray = actionList[i].path.split(path + '.')[1].split('.');
        if (splitArray.length > 1) {
          if (!_.some(menuItems, { name: splitArray[0] })) {
            menuItems.push({
              path: path + '.' + splitArray[0],
              name: splitArray[0],
              url: '',
              queryParams: actionList[i].queryParams,
              orderNumber: actionList[i].orderNumber,
            });
          }
          // tempPath=path+"."+splitArray[1];
        } else {
          menuItems.push({
            path: path + '.' + splitArray[0],
            name: actionList[i].displayName,
            url: actionList[i].url,
            queryParams: actionList[i].queryParams,
            orderNumber: actionList[i].orderNumber,
          });
        }
      }
    }

    // console.log(_.orderBy(menuItems, ['orderNumber'], ['asc']));
    menuItems = _.orderBy(menuItems, ['orderNumber'], ['asc']);
    this.setState({
      menuItems,
      path,
    });
  };

  changeLevel = path => {
    let { searchText } = this.state;
    let { setRoute } = this.props;

    if (!path) {
      this.resetMenu();
      // console.log("level 0");
      setRoute('/prd/dashboard');
    } else {
      let splitArray = _.split(path, '.');
      var x = splitArray.slice(0, splitArray.length - 1).join('.');
      if (x != '' && splitArray.length > 1) {
        this.menuChangeTwo(x);
      } else {
        this.resetMenu();
      }
    }
  };

  changeRoute = route => {
    let { setRoute } = this.props;
    setRoute(route);
  };

  render() {
    // console.log(this.state.searchText);
    let { handleToggle, actionList } = this.props;
    let { searchText, filterMenu, level, parentLevel, modules, items, changeModulesActions, path, menuItems } = this.state;
    let { menuChange, changeLevel, menuChangeTwo, changeRoute } = this;

    const checkUrl = function(item) {
      if (item.url == '/pgr/createReceivingCenter' && window.location.href.indexOf('/pgr/createReceivingCenter') > -1) {
        window.urlCheck = true;
      }

      if (item.url == '/pgr/receivingModeCreate' && window.location.href.indexOf('/pgr/receivingModeCreate/update') > -1) {
        window.urlCheck = true;
      }

      if (item.url == '/pgr/createServiceType' && window.location.href.indexOf('/pgr/serviceTypeCreate/edit') > -1) {
        window.urlCheck = true;
      }

      if (item.url == '/pgr/createServiceGroup' && window.location.href.indexOf('/pgr/updateServiceGroup') > -1) {
        window.urlCheck = true;
      }
    };

    const showMenuTwo = () => {
        if (searchText.length == 0) {
          return menuItems.map((item, index) => {
            if (!item.url) {
              return (
                <MenuItem
                  style={{ whiteSpace: 'initial', color: 'white' }}
                  key={index}
                  leftIcon={<i className="material-icons marginLeft">view_module</i>}
                  primaryText={
                    <div className="menuStyle" style={styles.menuStyle}>
                      <span className="onHoverText hidden-sm hidden-xs">{item.name || ''}</span>
                      <span>{item.name || ''}</span>
                    </div>
                  }
                  rightIcon={<i className="material-icons">keyboard_arrow_right</i>}
                  onTouchTap={() => {
                    menuChangeTwo(!item.path ? item.name : item.path);
                  }}
                />
              );
            } else {
              if (item.navigationURL) {
                return (
                  <MenuItem
                    style={{ whiteSpace: 'initial', color: 'white' }}
                    key={index}
                    onTouchTap={() => {
                      checkUrl(item);
                      document.title = item.name;
                      changeRoute(item.navigationURL);
                    }}
                    leftIcon={<i className="material-icons marginLeft">view_module</i>}
                    primaryText={
                      <div className="menuStyle" style={styles.menuStyle}>
                        <span className="onHoverText hidden-sm hidden-xs">{item.name || ''}</span>
                        <span>{item.name || ''}</span>
                      </div>
                    }
                  />
                );
              }
            }
          });
        } else {
          return actionList.map((item, index) => {
            if (item.path && item.url && item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              if (item.navigationURL) {
                return (
                  <Link key={index} to={item.navigationURL}>
                    <MenuItem
                      style={{ whiteSpace: 'initial', color: 'white' }}
                      onTouchTap={() => {
                        checkUrl(item);
                        document.title = item.displayName;
                      }}
                      leftIcon={<i className="material-icons marginLeft">view_module</i>}
                      primaryText={
                        <div className="menuStyle" style={styles.menuStyle}>
                          <span className="onHoverText hidden-sm hidden-xs">{item.displayName || ''}</span>
                          <span>{item.displayName || ''}</span>
                        </div>
                      }
                    />
                  </Link>
                );
              }
            }
          });
        }
    };

    return (
      <div ref={this.setWrapperRef}>
        <span
        >
          Quick Actions
        </span>
        {
          <TextField
            hintText="Search"
            onChange={this.handleChange}
            value={searchText}
          />
        }

        <Menu disableAutoFocus={true} desktop={true}>
          {(path || searchText) && (
            <div
              className="pull-left"
              // style={{ marginLeft: 12, marginBottom: 10, cursor: 'pointer' }}
              onTouchTap={() => {
                changeLevel(path);
              }}
            >
              <i className="material-icons" style={{ color: 'white' }}>
                arrow_back
              </i>
            </div>
          )}
          {path && (
            <div
              className="pull-right"
              // style={{ marginRight: 12, marginBottom: 10, cursor: 'pointer' }}
              onTouchTap={() => {
                changeLevel('');
              }}
            >
              <i className="material-icons" style={{ color: 'white' }}>
                home
              </i>
            </div>
          )}

          <div className="clearfix" />

          {showMenuTwo()}
        </Menu>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  handleToggle: showMenu => dispatch({ type: 'MENU_TOGGLE', showMenu }),
  setRoute: route => dispatch({ type: 'SET_ROUTE', route }),
});
export default connect(null, mapDispatchToProps)(ActionMenu);
