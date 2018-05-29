import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import _ from "lodash";
import "./index.css";

const styles = {
  menuStyle: {
    marginLeft: "-40px",
    width: "100px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  whiteColor: {
    color: "white !important",
  },
};

// const

class ActionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      path: "",
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
      if (actionList[i].path !== "") {
        let splitArray = actionList[i].path.split(".");
        if (splitArray.length > 1) {
          if (!_.some(menuItems, { name: splitArray[0] })) {
            menuItems.push({
              path: "",
              name: splitArray[0],
              url: "",
              queryParams: actionList[i].queryParams,
              orderNumber: actionList[i].orderNumber,
              navigationURL: actionList[i].navigationURL,
            });
          }
        } else {
          menuItems.push({
            path: "",
            name: actionList.displayName,
            url: actionList.url,
            queryParams: actionList[i].queryParams,
            orderNumber: actionList[i].orderNumber,
            navigationURL: actionList[i].navigationURL,
          });
        }
      }
    }

    // console.log(_.orderBy(menuItems, ['orderNumber'], ['asc']));
    this.setState({
      menuItems,
      path: "",
    });
  };

  changeModulesActions(modules, items) {
    this.setState({
      modules,
      items,
    });
  }

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  menuChange = (path) => {
    let { actionList } = this.props;
    let menuItems = [];
    for (var i = 0; i < actionList.length; i++) {
      if (actionList[i].path !== "" && actionList[i].path.startsWith(path + ".")) {
        let splitArray = actionList[i].path.split(path + ".")[1].split(".");
        if (splitArray.length > 1) {
          if (!_.some(menuItems, { name: splitArray[0] })) {
            menuItems.push({
              path: path + "." + splitArray[0],
              name: splitArray[0],
              url: "",
              queryParams: actionList[i].queryParams,
              orderNumber: actionList[i].orderNumber,
              navigationURL: actionList[i].navigationURL,
            });
          }
        } else {
          menuItems.push({
            path: path + "." + splitArray[0],
            name: actionList[i].displayName,
            url: actionList[i].url,
            queryParams: actionList[i].queryParams,
            orderNumber: actionList[i].orderNumber,
            navigationURL: actionList[i].navigationURL,
          });
        }
      }
    }

    // console.log(_.orderBy(menuItems, ['orderNumber'], ['asc']));
    menuItems = _.orderBy(menuItems, ["orderNumber"], ["asc"]);
    this.setState({
      menuItems,
      path,
    });
  };

  changeLevel = (path) => {
    let { searchText } = this.state;
    let { setRoute } = this.props;

    if (!path) {
      this.resetMenu();
      // console.log("level 0");
      setRoute("/employee/all-complaints");
    } else {
      let splitArray = _.split(path, ".");
      var x = splitArray.slice(0, splitArray.length - 1).join(".");
      if (x != "" && splitArray.length > 1) {
        this.menuChange(x);
      } else {
        this.resetMenu();
      }
    }
  };

  changeRoute = (route) => {
    let { setRoute } = this.props;
    setRoute(route);
  };

  render() {
    // console.log(this.state.searchText);
    let { handleToggle, actionList } = this.props;
    let { searchText, modules, items, changeModulesActions, path, menuItems } = this.state;
    let { changeLevel, menuChange, changeRoute } = this;

    const showMenuItem = () => {
      if (searchText.length == 0) {
        return menuItems.map((item, index) => {
          if (!item.url) {
            return (
              <MenuItem
                key={index}
                style={{ whiteSpace: "initial" }}
                leftIcon={<i style={{marginLeft:"-10px"}} className="material-icons whiteColor">fiber_manual_record</i>}
                primaryText={
                  <div className="menuStyle whiteColor" style={styles.menuStyle}>
                    <span className="onHoverText hidden-sm hidden-xs">{item.name || ""}</span>
                    <span>{item.name || ""}</span>
                  </div>
                }
                rightIcon={<i className="material-icons whiteColor">keyboard_arrow_right</i>}
                onTouchTap={() => {
                  menuChange(!item.path ? item.name : item.path);
                }}
              />
            );
          } else {
            if (item.navigationURL) {
              return (
              <Link key={index} to={`/employee/${item.navigationURL}`}>
                <MenuItem
                  style={{ whiteSpace: "initial" }}
                  key={index}
                  onTouchTap={() => {
                    document.title = item.name;
                  }}
                  leftIcon={<i style={{marginLeft:"-10px"}} className="material-icons whiteColor">fiber_manual_record</i>}
                  primaryText={
                    <div className="menuStyle whiteColor" style={styles.menuStyle}>
                      <span className="onHoverText hidden-sm hidden-xs">{item.name || ""}</span>
                      <span>{item.name || ""}</span>
                    </div>
                  }
                />
              </Link>
              );
            }
          }
        });
      } else {
        return actionList.map((item, index) => {
          if (item.path && item.url && item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            if (item.navigationURL) {
              return (
                <Link key={index} to={`/employee/${item.navigationURL}`}>
                  <MenuItem
                    style={{ whiteSpace: "initial" }}
                    onTouchTap={() => {
                      document.title = item.displayName;
                    }}
                    leftIcon={<i style={{marginLeft:"-10px"}} className="material-icons whiteColor">fiber_manual_record</i>}
                    primaryText={
                      <div className="menuStyle whiteColor" style={styles.menuStyle}>
                        <span className="onHoverText hidden-sm hidden-xs">{item.displayName || ""}</span>
                        <span>{item.displayName || ""}</span>
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
        <span className="whiteColor">Quick Actions</span>
        {
          <TextField
            hintText="Search"
            onChange={this.handleChange}
            value={searchText}
            className="actionMenuSearchBox"
            inputStyle={styles.whiteColor}
          />
        }

        <Menu disableAutoFocus={true} desktop={true} width="193" menuItemStyle={{ width: "193px", paddingLeft: "0" }}>
          {(path || searchText) && (
            <div
              className="pull-left whiteColor pointerCursor"
              // style={{ marginLeft: 12, marginBottom: 10, cursor: 'pointer' }}
              onTouchTap={() => {
                changeLevel(path);
              }}
            >
              <i className="material-icons">arrow_back</i>
            </div>
          )}
          {path && (
            <div
              className="pull-right whiteColor pointerCursor"
              // style={{ marginRight: 12, marginBottom: 10, cursor: 'pointer' }}
              onTouchTap={() => {
                changeLevel("");
              }}
            >
              <i className="material-icons">home</i>
            </div>
          )}

          <div className="clearfix" />

          <div style={{paddingLeft:"-24px"}}>{showMenuItem()}</div>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleToggle: (showMenu) => dispatch({ type: "MENU_TOGGLE", showMenu }),
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
});
export default connect(null, mapDispatchToProps)(ActionMenu);
